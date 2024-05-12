"use client"

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/navbar";
import ImageBox from "@/components/image/image-box";
import ManualUpload from "@/components/manual-upload";


export default function Home() {
  const searchParams = useSearchParams()

  const store = searchParams.get('shop')

  useEffect(() => {
    if (store !== null) {
      localStorage.setItem('store-name', store)
    }

  }, [store])

  return (
    <main>
      <Navbar />
      <div className="mt-24">
        <ManualUpload />
        <ImageBox />
      </div>
    </main>
  );
}
