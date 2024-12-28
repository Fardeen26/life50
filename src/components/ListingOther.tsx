"use client"

import { useEffect, useState } from "react";
import { MagicCard } from "./ui/magic-card";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { listingType } from "@/types/listing";
import dayjs from 'dayjs'
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { bricolage_grotesque } from "@/lib/fonts";
import { Skeleton } from "./ui/skeleton";

export default function ListingTop() {
    const [listings, setListings] = useState<listingType[]>([])
    const [userVotes, setUserVotes] = useState<Record<number, string>>({});
    const [error, setError] = useState('')

    const fetchListings = async () => {
        try {
            const { data, error } = await supabase.from('listings').select('*').order("vote", { ascending: false }).range(50, 70);
            if (!data?.length) {
                setError('No data present yet :(')
            }
            if (error) {
                console.error("Error fetching todo:", error.message);
                return;
            }
            if (data) {
                setListings(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadVotesFromLocalStorage = () => {
        if (typeof window !== "undefined") {
            const storedVotes = localStorage.getItem("votes");
            if (storedVotes) {
                setUserVotes(JSON.parse(storedVotes));
            }
        }
    };

    const voteListing = async (id: number, vote: number, type: string) => {
        const votes = { ...userVotes };

        if (votes[id]) {
            if (votes[id] === type) {
                return;
            }

            const newVote = type === "upvote" ? vote + 1 : vote - 1;
            votes[id] = type;
            setUserVotes(votes);
            await updateVoteInDB(id, newVote);
            localStorage.setItem("votes", JSON.stringify(votes));
            return;
        }

        const newVote = type === "upvote" ? vote + 1 : vote - 1;
        votes[id] = type;
        setUserVotes(votes);
        await updateVoteInDB(id, newVote);
        localStorage.setItem("votes", JSON.stringify(votes));
    };

    const updateVoteInDB = async (id: number, newVote: number) => {
        try {
            const { error } = await supabase
                .from("listings")
                .update({ vote: newVote })
                .match({ id });

            if (error) {
                console.error("Error updating vote:", error.message);
            }
            else {
                fetchListings();
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    useEffect(() => {
        fetchListings()
        loadVotesFromLocalStorage();
    }, [])

    return (
        <section className="flex flex-col items-center gap-8 mt-6 max-sm:px-2">
            {error.length > 0 && error}
            {!error && listings.length < 1 && <div className="flex flex-wrap items-center w-[50vw] space-y-8">
                <Skeleton className="w-[50vw] h-24 rounded-xl" />
                <Skeleton className="w-[50vw] h-24 rounded-xl" />
            </div>}

            {listings && listings.map((listing, index) => (
                <MagicCard
                    key={index}
                    className={`cursor-pointer w-[50vw] max-sm:w-full h-fit flex text-white border-none shadow-2xl bg-black relative ${bricolage_grotesque}`}
                    gradientColor={"rgba(197, 241, 241, 0.1)"}
                >
                    <div className="card flex items-center p-4 gap-5 w-[50vw] max-sm:w-full">
                        <div className="h-12 w-12 p-4 rounded-full bg-white text-black flex justify-center items-center relative">
                            <Image src={'/rank-bg.avif'} alt="haswh" width={100} height={100} className="absolute object-fit size-full rounded-full" />
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
                                className={`hover:scale-110 transition-all ${userVotes[listing.id ?? 0] === "upvote" ? "scale-150 hover:scale-150 text-green-500" : ""
                                    }`}
                                onClick={() => voteListing(listing.id ?? 0, listing.vote ?? 0, "upvote")}
                            >
                                <BiUpvote />
                            </button>
                            <span>{(listing.vote ?? 0)}</span>
                            <button
                                className={`hover:scale-110 transition-all ${userVotes[listing.id ?? 0] === "downvote" ? "scale-150 text-red-500" : ""
                                    }`}
                                onClick={() => voteListing(listing.id ?? 0, listing.vote ?? 0, "downvote")}
                            >
                                <BiDownvote />
                            </button>
                        </div>
                    </div>
                </MagicCard>
            ))}
        </section>
    );
}
