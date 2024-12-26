import Hero from "@/components/Hero";
import ListingOther from "@/components/ListingOther";
import ListingTop from "@/components/ListingTop";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pb-10">
      <Image src="/grad1.svg" alt="hero" width={0} height={0} className="fixed -z-50 object-cover size-full opacity-50" />
      <Hero />
      <section className="flex justify-center mt-20 z-[999]">
        <Tabs defaultValue="account" className="w-[30vw]">
          <TabsList className="flex justify-center gap-5">
            <TabsTrigger value="account">🔥 Top 50</TabsTrigger>
            <TabsTrigger value="password">✨ Others</TabsTrigger>
          </TabsList>
          <TabsContent value="account"><ListingTop /></TabsContent>
          <TabsContent value="password"><ListingOther /></TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
