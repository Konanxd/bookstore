import Navbar from "@/Components/Navbar";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="flex w-full flex-row">
            <Navbar />
            <main className="w-full h-screen overflow-y-scroll">
                {children}
            </main>
        </div>
    );
}
