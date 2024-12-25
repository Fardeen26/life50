import { bricolage_grotesque } from "@/lib/fonts";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export default function Hero() {
    return (
        <section className="flex flex-col items-center pt-40 z-50">
            <Badge className="px-5 space-x-2 rounded-full">
                <span>🎉</span>
                <Separator className="w-[.5px] h-3" />
                <span>Introducing LifeFifty</span>
            </Badge>
            <h1 className={`text-7xl mt-4 font-bold text-center ${bricolage_grotesque}`}>
                Top 50 Things That
                <br />
                Changed People&apos;s Life
            </h1>
            <p className="text mt-6 text-gray-400 px-96 text-center">From life-changing resources to unforgettable favorites, explore the ultimate lists shaped by the internet’s collective voice. Vote, contribute, and be part of the movement!</p>
        </section>
    );
}