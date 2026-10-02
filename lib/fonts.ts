import { Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";

// Used only for the hero's ID-card badge + giant wordmark, to match the reference look.
export const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

// Hero wordmark only. Feroniapi by Julienne Richard (Velvetyne), SIL OFL 1.1 — see app/fonts/Feroniapi-LICENSE.txt.
export const feroniapi = localFont({
  src: "../app/fonts/Feroniapi-MediumItalic.woff2",
  weight: "500",
  style: "italic",
});
