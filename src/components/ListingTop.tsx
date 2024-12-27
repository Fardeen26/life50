import { MagicCard } from "./ui/magic-card";
import { BiUpvote, BiDownvote } from "react-icons/bi";


export default function ListingTop() {
    const cards = Array(10).fill(0); // Array to iterate 10 times

    return (
        <section className="flex flex-col items-center gap-8 mt-6 max-sm:px-2">
            {cards.map((_, index) => (
                <MagicCard
                    key={index}
                    className="cursor-pointer w-[50vw] max-sm:w-full h-fit flex text-white shadow-2xl bg-transparent relative"
                    gradientColor={"#0A00F5"}
                >
                    <div className="card flex items-center p-4 gap-5 w-[50vw] max-sm:w-full">
                        <div className="h-12 w-12 p-4 rounded-full bg-white text-black flex justify-center items-center">
                            #{index + 1}
                        </div>
                        <div className="content pr-12">
                            <h2 className="text-xl font-semibold">Atomic Habits by James Clear</h2>
                            <p className="">A book that teaches how small habits can lead to big changes in life.</p>
                            <p className="text-xs mt-2 text-gray-300">by <span className="underline">Fardeen</span> on <span>26 Dec, 24</span></p>
                        </div>
                        <div className="upvote flex flex-col absolute right-5 items-center gap-2">
                            <span className="hover:scale-110 transition-all"><BiUpvote /></span>
                            <span>{10 - index}</span>
                            <span className="hover:scale-110 transition-all"><BiDownvote /></span>
                        </div>
                    </div>
                </MagicCard>
            ))}
        </section>
    );
}
