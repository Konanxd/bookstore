import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function GuestLayout({ children }) {
    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="h-screen w-full overflow-y-scroll">{children}</div>
        </div>
    );
}
