"use client";

import Link from "next/link";

import Navbar from "@/components/navbar";

interface AdminLayoutProps {
    children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="w-full h-full flex flex-col gap-y-10">
            <Navbar />
            {
                children
            }
        </div>
    )
}

export default AdminLayout