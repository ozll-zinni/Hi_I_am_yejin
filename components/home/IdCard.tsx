"use client";

import { useState, useSyncExternalStore } from "react";
import Lanyard from "@/components/Lanyard/Lanyard";

// Phones get a static card: the strap covers the hero copy and the physics isn't worth the GPU.
const desktop = "(min-width: 640px)";
const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(desktop);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

export function IdCard() {
  const isDesktop = useSyncExternalStore(subscribe, () => window.matchMedia(desktop).matches, () => false);
  const [flipped, setFlipped] = useState(false);

  if (isDesktop) {
    return <Lanyard frontImage="/card-front.jpg" backImage="/card-back.svg" strapImage="/band.png" />;
  }
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-label={flipped ? "사원증 앞면 보기" : "사원증 뒷면 보기"}
      className="absolute left-1/2 top-1/2 aspect-[1.6/2.25] w-[55vw] max-w-60 -translate-x-1/2 -translate-y-1/2 perspective-distant"
    >
      <span
        className={`relative block size-full transition-transform duration-700 transform-3d motion-reduce:transition-none ${flipped ? "rotate-y-180" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static asset, sized by CSS */}
        <img src="/card-front.jpg" alt="김예진 사원증 앞면" className="absolute inset-0 size-full rounded-2xl object-cover shadow-xl backface-hidden" />
        {/* eslint-disable-next-line @next/next/no-img-element -- static asset, sized by CSS */}
        <img src="/card-back.svg" alt="이름 김예진, 생년월일 2000.04.28, FE Developer" className="absolute inset-0 size-full rotate-y-180 rounded-2xl bg-white object-cover shadow-xl backface-hidden" />
      </span>
    </button>
  );
}
