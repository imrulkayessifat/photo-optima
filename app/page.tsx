"use client"

import { useEffect } from "react";


import { useSearchParams } from "next/navigation";
import Cookies from 'js-cookie';


import Navbar from "@/components/navbar";
import ImageBox from "@/components/image/image-box";
import ManualUpload from "@/components/manual-upload";
import AutoCompression from "@/components/auto-compression";


export default function Home() {
  const searchParams = useSearchParams()

  const storeToken = searchParams.get('storeToken')

  // Use js-cookie to set the cookie
  Cookies.set('storeToken', storeToken!);


  // const store = searchParams.get('shop')

  // useEffect(() => {
  //   if (store !== null) {
  //     localStorage.setItem('store-name', store)
  //   }

  // }, [store])

  return (
    <main>
      <Navbar />
      {/* <div className="mt-24">
        <AutoCompression />
        <ManualUpload />
        <ImageBox />
      </div> */}
    </main>
  );
}
