"use client"

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import ImageBox from "@/components/image/image-box";

export default async function Home() {
  const searchParams = useSearchParams()

  const accessToken = searchParams.get('access_token')
  console.log(accessToken)


  return (
    <main>
      <Navbar />
      <div className="mt-24">
        <ImageBox />
      </div>
    </main>
  );
}
