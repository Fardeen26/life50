import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Image src="/mmmotif.svg" alt="hero" width={0} height={0} className="absolute -z-50 object-cover size-full opacity-50" />
      <Hero />
    </div>
  );
}
