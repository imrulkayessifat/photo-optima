"use client"

import Link from "next/link";
import Image from "next/image";
import {
    Menu,
    CreditCard,
    Keyboard,
    Settings,
    User,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo";
import { useAppRouter } from "@/hooks/use-app-router";

const Navbar = () => {
    const { shop } = useAppRouter();
    console.log("app bridge shop",shop)
    return (
        <header className={`fixed z-40 top-0 bg-white dark:bg-[#0f0f0f] shadow-sm py-5 w-screen`}>
            <div className='mx-auto px-8 flex justify-between items-center'>
                <Link href={"/"}>
                    <Logo src="/photo-optima.svg" />
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Photo Optima</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href={"/settings"}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                            </Link>
                            <Link href={"/batch"}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Batch Actions</span>
                                </DropdownMenuItem>
                            </Link>
                            <Link href={"/plans"}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Plans</span>
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header >
    )
}

export default Navbar