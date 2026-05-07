"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AdminMapPicker } from "@/components/AdminMapPicker";
import { KakaoLoginNotice } from "@/components/KakaoLoginNotice";
import { isAdminEmail } from "@/lib/admin";
import { signInWithGoogle } from "@/lib/authBrowser";
import { getFirebaseAuth, getFirebaseDb, getFirebaseStorage, googleProvider } from "@/lib/firebase";
import { JINJU_CENTER } from "@/lib/naverMap";
import { activityFilters, districts, type ActivityCategory, type SourceType } from "@/lib/data";

type ActiveTab = "overview" | "members" | "proposals" | "map" | "albums" | "notices";

type TimestampLike = {
  seconds: number;
};

type MemberItem = {
  id: string;
  uid: string;
  name: string;
  birthDate?: string;
  phone: string;
  address: string;
  partyMember: string;
  email: string;
  providerEmail?: string;
  createdAt?: TimestampLike;
  updatedAt?: TimestampLike;
};

type ProposalItem = {
  id: string;
  title: string;
  category: string;
  status: string;
  content: string;
  uid: string;
  private?: boolean;
  createdAt?: TimestampLike;
};

type AlbumItem = {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  storagePath?: string;
  published: boolean;
  createdAt?: TimestampLike;
};

type NoticeItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  published: boolean;
  createdAt?: TimestampLike;
};

type MapActivityItem = {
  id: string;
  title: string;
  category: ActivityCategory;
  district: string;
  date: string;
  summary: string;
  image?: string;
  storagePath?: string;
  lat: number;
  lng: number;
  sourceUrl: string;
  sourceName: string;
  sourceType: SourceType;
  status: string;
  published: boolean;
  createdAt?: TimestampLike;
};

const tabs: { id: ActiveTab; label: string }[] = [
  { id: "overview", label: "대시보드" },
  { id: "members", label: "회원 목록" },
  { id: "proposals", label: "민원 게시판" },
  { id: "map", label: "지도 핀 관리" },
  { id: "albums", label: "앨범 관리" },
  { id: "notices", label: "공지 작성" }
];

const proposalStatuses = ["접수", "확인중", "처리완료", "보류"];
const mapCategories = activityFilters.filter((item): item is ActivityCategory => item !== "전체");

function formatDate(value?: TimestampLike) {
  if (!value?.seconds) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value.seconds * 1000));
}

function safeFileName(name: string) {
  const extension = name.includes(".") ? name.split(".").pop() : "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
}

function getAdminErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.toLowerCase().includes("missing or insufficient permissions")) {
    return "Firebase 권한이 아직 적용되지 않았습니다. Firestore Rules와 Storage Rules를 Firebase 콘솔에 배포해주세요.";
  }

  if (error instanceof Error && error.message.includes("permission-denied")) {
    return "Firebase 권한이 부족합니다. 관리자 이메일과 Firebase 보안 규칙 배포 상태를 확인해주세요.";
  }

  return error instanceof Error ? error.message : "처리 중 오류가 발생했습니다.";
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [hasAnnouncedAccess, setHasAnnouncedAccess] = useState(false);
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [proposals, setProposals] = useState<ProposalItem[]>([]);
  const [mapActivities, setMapActivities] = useState<MapActivityItem[]>([]);
  const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [mapFile, setMapFile] = useState<File | null>(null);
  const [albumFile, setAlbumFile] = useState<File | null>(null);
  const [mapForm, setMapForm] = useState({
    title: "",
    category: "현장방문" as ActivityCategory,
    district: "중앙동",
    date: new Date().toISOString().slice(0, 10),
    summary: "",
    sourceUrl: "",
    sourceName: "관련 기사",
    sourceType: "press" as SourceType,
    status: "등록",
    published: true,
    lat: JINJU_CENTER.lat,
    lng: JINJU_CENTER.lng
  });
  const [albumForm, setAlbumForm] = useState({
    title: "",
    caption: "",
    published: true
  });
  const [newsForm, setNewsForm] = useState({
    title: "",
    category: "공지사항",
    summary: "",
    content: "",
    published: true
  });

  async function loadMembers() {
    const db = getFirebaseDb();
    const snapshot = await getDocs(query(collection(db, "members"), limit(100)));
    const nextMembers = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<MemberItem, "id">)
    }));

    nextMembers.sort((a, b) => (b.updatedAt?.seconds ?? 0) - (a.updatedAt?.seconds ?? 0));
    setMembers(nextMembers);
  }

  async function loadProposals() {
    const db = getFirebaseDb();
    const snapshot = await getDocs(query(collection(db, "proposals"), limit(100)));
    const nextItems = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<ProposalItem, "id">)
    }));

    nextItems.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
    setProposals(nextItems);
  }

  async function loadMapActivities() {
    const db = getFirebaseDb();
    const snapshot = await getDocs(query(collection(db, "mapActivities"), limit(100)));
    const nextMapActivities = snapshot.docs.map((item) => {
      const data = item.data() as Partial<MapActivityItem>;
      const category = mapCategories.includes(data.category as ActivityCategory) ? data.category as ActivityCategory : mapCategories[0];
      const district = data.district && districts.includes(data.district) ? data.district : districts[0];

      return {
        id: item.id,
        title: data.title || "",
        category,
        district,
        date: data.date || new Date().toISOString().slice(0, 10),
        summary: data.summary || "",
        image: data.image || "/images/field.png",
        storagePath: data.storagePath || "",
        lat: typeof data.lat === "number" ? data.lat : JINJU_CENTER.lat,
        lng: typeof data.lng === "number" ? data.lng : JINJU_CENTER.lng,
        sourceUrl: data.sourceUrl || "",
        sourceName: data.sourceName || "관련 기사",
        sourceType: (data.sourceType === "official" ? "official" : "press") as SourceType,
        status: data.status || "등록",
        published: data.published !== false,
        createdAt: data.createdAt
      };
    });

    nextMapActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setMapActivities(nextMapActivities);
  }

  async function loadAlbums() {
    const db = getFirebaseDb();
    const snapshot = await getDocs(query(collection(db, "albumPosts"), limit(100)));
    const nextAlbums = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<AlbumItem, "id">)
    }));

    nextAlbums.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
    setAlbums(nextAlbums);
  }

  async function loadNotices() {
    const db = getFirebaseDb();
    const snapshot = await getDocs(query(collection(db, "newsPosts"), limit(100)));
    const nextNotices = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<NoticeItem, "id">)
    }));

    nextNotices.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
    setNotices(nextNotices);
  }

  async function loadAdminData() {
    const results = await Promise.allSettled([loadMembers(), loadProposals(), loadMapActivities(), loadAlbums(), loadNotices()]);
    const rejected = results.find((result) => result.status === "rejected");

    if (rejected && rejected.status === "rejected") {
      setMessage(getAdminErrorMessage(rejected.reason));
    }
  }

  async function confirmAdminAccess(user: User, announceAccess: boolean) {
    const db = getFirebaseDb();
    const emailAllowed = isAdminEmail(user.email);
    const adminDoc = emailAllowed ? null : await getDoc(doc(db, "admins", user.uid));

    if (!emailAllowed && !adminDoc?.exists()) {
      setIsAdmin(false);
      setMessage("관리자 권한이 등록되지 않은 계정입니다. 권한 설정을 확인해주세요.");
      return false;
    }

    setIsAdmin(true);
    setMessage("운영자 권한이 활성화되었습니다.");

    if (announceAccess && !hasAnnouncedAccess) {
      setShowAccessModal(true);
      setHasAnnouncedAccess(true);
    }

    await loadAdminData();
    return true;
  }

  useEffect(() => {
    let mounted = true;
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      if (!mounted) {
        return;
      }

      if (!nextUser) {
        setIsAdmin(false);
        return;
      }

      try {
        setLoading(true);
        await confirmAdminAccess(nextUser, true);
      } catch (error) {
        setMessage(getAdminErrorMessage(error));
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [hasAnnouncedAccess]);

  async function handleAdminLogin() {
    try {
      setLoading(true);
      setMessage("");
      const auth = getFirebaseAuth();
      const result = await signInWithGoogle(auth, googleProvider);
      await confirmAdminAccess(result.user, true);
    } catch (error) {
      setMessage(getAdminErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  function updateMapForm(name: string, value: string | boolean | number) {
    setMapForm((current) => ({ ...current, [name]: value }));
  }

  function handleMapFileChange(event: ChangeEvent<HTMLInputElement>) {
    setMapFile(event.target.files?.[0] ?? null);
  }

  async function handleMapSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isAdmin) {
      setMessage("관리자 인증 후 지도 핀을 등록할 수 있습니다.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const db = getFirebaseDb();
      let image = "/images/field.png";
      let storagePath = "";

      if (mapFile) {
        storagePath = `mapActivities/${safeFileName(mapFile.name)}`;
        const storage = getFirebaseStorage();
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, mapFile);
        image = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "mapActivities"), {
        title: mapForm.title.trim(),
        category: mapForm.category,
        district: mapForm.district,
        date: mapForm.date,
        summary: mapForm.summary.trim(),
        image,
        storagePath,
        lat: Number(mapForm.lat),
        lng: Number(mapForm.lng),
        sourceUrl: mapForm.sourceUrl.trim(),
        sourceName: mapForm.sourceName.trim() || "관련 기사",
        sourceType: mapForm.sourceType,
        status: mapForm.status.trim() || "등록",
        published: mapForm.published,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setMapForm({
        title: "",
        category: "현장방문",
        district: "중앙동",
        date: new Date().toISOString().slice(0, 10),
        summary: "",
        sourceUrl: "",
        sourceName: "관련 기사",
        sourceType: "press",
        status: "등록",
        published: true,
        lat: JINJU_CENTER.lat,
        lng: JINJU_CENTER.lng
      });
      setMessage("지도 핀이 등록되었습니다.");
      setMapFile(null);
      await loadMapActivities();
    } catch (error) {
      setMessage(getAdminErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleMapActivityUpdate(
    item: MapActivityItem,
    field: "title" | "category" | "district" | "date" | "summary" | "sourceUrl" | "sourceName" | "sourceType" | "status" | "published" | "lat" | "lng",
    value: string | boolean | number
  ) {
    if (!isAdmin) {
      return;
    }

    try {
      const db = getFirebaseDb();
      await updateDoc(doc(db, "mapActivities", item.id), {
        [field]: value,
        updatedAt: serverTimestamp()
      });
      await loadMapActivities();
      setMessage("지도 핀 정보가 수정되었습니다.");
    } catch (error) {
      setMessage(getAdminErrorMessage(error));
    }
  }

  async function handleMapActivityDelete(item: MapActivityItem) {
    if (!isAdmin || !window.confirm("이 지도 핀을 삭제할까요?")) {
      return;
    }

    try {
      const db = getFirebaseDb();
      await deleteDoc(doc(db, "mapActivities", item.id));

      if (item.storagePath) {
        const storage = getFirebaseStorage();
        await deleteObject(ref(storage, item.storagePath)).catch(() => undefined);
      }

      await loadMapActivities();
      setMessage("지도 핀이 삭제되었습니다.");
    } catch (error) {
      setMessage(getAdminErrorMessage(error));
    }
  }

  function handleAlbumFileChange(event: ChangeEvent<HTMLInputElement>) {
    setAlbumFile(event.target.files?.[0] ?? null);
  }

  async function handleAlbumSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isAdmin || !albumFile) {
      setMessage("관리자 인증 후 사진 파일을 선택해주세요.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const storagePath = `albums/${safeFileName(albumFile.name)}`;
      const storage = getFirebaseStorage();
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, albumFile);
      const imageUrl = await getDownloadURL(storageRef);

      const db = getFirebaseDb();
      await addDoc(collection(db, "albumPosts"), {
        title: albumForm.title.trim(),
        caption: albumForm.caption.trim(),
        imageUrl,
        storagePath,
        published: albumForm.published,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setAlbumForm({ title: "", caption: "", published: true });
      setAlbumFile(null);
      setMessage("앨범 사진이 업로드되었습니다.");
      await loadAlbums();
    } catch (error) {
      setMessage(getAdminErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleAlbumUpdate(item: AlbumItem, field: "title" | "caption" | "published", value: string | boolean) {
    if (!isAdmin) {
      return;
    }

    try {
      const db = getFirebaseDb();
      await updateDoc(doc(db, "albumPosts", item.id), {
        [field]: value,
        updatedAt: serverTimestamp()
      });
      await loadAlbums();
      setMessage("앨범 정보가 수정되었습니다.");
    } catch (error) {
      setMessage(getAdminErrorMessage(error));
    }
  }

  async function handleAlbumDelete(item: AlbumItem) {
    if (!isAdmin || !window.confirm("이 앨범 사진을 삭제할까요?")) {
      return;
    }

    try {
      const db = getFirebaseDb();
      await deleteDoc(doc(db, "albumPosts", item.id));

      if (item.storagePath) {
        const storage = getFirebaseStorage();
        await deleteObject(ref(storage, item.storagePath)).catch(() => undefined);
      }

      setMessage("앨범 사진이 삭제되었습니다.");
      await loadAlbums();
    } catch (error) {
      setMessage(getAdminErrorMessage(error));
    }
  }

  async function handleProposalStatus(item: ProposalItem, status: string) {
    if (!isAdmin) {
      return;
    }

    try {
      const db = getFirebaseDb();
      await updateDoc(doc(db, "proposals", item.id), {
        status,
        updatedAt: serverTimestamp()
      });
      await loadProposals();
      setMessage("민원 상태가 변경되었습니다.");
    } catch (error) {
      setMessage(getAdminErrorMessage(error));
    }
  }

  async function handleNewsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isAdmin) {
      setMessage("관리자 인증 후 작성할 수 있습니다.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const db = getFirebaseDb();

      await addDoc(collection(db, "newsPosts"), {
        title: newsForm.title.trim(),
        category: newsForm.category,
        summary: newsForm.summary.trim(),
        content: newsForm.content.trim(),
        published: newsForm.published,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setNewsForm({
        title: "",
        category: "공지사항",
        summary: "",
        content: "",
        published: true
      });
      setMessage("공지사항이 등록되었습니다.");
      await loadNotices();
    } catch (error) {
      setMessage(getAdminErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleNoticeUpdate(item: NoticeItem, field: "title" | "category" | "summary" | "content" | "published", value: string | boolean) {
    if (!isAdmin) {
      return;
    }

    try {
      const db = getFirebaseDb();
      await updateDoc(doc(db, "newsPosts", item.id), {
        [field]: value,
        updatedAt: serverTimestamp()
      });
      await loadNotices();
      setMessage("공지사항이 수정되었습니다.");
    } catch (error) {
      setMessage(getAdminErrorMessage(error));
    }
  }

  async function handleNoticeDelete(item: NoticeItem) {
    if (!isAdmin || !window.confirm("이 공지사항을 삭제할까요?")) {
      return;
    }

    try {
      const db = getFirebaseDb();
      await deleteDoc(doc(db, "newsPosts", item.id));
      await loadNotices();
      setMessage("공지사항이 삭제되었습니다.");
    } catch (error) {
      setMessage(getAdminErrorMessage(error));
    }
  }

  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {showAccessModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/70 px-5">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-civic">
              <p className="text-sm font-black text-civic-red">Admin Access</p>
              <h2 className="mt-2 text-2xl font-black text-navy-900">운영자 권한이 활성화되었습니다</h2>
              <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
                회원 정보, 민원 게시판, 앨범 자료와 공지사항을 관리할 수 있습니다.
              </p>
              <button
                type="button"
                onClick={() => setShowAccessModal(false)}
                className="mt-6 min-h-11 w-full rounded-full bg-civic-red px-5 text-sm font-black text-white transition hover:bg-red-700"
              >
                관리자 콘솔 시작
              </button>
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-2xl bg-navy-900 p-5 text-white shadow-civic">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-red-100">Admin Console</p>
            <h2 className="mt-3 text-2xl font-black">운영 관리</h2>
            <p className="mt-3 text-sm font-bold leading-6 text-white/72">
              관리자 인증 후 회원, 민원, 앨범, 공지를 한 곳에서 관리합니다.
            </p>
            <div className="mt-5">
              <KakaoLoginNotice />
            </div>

            <button
              type="button"
              onClick={handleAdminLogin}
              disabled={loading}
              className="mt-6 min-h-11 w-full rounded-full bg-white px-5 text-sm font-black text-navy-900 transition hover:bg-red-100 disabled:bg-slate-300"
            >
              {isAdmin ? "운영자 인증 완료" : "운영자 로그인"}
            </button>
            {message ? <p className="mt-4 text-sm font-black leading-6 text-red-100">{message}</p> : null}

            <nav className="mt-6 grid gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "min-h-11 rounded-xl px-4 text-left text-sm font-black transition",
                    activeTab === tab.id ? "bg-white text-navy-900" : "bg-white/8 text-white hover:bg-white/14"
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">
            {!isAdmin ? (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-civic">
                <h3 className="text-2xl font-black text-navy-900">운영자 로그인이 필요합니다</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
                  등록된 Google 관리자 계정으로 로그인하면 콘솔 탭이 열립니다.
                </p>
              </section>
            ) : null}

            {isAdmin && activeTab === "overview" ? (
              <section className="grid gap-4 md:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-civic">
                  <p className="text-sm font-black text-civic-red">회원</p>
                  <strong className="mt-2 block text-3xl font-black text-navy-900">{members.length}</strong>
                  <p className="mt-2 text-sm font-bold text-slate-600">등록 회원 정보</p>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-civic">
                  <p className="text-sm font-black text-civic-red">민원</p>
                  <strong className="mt-2 block text-3xl font-black text-navy-900">{proposals.length}</strong>
                  <p className="mt-2 text-sm font-bold text-slate-600">접수된 민원/제안</p>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-civic">
                  <p className="text-sm font-black text-civic-red">지도</p>
                  <strong className="mt-2 block text-3xl font-black text-navy-900">{mapActivities.length}</strong>
                  <p className="mt-2 text-sm font-bold text-slate-600">관리자 등록 핀</p>
                </article>
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-civic">
                  <p className="text-sm font-black text-civic-red">앨범</p>
                  <strong className="mt-2 block text-3xl font-black text-navy-900">{albums.length}</strong>
                  <p className="mt-2 text-sm font-bold text-slate-600">업로드 사진 자료</p>
                </article>
              </section>
            ) : null}

            {isAdmin && activeTab === "members" ? (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-civic">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-2xl font-black text-navy-900">회원 목록</h3>
                  <button type="button" onClick={() => loadMembers().catch((error) => setMessage(getAdminErrorMessage(error)))} className="min-h-10 rounded-full border border-navy-900 px-4 text-xs font-black text-navy-900">
                    새로고침
                  </button>
                </div>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[900px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-black text-navy-900">
                      <tr>
                        <th className="px-4 py-3">이름</th>
                        <th className="px-4 py-3">생년월일</th>
                        <th className="px-4 py-3">전화</th>
                        <th className="px-4 py-3">주소</th>
                        <th className="px-4 py-3">이메일</th>
                        <th className="px-4 py-3">당원 여부</th>
                        <th className="px-4 py-3">수정일</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {members.map((member) => (
                        <tr key={member.id} className="font-bold text-slate-700">
                          <td className="px-4 py-3 text-navy-900">{member.name || "-"}</td>
                          <td className="px-4 py-3">{member.birthDate || "-"}</td>
                          <td className="px-4 py-3">{member.phone || "-"}</td>
                          <td className="px-4 py-3">{member.address || "-"}</td>
                          <td className="px-4 py-3">{member.email || member.providerEmail || "-"}</td>
                          <td className="px-4 py-3">{member.partyMember || "-"}</td>
                          <td className="px-4 py-3">{formatDate(member.updatedAt || member.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {isAdmin && activeTab === "proposals" ? (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-civic">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-2xl font-black text-navy-900">민원 게시판</h3>
                  <button type="button" onClick={() => loadProposals().catch((error) => setMessage(getAdminErrorMessage(error)))} className="min-h-10 rounded-full border border-navy-900 px-4 text-xs font-black text-navy-900">
                    새로고침
                  </button>
                </div>
                <div className="mt-5 grid gap-3">
                  {proposals.map((item) => (
                    <article key={item.id} className="rounded-2xl bg-navy-50 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-civic-red">{item.category}</span>
                          <span className="text-xs font-black text-slate-500">{formatDate(item.createdAt)}</span>
                        </div>
                        <select
                          value={item.status}
                          onChange={(event) => handleProposalStatus(item, event.target.value)}
                          className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-navy-900"
                        >
                          {proposalStatuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                      <h4 className="mt-3 text-base font-black text-navy-900">{item.title}</h4>
                      <p className="mt-2 whitespace-pre-wrap text-sm font-bold leading-6 text-slate-700">{item.content}</p>
                      <p className="mt-3 text-xs font-bold text-slate-500">작성자 UID: {item.uid}</p>
                    </article>
                  ))}
                  {!proposals.length ? (
                    <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-600">접수된 민원/제안이 없습니다.</p>
                  ) : null}
                </div>
              </section>
            ) : null}

            {isAdmin && activeTab === "map" ? (
              <section className="grid gap-6 2xl:grid-cols-[minmax(0,680px)_minmax(0,1fr)]">
                <form onSubmit={handleMapSubmit} className="grid min-w-0 gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-civic">
                  <div>
                    <p className="text-sm font-black text-civic-red">Map Pin</p>
                    <h3 className="mt-2 text-2xl font-black text-navy-900">지도 핀 등록</h3>
                    <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
                      지도를 클릭해 위치를 정하고, 태그와 내용을 입력하면 소통지도에 공개됩니다.
                    </p>
                  </div>

                  <AdminMapPicker
                    lat={mapForm.lat}
                    lng={mapForm.lng}
                    onChange={(position) => {
                      updateMapForm("lat", Number(position.lat.toFixed(6)));
                      updateMapForm("lng", Number(position.lng.toFixed(6)));
                    }}
                  />

                  <label className="grid gap-2 text-sm font-black text-navy-900">
                    사진
                    <input type="file" accept="image/*" onChange={handleMapFileChange} className="min-h-12 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold" />
                    <span className="text-xs font-bold leading-5 text-slate-500">선택하지 않으면 기본 현장 사진으로 등록됩니다.</span>
                  </label>

                  <div className="grid gap-4">
                    <label className="grid gap-2 text-sm font-black text-navy-900">
                      위도
                      <input
                        required
                        type="number"
                        step="0.000001"
                        value={mapForm.lat}
                        onChange={(event) => updateMapForm("lat", Number(event.target.value))}
                        className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-black text-navy-900">
                      경도
                      <input
                        required
                        type="number"
                        step="0.000001"
                        value={mapForm.lng}
                        onChange={(event) => updateMapForm("lng", Number(event.target.value))}
                        className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                      />
                    </label>
                  </div>

                  <label className="grid gap-2 text-sm font-black text-navy-900">
                    제목
                    <input
                      required
                      value={mapForm.title}
                      onChange={(event) => updateMapForm("title", event.target.value)}
                      className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                    />
                  </label>

                  <div className="grid gap-4">
                    <label className="grid gap-2 text-sm font-black text-navy-900">
                      태그
                      <select
                        value={mapForm.category}
                        onChange={(event) => updateMapForm("category", event.target.value as ActivityCategory)}
                        className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                      >
                        {mapCategories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm font-black text-navy-900">
                      지역
                      <select
                        value={mapForm.district}
                        onChange={(event) => updateMapForm("district", event.target.value)}
                        className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                      >
                        {districts.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm font-black text-navy-900">
                      일자
                      <input
                        required
                        type="date"
                        value={mapForm.date}
                        onChange={(event) => updateMapForm("date", event.target.value)}
                        className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                      />
                    </label>
                  </div>

                  <label className="grid gap-2 text-sm font-black text-navy-900">
                    내용
                    <textarea
                      required
                      rows={5}
                      value={mapForm.summary}
                      onChange={(event) => updateMapForm("summary", event.target.value)}
                      className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold leading-6 outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                    />
                  </label>

                  <div className="grid gap-4">
                    <label className="grid gap-2 text-sm font-black text-navy-900">
                      관련 기사 링크
                      <input
                        required
                        type="url"
                        value={mapForm.sourceUrl}
                        onChange={(event) => updateMapForm("sourceUrl", event.target.value)}
                        className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                        placeholder="https://..."
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-black text-navy-900">
                      출처명
                      <input
                        required
                        value={mapForm.sourceName}
                        onChange={(event) => updateMapForm("sourceName", event.target.value)}
                        className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4">
                    <label className="grid gap-2 text-sm font-black text-navy-900">
                      상태
                      <input
                        required
                        value={mapForm.status}
                        onChange={(event) => updateMapForm("status", event.target.value)}
                        className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-black text-navy-900">
                      자료 유형
                      <select
                        value={mapForm.sourceType}
                        onChange={(event) => updateMapForm("sourceType", event.target.value as SourceType)}
                        className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                      >
                        <option value="press">언론 기사</option>
                        <option value="official">공식 자료</option>
                      </select>
                    </label>
                  </div>

                  <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={mapForm.published}
                      onChange={(event) => updateMapForm("published", event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-civic-red"
                    />
                    공개 상태로 등록
                  </label>

                  <button type="submit" disabled={loading} className="min-h-12 rounded-full bg-civic-red px-5 text-sm font-black text-white transition hover:bg-red-700 disabled:bg-slate-400">
                    지도 핀 등록
                  </button>
                </form>

                <div className="grid min-w-0 gap-4">
                  <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-civic sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-xl font-black text-navy-900">등록된 지도 핀</h3>
                    <button type="button" onClick={() => loadMapActivities().catch((error) => setMessage(getAdminErrorMessage(error)))} className="min-h-10 rounded-full border border-navy-900 px-4 text-xs font-black text-navy-900">
                      새로고침
                    </button>
                  </div>
                  {mapActivities.map((item) => (
                    <article key={item.id} className="grid min-w-0 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-civic">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-civic-red">{item.category}</span>
                        <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-black text-navy-900">{item.district}</span>
                        <span className="text-xs font-bold text-slate-500">{item.date}</span>
                      </div>
                      <div className="overflow-hidden rounded-xl bg-slate-100">
                        <img src={item.image || "/images/field.png"} alt={item.title} className="aspect-[16/9] w-full object-cover" />
                      </div>
                      <input
                        defaultValue={item.title}
                        onBlur={(event) => {
                          if (event.target.value !== item.title) {
                            handleMapActivityUpdate(item, "title", event.target.value);
                          }
                        }}
                        className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-black text-navy-900 outline-none focus:border-civic-blue"
                      />
                      <div className="grid gap-3 lg:grid-cols-3">
                        <select
                          value={item.category}
                          onChange={(event) => handleMapActivityUpdate(item, "category", event.target.value as ActivityCategory)}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-bold text-navy-900 outline-none focus:border-civic-blue"
                        >
                          {mapCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        <select
                          value={item.district}
                          onChange={(event) => handleMapActivityUpdate(item, "district", event.target.value)}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-bold text-navy-900 outline-none focus:border-civic-blue"
                        >
                          {districts.map((district) => (
                            <option key={district} value={district}>{district}</option>
                          ))}
                        </select>
                        <input
                          type="date"
                          value={item.date}
                          onChange={(event) => handleMapActivityUpdate(item, "date", event.target.value)}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-bold text-navy-900 outline-none focus:border-civic-blue"
                        />
                      </div>
                      <textarea
                        rows={3}
                        defaultValue={item.summary}
                        onBlur={(event) => {
                          if (event.target.value !== item.summary) {
                            handleMapActivityUpdate(item, "summary", event.target.value);
                          }
                        }}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold leading-6 text-slate-700 outline-none focus:border-civic-blue"
                      />
                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          defaultValue={item.sourceUrl}
                          onBlur={(event) => {
                            if (event.target.value !== item.sourceUrl) {
                              handleMapActivityUpdate(item, "sourceUrl", event.target.value);
                            }
                          }}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 outline-none focus:border-civic-blue"
                        />
                        <input
                          defaultValue={item.status}
                          onBlur={(event) => {
                            if (event.target.value !== item.status) {
                              handleMapActivityUpdate(item, "status", event.target.value);
                            }
                          }}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 outline-none focus:border-civic-blue"
                        />
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          defaultValue={item.sourceName}
                          onBlur={(event) => {
                            if (event.target.value !== item.sourceName) {
                              handleMapActivityUpdate(item, "sourceName", event.target.value);
                            }
                          }}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 outline-none focus:border-civic-blue"
                        />
                        <select
                          value={item.sourceType}
                          onChange={(event) => handleMapActivityUpdate(item, "sourceType", event.target.value as SourceType)}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 outline-none focus:border-civic-blue"
                        >
                          <option value="press">언론 기사</option>
                          <option value="official">공식 자료</option>
                        </select>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          type="number"
                          step="0.000001"
                          value={item.lat}
                          onChange={(event) => handleMapActivityUpdate(item, "lat", Number(event.target.value))}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 outline-none focus:border-civic-blue"
                        />
                        <input
                          type="number"
                          step="0.000001"
                          value={item.lng}
                          onChange={(event) => handleMapActivityUpdate(item, "lng", Number(event.target.value))}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 outline-none focus:border-civic-blue"
                        />
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <input type="checkbox" checked={item.published} onChange={(event) => handleMapActivityUpdate(item, "published", event.target.checked)} />
                          공개
                        </label>
                        <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-xs font-black text-navy-900 underline underline-offset-4">
                          링크 확인
                        </a>
                        <button type="button" onClick={() => handleMapActivityDelete(item)} className="min-h-10 rounded-full border border-civic-red px-4 text-xs font-black text-civic-red">
                          삭제
                        </button>
                      </div>
                    </article>
                  ))}
                  {!mapActivities.length ? (
                    <p className="rounded-2xl bg-white p-5 text-sm font-bold text-slate-600 shadow-civic">등록된 지도 핀이 없습니다.</p>
                  ) : null}
                </div>
              </section>
            ) : null}

            {isAdmin && activeTab === "albums" ? (
              <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
                <form onSubmit={handleAlbumSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-civic">
                  <h3 className="text-2xl font-black text-navy-900">앨범 업로드</h3>
                  <label className="grid gap-2 text-sm font-black text-navy-900">
                    사진
                    <input required type="file" accept="image/*" onChange={handleAlbumFileChange} className="min-h-12 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold" />
                  </label>
                  <label className="grid gap-2 text-sm font-black text-navy-900">
                    제목
                    <input required value={albumForm.title} onChange={(event) => setAlbumForm((current) => ({ ...current, title: event.target.value }))} className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20" />
                  </label>
                  <label className="grid gap-2 text-sm font-black text-navy-900">
                    글
                    <textarea required rows={5} value={albumForm.caption} onChange={(event) => setAlbumForm((current) => ({ ...current, caption: event.target.value }))} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold leading-6 outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20" />
                  </label>
                  <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <input type="checkbox" checked={albumForm.published} onChange={(event) => setAlbumForm((current) => ({ ...current, published: event.target.checked }))} className="h-4 w-4 rounded border-slate-300 text-civic-red" />
                    공개 상태로 등록
                  </label>
                  <button type="submit" disabled={loading} className="min-h-12 rounded-full bg-civic-red px-5 text-sm font-black text-white transition hover:bg-red-700 disabled:bg-slate-400">
                    사진 업로드
                  </button>
                </form>

                <div className="grid gap-4">
                  {albums.map((item) => (
                    <article key={item.id} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-civic md:grid-cols-[180px_1fr]">
                      <div className="overflow-hidden rounded-xl bg-slate-100">
                        <img src={item.imageUrl} alt={item.title} className="aspect-[4/3] h-full w-full object-cover" />
                      </div>
                      <div className="grid gap-3">
                        <input
                          defaultValue={item.title}
                          onBlur={(event) => {
                            if (event.target.value !== item.title) {
                              handleAlbumUpdate(item, "title", event.target.value);
                            }
                          }}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-black text-navy-900 outline-none focus:border-civic-blue"
                        />
                        <textarea
                          rows={3}
                          defaultValue={item.caption}
                          onBlur={(event) => {
                            if (event.target.value !== item.caption) {
                              handleAlbumUpdate(item, "caption", event.target.value);
                            }
                          }}
                          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold leading-6 text-slate-700 outline-none focus:border-civic-blue"
                        />
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            <input type="checkbox" checked={item.published} onChange={(event) => handleAlbumUpdate(item, "published", event.target.checked)} />
                            공개
                          </label>
                          <button type="button" onClick={() => handleAlbumDelete(item)} className="min-h-10 rounded-full border border-civic-red px-4 text-xs font-black text-civic-red">
                            삭제
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                  {!albums.length ? (
                    <p className="rounded-2xl bg-white p-5 text-sm font-bold text-slate-600 shadow-civic">등록된 앨범 사진이 없습니다.</p>
                  ) : null}
                </div>
              </section>
            ) : null}

            {isAdmin && activeTab === "notices" ? (
              <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
                <form onSubmit={handleNewsSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-civic sm:p-8">
                  <h3 className="text-2xl font-black text-navy-900">공지사항 작성</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-sm font-black text-navy-900">
                      제목
                      <input required value={newsForm.title} onChange={(event) => setNewsForm((current) => ({ ...current, title: event.target.value }))} className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20" />
                    </label>
                    <label className="grid gap-2 text-sm font-black text-navy-900">
                      분류
                      <select value={newsForm.category} onChange={(event) => setNewsForm((current) => ({ ...current, category: event.target.value }))} className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20">
                        <option>공지사항</option>
                        <option>의정소식</option>
                        <option>지역소식</option>
                      </select>
                    </label>
                  </div>
                  <label className="grid gap-2 text-sm font-black text-navy-900">
                    요약
                    <input required value={newsForm.summary} onChange={(event) => setNewsForm((current) => ({ ...current, summary: event.target.value }))} className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20" />
                  </label>
                  <label className="grid gap-2 text-sm font-black text-navy-900">
                    내용
                    <textarea required rows={7} value={newsForm.content} onChange={(event) => setNewsForm((current) => ({ ...current, content: event.target.value }))} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold leading-6 outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20" />
                  </label>
                  <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <input type="checkbox" checked={newsForm.published} onChange={(event) => setNewsForm((current) => ({ ...current, published: event.target.checked }))} className="h-4 w-4 rounded border-slate-300 text-civic-red" />
                    공개 상태로 등록
                  </label>
                  <button type="submit" disabled={loading} className="min-h-12 rounded-full bg-civic-red px-5 text-sm font-black text-white transition hover:bg-red-700 disabled:bg-slate-400">
                    공지 등록
                  </button>
                </form>

                <div className="grid gap-4">
                  <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-civic sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-xl font-black text-navy-900">공지 목록</h3>
                    <button type="button" onClick={() => loadNotices().catch((error) => setMessage(getAdminErrorMessage(error)))} className="min-h-10 rounded-full border border-navy-900 px-4 text-xs font-black text-navy-900">
                      새로고침
                    </button>
                  </div>
                  {notices.map((item) => (
                    <article key={item.id} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-civic">
                      <div className="grid gap-3 md:grid-cols-[1fr_140px]">
                        <input
                          defaultValue={item.title}
                          onBlur={(event) => {
                            if (event.target.value !== item.title) {
                              handleNoticeUpdate(item, "title", event.target.value);
                            }
                          }}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-black text-navy-900 outline-none focus:border-civic-blue"
                        />
                        <select
                          defaultValue={item.category}
                          onBlur={(event) => {
                            if (event.target.value !== item.category) {
                              handleNoticeUpdate(item, "category", event.target.value);
                            }
                          }}
                          className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-black text-navy-900 outline-none focus:border-civic-blue"
                        >
                          <option>공지사항</option>
                          <option>의정소식</option>
                          <option>지역소식</option>
                        </select>
                      </div>
                      <input
                        defaultValue={item.summary}
                        onBlur={(event) => {
                          if (event.target.value !== item.summary) {
                            handleNoticeUpdate(item, "summary", event.target.value);
                          }
                        }}
                        className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 outline-none focus:border-civic-blue"
                      />
                      <textarea
                        rows={4}
                        defaultValue={item.content}
                        onBlur={(event) => {
                          if (event.target.value !== item.content) {
                            handleNoticeUpdate(item, "content", event.target.value);
                          }
                        }}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold leading-6 text-slate-700 outline-none focus:border-civic-blue"
                      />
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <input type="checkbox" checked={item.published} onChange={(event) => handleNoticeUpdate(item, "published", event.target.checked)} />
                          공개
                        </label>
                        <span className="text-xs font-bold text-slate-500">{formatDate(item.createdAt)}</span>
                        <button type="button" onClick={() => handleNoticeDelete(item)} className="min-h-10 rounded-full border border-civic-red px-4 text-xs font-black text-civic-red">
                          삭제
                        </button>
                      </div>
                    </article>
                  ))}
                  {!notices.length ? (
                    <p className="rounded-2xl bg-white p-5 text-sm font-bold text-slate-600 shadow-civic">등록된 공지사항이 없습니다.</p>
                  ) : null}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
