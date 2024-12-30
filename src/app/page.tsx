"use client"

import AddButton from "@/components/AddButton";
import Hero from "@/components/Hero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import dynamic from 'next/dynamic'
import React from "react";
const ListingTop = dynamic(() => import('@/components/ListingTop'), { ssr: true })
const ListingOther = dynamic(() => import('@/components/ListingOther'), { ssr: true })

export default React.memo(function Home() {
  return (
    <div className="pb-10">
      <Image src="/sssurf.svg" alt="hero" width={0} height={0} className="fixed -z-50 object-cover size-full opacity-50" />
      <Hero />
      <AddButton />
      <section className="flex justify-center mt-24 z-[999]">
        <Tabs defaultValue="account" className="w-[30vw] max-sm:w-full !bg-transparent">
          <TabsList className="flex justify-center gap-5 !bg-transparent">
            <TabsTrigger value="account">🔥 Top 50</TabsTrigger>
            <TabsTrigger value="password">✨ Others</TabsTrigger>
          </TabsList>
          <TabsContent value="account"><ListingTop /></TabsContent>
          <TabsContent value="password"><ListingOther /></TabsContent>
        </Tabs>
      </section>
    </div>
  );
})
