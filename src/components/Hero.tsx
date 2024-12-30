import { bricolage_grotesque } from "@/lib/fonts";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export default function Hero() {
    return (
        <section className="flex flex-col items-center pt-16 max-sm:pt-20 z-50 max-sm:px-2">
            <Badge className="px-5 space-x-2 rounded-full bg-white hover:bg-gray-300 text-black">
                <span>🎉</span>
                <Separator className="w-[.5px] h-3" />
                <span>Introducing LifeFifty</span>
            </Badge>
            <h1 className={`text-7xl max-sm:text-4xl mt-4 font-bold text-center ${bricolage_grotesque}`}>
                Top 50 Things That
                <br />
                <span className="text-[#F9BF1E]">Changed</span> People&apos;s Life
            </h1>
            <p className="text mt-6 text-gray-300 px-96 max-lg:px-32 max-sm:px-0 text-center">From life-changing resources to unforgettable favorites, explore the ultimate lists shaped by the internet’s collective voice. Vote, contribute, and be part of the movement!</p>
        </section>
    );
}