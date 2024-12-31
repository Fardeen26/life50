import { MagicCard } from "./ui/magic-card";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { Skeleton } from "./ui/skeleton";
import { useListings } from "@/hooks/useListings";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { bricolage_grotesque } from "@/lib/fonts";
import { useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"

export default function ListingTop() {
    const range: [number, number] = useMemo(() => [50, 70], []);
    const { listings, userVotes, error, voteListing, filterListings } = useListings(range);

    return (
        <div className="flex flex-col items-center w-full relative">
            <div className={`flex justify-start w-[51vw] max-lg:w-[70vw] max-sm:w-full ${error ? 'hidden' : ''}`}>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <SlidersHorizontal className="w-4 h-4 mr-1" /> Filter
                        </MenubarTrigger>
                        <MenubarContent>
                            {
                                categories.map((cat, idx) => (
                                    <MenubarItem key={idx} onClick={() => {
                                        filterListings(cat)
                                    }}>{cat}</MenubarItem>
                                ))
                            }
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
            <section className="flex flex-col items-center gap-8 mt-2 max-sm:px-2">
                {error && <div className="mt-4 h-20">{error}</div>}
                {listings.length < 1 && !error && (
                    <div className="flex flex-wrap items-center w-[50vw] max-sm:w-full space-y-8">
                        <Skeleton className="w-[50vw] max-sm:w-full h-24 rounded-xl" />
                        <Skeleton className="w-[50vw] max-sm:w-full h-24 rounded-xl" />
                    </div>
                )}

                {listings && listings.map((listing, index) => (
                    <MagicCard
                        key={index}
                        className={`cursor-pointer w-[50vw] max-lg:w-[70vw] max-sm:w-full h-fit flex text-white border-none shadow-2xl bg-black relative ${bricolage_grotesque}`}
                        gradientColor={"rgba(197, 241, 241, 0.1)"}
                    >
                        <div className="card flex items-center p-4 gap-5 w-[50vw] max-lg:w-[70vw] max-sm:w-full">
                            <div className="h-12 w-12 p-4 rounded-full bg-white text-black flex justify-center items-center relative">
                                <Image src={'/rank-bg.avif'} alt="rank-bg" width={100} height={100} className="absolute object-fit size-full rounded-full" />
                                <span className="z-50 font-semibold">#{index + 1}</span>
                            </div>
                            <div className="content pr-12">
                                <h2 className="text-xl font-semibold">
                                    <Link href={`${listing.resource_link ? listing.resource_link : '#'}`} target="_blank" className="hover:underline">
                                        {listing.title}
                                    </Link>
                                </h2>
                                <p className="text-sm mt-1 text-gray-300">{listing.description}</p>
                                <p className="text-xs mt-2 text-gray-400">
                                    by <Link href={`https://x.com/${listing.user_twitter}`} target="_blank">
                                        <span className="underline">{listing.username}</span>
                                    </Link> on <span>{dayjs(listing.created_at).format('DD, MMM, YY')}</span>
                                </p>
                            </div>
                            <div className="upvote flex flex-col absolute right-5 items-center gap-2">
                                <button
                                    className={`hover:scale-110 transition-all ${userVotes[listing.id] === "upvote" ? "scale-150 hover:scale-150 text-green-500" : ""
                                        }`}
                                    onClick={() => voteListing(listing.id, listing.vote, "upvote")}
                                >
                                    <BiUpvote />
                                </button>
                                <span>{(listing.vote ?? 0)}</span>
                                <button
                                    className={`hover:scale-110 transition-all ${userVotes[listing.id] === "downvote" ? "scale-150 text-red-500" : ""
                                        }`}
                                    onClick={() => voteListing(listing.id, listing.vote, "downvote")}
                                >
                                    <BiDownvote />
                                </button>
                            </div>
                        </div>
                    </MagicCard>
                ))}
            </section>
        </div>
    );
}

const categories = ["All", "Books", "Videos", "Article", "Quotes", "Courses", "Other"]