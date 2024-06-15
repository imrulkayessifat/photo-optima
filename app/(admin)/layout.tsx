"use client";


import Navbar from "@/components/admin/navbar";

interface AdminLayoutProps {
    children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="w-full h-full flex flex-col gap-y-10 ">
            <Navbar />
            {
                children
            }
        </div>
    )
}

export default AdminLayout