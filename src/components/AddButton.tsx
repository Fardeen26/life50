import Link from "next/link";

export default function AddButton() {
    return (
        <section className="flex justify-center mt-10">
            <Link href={'/contribute'}>
                <button className="bg-black text-white py-2 px-6 text-sm font-semibold rounded-full scale-105 hover:scale-110 transition-all">What Changed Your Life?</button>
            </Link>
        </section>
    )
}