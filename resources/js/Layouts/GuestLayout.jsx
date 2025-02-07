import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function GuestLayout({ children }) {
    return (
        <div className="flex flex-row justify-center items-center w-full h-screen">
            <div className=" bg-white rounded-md overflow-hidden">
                {children}
            </div>
        </div>
    );
}
