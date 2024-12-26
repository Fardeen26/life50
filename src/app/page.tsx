import Hero from "@/components/Hero";
import Listing from "@/components/Listing";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pb-10">
      <Image src="/grad1.svg" alt="hero" width={0} height={0} className="fixed -z-50 object-cover size-full opacity-50" />
      <Hero />
      <Listing />
    </div>
  );
}
