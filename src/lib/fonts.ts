import { Bricolage_Grotesque } from "next/font/google";


const bricolage_grotesque_init = Bricolage_Grotesque({
    subsets: ["latin"],
    display: "swap",
});

export const bricolage_grotesque = bricolage_grotesque_init.className;