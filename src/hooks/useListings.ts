import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { listingType } from "@/types/listing";
import { toast } from "sonner";

export const useListings = (range: [number, number]) => {
    const [listings, setListings] = useState<listingType[]>([]);
    const [userVotes, setUserVotes] = useState<Record<number, string>>({});
    const [error, setError] = useState<string>("");

    const fetchListings = async () => {
        try {
            const { data, error } = await supabase
                .from("listings")
                .select("*")
                .order("vote", { ascending: false })
                .range(range[0], range[1]);

            if (error) {
                toast.error(`Error fetching listings: ${error.message}`);
                return;
            }

            if (data?.length) {
                setListings(data);
            } else {
                setError("No data available yet :(");
            }
        } catch (err) {
            console.error("Something went wrong while fetching listings", err);
        }
    };

    const loadVotesFromLocalStorage = () => {
        if (typeof window !== "undefined") {
            const storedVotes = localStorage.getItem("votes");
            if (storedVotes) {
                const parsedVotes = JSON.parse(storedVotes);
                if (JSON.stringify(userVotes) !== JSON.stringify(parsedVotes)) {
                    setUserVotes(parsedVotes);
                }
            }
        }
    };

    const voteListing = async (id: number, vote: number, type: string) => {
        const votes = { ...userVotes };

        if (votes[id]) {
            if (votes[id] === type) return;
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
                toast.error(`Error updating vote: ${error.message}`);
            } else {
                fetchListings();
            }
        } catch (err) {
            console.error("Unexpected error while updating vote:", err);
        }
    };

    useEffect(() => {
        fetchListings();
        loadVotesFromLocalStorage();
    }, [range]);

    return { listings, userVotes, error, voteListing };
};
