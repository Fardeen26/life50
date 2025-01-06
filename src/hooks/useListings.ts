import { useEffect, useState, useCallback } from "react";
import { listingType } from "@/types/listing";
import { toast } from "sonner";
import axios from "axios";

export const useListings = (range: [number, number]) => {
    const [listings, setListings] = useState<listingType[]>([]);
    const [userVotes, setUserVotes] = useState<Record<number, string>>({});
    const [error, setError] = useState<string>("");

    const fetchListings = useCallback(async () => {
        try {
            const response = await axios.get('/api/fetch')
            const data = response.data.message;

            if (data?.length) {
                setListings((prev) =>
                    JSON.stringify(prev) === JSON.stringify(data) ? prev : data
                );
            } else {
                setError((prev) => (prev === "No data available yet :(" ? prev : "No data available yet :("));
            }
        } catch (err) {
            console.error("Something went wrong while fetching listings", err);
        }
    }, []);


    const loadVotesFromLocalStorage = useCallback(() => {
        if (typeof window !== "undefined") {
            const storedVotes = localStorage.getItem("votes");
            if (storedVotes) {
                const parsedVotes = JSON.parse(storedVotes);
                setUserVotes((prev) =>
                    JSON.stringify(prev) === JSON.stringify(parsedVotes) ? prev : parsedVotes
                );
            }
        }
    }, []);

    const voteListing = async (id: number, vote: number, type: string) => {
        console.log("voteListing", id, vote, type)
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

    const filterListings = async (category: string) => {
        try {
            if (category !== 'All') {
                const response = await axios.get('/api/filter', {
                    params: {
                        category,
                        range1: range[0],
                        range2: range[1]
                    }
                });
                const data = response.data.message;

                if (data.error) {
                    toast.error(`Error fetching listings: ${data.error.message}`);
                    return;
                }

                if (data?.length) {
                    setListings((prev) =>
                        JSON.stringify(prev) === JSON.stringify(data) ? prev : data
                    );
                    setError('')
                } else {
                    setListings([])
                    setError((prev) => (prev === "No data available yet :(" ? prev : "No data available yet :("));
                }
            } else {
                setError('')
                await fetchListings();
            }

        } catch (err) {
            console.error("Unexpected error while filtering listings:", err);
        }
    }

    const updateVoteInDB = async (id: number, newVote: number) => {
        try {
            console.log("updateVoteInDB", id, newVote)
            const response = await axios.post('/api/update-vote', { id, newVote });
            const data = response.data.message;
            if (data.success === false) {
                toast.error(`Error updating vote: ${data.error.message}`);
            } else {
                await fetchListings();
            }
        } catch (err) {
            console.error("Unexpected error while updating vote:", err);
        }
    };

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    useEffect(() => {
        loadVotesFromLocalStorage();
    }, [loadVotesFromLocalStorage]);

    return { listings, userVotes, error, voteListing, filterListings };
};
