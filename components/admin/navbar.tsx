"use client"

import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Logo from "@/components/logo";

const Navbar = () => {
    const user = useCurrentUser();

    return (
        <header className={`fixed z-40 top-0 bg-white dark:bg-[#0f0f0f] shadow-sm py-5 w-screen`}>
            <div className='mx-auto px-10 flex justify-between items-center'>
                <Link href={"/"}>
                    <Logo src="/photo-optima.svg" />
                </Link>
                <div className="flex justify-between gap-2">
                    {/* {
                        user && (
                            <LogoutButton>
                                <IoIosLogOut className="dark:bg-[#0f0f0f] w-8 h-8 cursor-pointer" />
                            </LogoutButton>
                        )
                    } */}
                    <LogoutButton>
                        <IoIosLogOut className="dark:bg-[#0f0f0f] w-8 h-8 cursor-pointer" />
                    </LogoutButton>
                </div>
            </div>
        </header >
    )
}

export default Navbar