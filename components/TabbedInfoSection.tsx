"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { districts, policies } from "@/lib/data";
import { imagePaths } from "@/lib/images";

type TabId = "profile" | "constituency" | "policy";

const tabs: Array<{ id: TabId; label: string; eyebrow: string }> = [
  { id: "profile", label: "프로필", eyebrow: "Profile" },
  { id: "constituency", label: "지역구", eyebrow: "Jinju-eul" },
  { id: "policy", label: "정책", eyebrow: "Policy" }
];

const profileFacts = [
  { label: "이름", value: "강민국 / 姜旻局 / KANG MINKUK" },
  { label: "소속", value: "국민의힘" },
  { label: "선거구", value: "경남 진주시을" },
  { label: "의정", value: "제21·22대 국회의원" },
  { label: "상임위", value: "국회 정무위원회 간사" }
];

const educationItems = ["경남대학교 대학원 법학과 졸업, 법학박사"];

const careerItems = [
  "제21대 국회의원",
  "제22대 국회의원",
  "국회 정무위원회 간사",
  "국민의힘 원내대변인",
  "제10·11대 경상남도의회 의원",
  "경상남도의회 건설소방위원회 위원장"
];

const officeItems = [
  { label: "의원실", value: "의원회관 1007호" },
  { label: "전화", value: "02-784-0797" },
  { label: "이메일", value: "strongwind01@naver.com" }
];

const districtGroups = [
  {
    title: "도심 생활권",
    description: "생활민원과 상권, 주거 현안이 밀집한 중심 권역입니다.",
    items: ["중앙동", "상봉동", "상대동", "하대동", "상평동", "초장동"]
  },
  {
    title: "동부·북부 생활권",
    description: "농촌 생활기반과 교통, 정주 여건 개선 과제를 함께 봅니다.",
    items: ["금산면", "집현면", "미천면", "대곡면"]
  },
  {
    title: "동부 5개면",
    description: "면 단위 현장 방문과 주민 소통 일정을 촘촘히 연결합니다.",
    items: ["진성면", "일반성면", "이반성면", "사봉면", "지수면"]
  }
];

function ProfileTab() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-navy-900 text-white shadow-civic">
        <div className="relative mx-auto aspect-[4/5] max-w-[320px] lg:max-w-none">
          <Image
            src={imagePaths.profileOfficial}
            alt="국회의원 강민국 공식 프로필 사진"
            fill
            sizes="(min-width: 1024px) 30vw, 82vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/8 to-transparent" />
        </div>
        <div className="relative p-6 sm:p-7">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-red-100">Official Profile</p>
          <h3 className="mt-3 text-3xl font-black">국회의원 강민국</h3>
          <p className="mt-3 text-sm leading-6 text-white/74">
            진주의 현장 목소리를 국회 의정활동과 정책 과제로 연결하는 공식 프로필 정보입니다.
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {profileFacts.map((item) => (
            <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-civic-red">{item.label}</p>
              <p className="mt-2 text-sm font-extrabold leading-6 text-navy-900">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="text-xl font-black text-navy-900">학력</h4>
            <ul className="mt-4 space-y-3">
              {educationItems.map((item) => (
                <li key={item} className="rounded-xl bg-navy-50 px-4 py-3 text-sm font-bold leading-6 text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="text-xl font-black text-navy-900">의원실 정보</h4>
            <div className="mt-4 space-y-3">
              {officeItems.map((item) => (
                <div key={item.label} className="flex justify-between gap-4 rounded-xl bg-navy-50 px-4 py-3 text-sm">
                  <span className="font-bold text-slate-500">{item.label}</span>
                  <span className="font-extrabold text-navy-900">{item.value}</span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h4 className="text-xl font-black text-navy-900">주요 약력</h4>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {careerItems.map((item) => (
              <div key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

function ConstituencyTab() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-navy-900 text-white shadow-civic">
        <Image
          src={imagePaths.jinjuWide}
          alt="진주성과 남강이 보이는 진주 전경"
          fill
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/92 via-navy-900/28 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-red-100">Jinju-eul</p>
          <h3 className="mt-3 text-3xl font-black">진주시을 지역구</h3>
          <p className="mt-3 max-w-xl text-sm font-bold leading-6 text-white/78">
            총 {districts.length}개 읍면동의 현장, 민원, 정책, 예산 활동을 한눈에 연결합니다.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {districtGroups.map((group) => (
          <article key={group.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h4 className="text-lg font-black text-navy-900">{group.title}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full bg-navy-50 px-3 py-1 text-xs font-extrabold text-navy-800">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PolicyTab() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {policies.map((policy) => (
        <article
          key={policy.id}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-civic"
        >
          <div className="relative aspect-[4/3] bg-navy-50">
            <Image
              src={policy.image}
              alt={`${policy.title} 정책 이미지`}
              fill
              sizes="(min-width: 1280px) 31vw, (min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-black text-navy-900">{policy.title}</h3>
            <p className="mt-2 text-sm font-extrabold text-civic-blue">{policy.subtitle}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">{policy.description}</p>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs font-bold text-slate-500">관련 활동 {policy.relatedActivities.length}건</span>
              <a
                href="#activities"
                className="rounded-md text-sm font-black text-navy-900 focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                aria-label={`${policy.title} 관련 활동 보기`}
              >
                활동 보기
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function TabbedInfoSection() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  return (
    <section id="info-tabs" className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Official Briefing"
          title="프로필·지역구·정책 한눈에 보기"
          description="강민국 의원의 주요 이력과 진주시을 현안, 정책 의제를 정리했습니다."
        />

        <div className="mt-8 overflow-x-auto pb-2" role="tablist" aria-label="정보 섹션 탭">
          <div className="inline-flex min-w-full gap-2 rounded-full bg-navy-50 p-1 sm:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`info-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={
                  activeTab === tab.id
                    ? "min-h-12 shrink-0 rounded-full bg-civic-red px-6 text-sm font-black text-white shadow-civic focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
                    : "min-h-12 shrink-0 rounded-full px-6 text-sm font-black text-navy-900 transition hover:bg-white hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                }
              >
                <span className="mr-2 text-[10px] uppercase tracking-[0.18em] opacity-70">{tab.eyebrow}</span>{" "}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div id={`info-panel-${activeTab}`} role="tabpanel" className="mt-7">
          {activeTab === "profile" ? <ProfileTab /> : null}
          {activeTab === "constituency" ? <ConstituencyTab /> : null}
          {activeTab === "policy" ? <PolicyTab /> : null}
        </div>
      </div>
    </section>
  );
}
