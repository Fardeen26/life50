import Link from "next/link";
import { GithubIcon, SunIcon, Twitter } from "lucide-react";
import AddButton from "./AddButton";

export default function Header() {
    return (
        <header className="p-3 flex justify-center pr-8 pt-6">
            <nav className="flex justify-between px-6 py-2 items-center w-[70vw] h-fit rounded-xl bg-white text-black dark:shadow-none shadow">

                <div className="text-xl font-bold">
                    LifeFifty
                </div>

                <div className="flex gap-5">



                    <div className='flex items-center dark:text-white gap-4'>
                        <button >
                            <SunIcon className='w-5 h-5 max-sm:w-4 max-sm:h-4 hover:scale-105 transition-all' />
                        </button>
                        <Link href={'https://github.com/Fardeen26'} target="_blank">
                            <GithubIcon className="w-[18px] h-[18px] max-sm:w-4 max-sm:h-4 hover:scale-105 transition-all" />
                        </Link>
                        <Link href={'https://x.com/fardeen14693425'} target="_blank">
                            <Twitter className="w-[18px] h-[18px] max-sm:w-4 max-sm:h-4 hover:scale-105 transition-all" />
                        </Link>
                    </div>
                    <AddButton />
                </div>
            </nav>
        </header>
    )
}