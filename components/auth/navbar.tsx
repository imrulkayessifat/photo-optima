"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const Navbar = () => {

    return (
        <header className={`fixed z-40 top-0 bg-white dark:bg-[#0f0f0f] shadow-sm py-5 w-screen`}>
            <div className='mx-auto px-10 flex justify-between items-center'>
                <Link href={"/"}>
                    <Logo src="/photo-optima.svg" />
                </Link>
                <div className="flex justify-between gap-2">
                    <Link href={"/login"}>
                        <Button variant={"outline"}>
                            Log in
                        </Button>
                    </Link>
                    <Link href={"/register"}>
                        <Button variant={"outline"}>
                            Sign up
                        </Button>
                    </Link>
                </div>
            </div>
        </header >
    )
}

export default Navbar