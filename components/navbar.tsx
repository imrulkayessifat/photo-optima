import Link from "next/link";
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

const Navbar = () => {

    return (
        <header className={`fixed z-40 top-0 bg-white dark:bg-[#0f0f0f] shadow-sm py-5 w-screen`}>
            <div className='mx-auto px-10 flex justify-between items-center'>
                <Link href={"/"}>
                    <svg width="40" height="40" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M52.6872 14.121C54.2205 16.7767 55.2733 19.578 55.8726 22.4242C47.0283 14.4916 33.7521 12.7376 22.9044 19.0005C12.0567 25.2634 6.93759 37.638 9.38528 49.2636C7.22004 47.3215 5.32044 45.0092 3.78715 42.3534C-4.00904 28.85 0.617566 11.5833 14.121 3.78715C27.6243 -4.00904 44.8911 0.617566 52.6872 14.121Z" fill="url(#paint0_linear_111_2091)" />
                        <path d="M51.8363 32.7234C52.6784 34.1821 53.2956 35.7089 53.6987 37.2637C47.8223 32.5633 39.4342 31.6733 32.5244 35.6628C25.6145 39.6522 22.1912 47.3615 23.3236 54.8007C22.1786 53.6743 21.165 52.3763 20.3229 50.9177C15.2986 42.2155 18.2802 31.0881 26.9824 26.0639C35.6846 21.0396 46.812 24.0212 51.8363 32.7234Z" fill="url(#paint1_linear_111_2091)" />
                        <path d="M48.7894 47.5225C48.854 47.6344 48.9156 47.7472 48.9743 47.8608C46.1308 46.5808 42.7336 46.64 39.8269 48.3182C36.9237 49.9944 35.1745 52.9018 34.8581 56C34.7909 55.8949 34.7257 55.7877 34.6627 55.6786C32.4105 51.7776 33.747 46.7895 37.648 44.5372C41.549 42.285 46.5372 43.6216 48.7894 47.5225Z" fill="url(#paint2_linear_111_2091)" />
                        <defs>
                            <linearGradient id="paint0_linear_111_2091" x1="-3.81621" y1="14.0478" x2="79.9634" y2="35.8452" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00F0FF" />
                                <stop offset="0.41026" stopColor="#7000FF" />
                                <stop offset="1" stopColor="#FF10CA" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_111_2091" x1="-3.81621" y1="14.0478" x2="79.9634" y2="35.8452" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00F0FF" />
                                <stop offset="0.41026" stopColor="#7000FF" />
                                <stop offset="1" stopColor="#FF10CA" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_111_2091" x1="-3.81621" y1="14.0478" x2="79.9634" y2="35.8452" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00F0FF" />
                                <stop offset="0.41026" stopColor="#7000FF" />
                                <stop offset="1" stopColor="#FF10CA" />
                            </linearGradient>
                        </defs>
                    </svg>
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
                            <Link href={"/help"}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Keyboard className="mr-2 h-4 w-4" />
                                    <span>Help</span>
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