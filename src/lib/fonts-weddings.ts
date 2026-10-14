import { Instrument_Serif } from "next/font/google";

/** Serif editorial (redonda + cursiva) usada solo en Cala Weddings. */
export const weddingSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-wedding-serif",
  display: "swap",
});
