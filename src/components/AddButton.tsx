import Link from "next/link";

export default function AddButton() {
    return (
        <section className="flex justify-center mt-6">
            <Link href={'/contribute'}>
                <button className="bg-green-300 text-black py-2 px-5 text-sm font-semibold rounded-full">What Changed Your Life?</button>
            </Link>
        </section>
    )
}