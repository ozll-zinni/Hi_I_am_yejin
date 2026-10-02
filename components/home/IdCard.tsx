"use client";

import dynamic from "next/dynamic";

// three.js / rapier need the browser (WebGL + WASM), so skip prerendering.
export const IdCard = dynamic(() => import("./Lanyard"), { ssr: false });
