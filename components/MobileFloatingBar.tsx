"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type IconName = "profile" | "policy" | "home" | "proposal" | "map";

type TabItem = {
  label: string;
  href: string;
  icon: IconName;
  match: (pathname: string, hash: string) => boolean;
};

const tabs: TabItem[] = [
  { label: "소개", href: "/profile", icon: "profile", match: (pathname) => pathname === "/profile" },
  { label: "정책", href: "/policies", icon: "policy", match: (pathname) => pathname === "/policies" },
  { label: "홈", href: "/", icon: "home", match: (pathname, hash) => pathname === "/" && hash !== "#jinju-map" },
  { label: "민원", href: "/participation", icon: "proposal", match: (pathname) => pathname === "/participation" },
  { label: "지도", href: "/#jinju-map", icon: "map", match: (pathname, hash) => pathname === "/" && hash === "#jinju-map" }
];

function TabIcon({ name }: { name: IconName }) {
  if (name === "profile") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path d="M12 12a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M4.4 21c.8-4 3.4-6.1 7.6-6.1s6.8 2.1 7.6 6.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
      </svg>
    );
  }

  if (name === "policy") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path d="M5.5 5.5h9.2M5.5 11.5h7.4M5.5 17.5h5.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
        <path d="m15.2 16.3 2 2 3.7-4.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
      </svg>
    );
  }

  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path d="M3.7 11.1 12 4l8.3 7.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
        <path d="M6.4 10.3v9.1h4.1v-5.2h3v5.2h4.1v-9.1" fill="currentColor" />
      </svg>
    );
  }

  if (name === "proposal") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path d="M5 5.4h14v10.2H9.2L5 19.4v-14Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.2" />
        <path d="M8.4 9.2h7.2M8.4 12.5h4.7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path d="M12 21s6.4-5.2 6.4-11.2A6.4 6.4 0 0 0 5.6 9.8C5.6 15.8 12 21 12 21Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" fill="currentColor" />
    </svg>
  );
}

export function MobileFloatingBar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    function syncHash() {
      setHash(window.location.hash);
    }

    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  function handleClick(item: TabItem) {
    if (item.href === "/") {
      setHash("");
      window.setTimeout(() => setHash(window.location.hash), 0);
    }

    if (item.href === "/#jinju-map") {
      setHash("#jinju-map");
      window.setTimeout(() => setHash(window.location.hash), 0);
    }
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden" aria-label="모바일 하단 메뉴">
      <div className="mx-auto max-w-md px-3 pb-[calc(env(safe-area-inset-bottom)+10px)]">
        <div className="relative grid h-[74px] grid-cols-5 items-end rounded-t-[1.65rem] border border-white/10 bg-[#050b1d]/96 px-2 pb-2 pt-3 shadow-[0_-18px_46px_rgba(0,27,68,0.26)] backdrop-blur-xl">
          {tabs.map((item) => {
            const active = item.match(pathname, hash);
            const isHome = item.icon === "home";

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleClick(item)}
                aria-current={active ? "page" : undefined}
                className={[
                  "group relative flex min-w-0 flex-col items-center justify-end gap-1 rounded-2xl text-[11px] font-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/50",
                  isHome ? "-mt-9 pb-0" : "min-h-14 pb-1.5",
                  active ? "text-white" : "text-white/48 hover:text-white/82"
                ].join(" ")}
              >
                {isHome ? (
                  <span
                    className={[
                      "grid h-[62px] w-[62px] place-items-center rounded-full border-[5px] border-[#050b1d] shadow-[0_16px_38px_rgba(38,103,255,0.34)] transition duration-300",
                      active ? "bg-[#356fff] text-white" : "bg-[#1e4fbf] text-white/86 group-hover:bg-[#356fff]"
                    ].join(" ")}
                  >
                    <TabIcon name={item.icon} />
                  </span>
                ) : (
                  <TabIcon name={item.icon} />
                )}
                <span className={["truncate", active ? "text-[#7da2ff]" : ""].join(" ")}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
