"use client"

import { useEffect, useState } from "react";
import { MagicCard } from "./ui/magic-card";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { listingType } from "@/types/listing";
import dayjs from 'dayjs'
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ListingTop() {
    const [listings, setListings] = useState<listingType[]>([])

    const fetchListings = async () => {
        try {
            const { data, error } = await supabase.from('listings').select('*').order("vote", { ascending: false });
            if (error) {
                console.error("Error updating todo:", error.message);
                return;
            }
            if (data) {
                setListings(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const voteListing = async (id: number, vote: number, type: string) => {
        const votes = JSON.parse(localStorage.getItem("votes") || "{}");

        if (votes[id]) {
            if (votes[id] === type) {
                console.log(`You have already ${type}d this listing.`);
                return;
            }

            const newVote = type === "upvote" ? vote + 1 : vote - 1;
            votes[id] = type;
            await updateVoteInDB(id, newVote);
            localStorage.setItem("votes", JSON.stringify(votes));
            return;
        }

        const newVote = type === "upvote" ? vote + 1 : vote - 1;
        votes[id] = type;
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
            } else {
                fetchListings();
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };


    useEffect(() => {
        fetchListings()
    }, [])


    return (
        <section className="flex flex-col items-center gap-8 mt-6 max-sm:px-2">
            {listings.length < 1 && <p>Loading...</p>}

            {listings && listings.map((listing, index) => (
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
                            <h2 className="text-xl font-semibold">
                                <Link href={`${listing.resource_link ? listing.resource_link : '#'}`} target="_blank">
                                    {listing.title}
                                </Link>
                            </h2>
                            <p className="">{listing.description}</p>
                            <p className="text-xs mt-2 text-gray-300">
                                by <Link href={`https://x.com/${listing.user_twitter}`} target="_blank">
                                    <span className="underline">{listing.username}</span>
                                </Link> on <span>{dayjs(listing.created_at).format('DD, MMM, YY')}</span>
                            </p>
                        </div>
                        <div className="upvote flex flex-col absolute right-5 items-center gap-2">
                            <button className="hover:scale-110 transition-all" onClick={() => voteListing(listing.id ?? 0, listing.vote ?? 0, "upvote")}>
                                <BiUpvote />
                            </button>
                            <span>{(listing.vote ?? 0)}</span>
                            <button className="hover:scale-110 transition-all" onClick={() => voteListing(listing.id ?? 0, listing.vote ?? 0, "downvote")}>
                                <BiDownvote />
                            </button>
                        </div>
                    </div>
                </MagicCard>
            ))}
        </section>
    );
}
