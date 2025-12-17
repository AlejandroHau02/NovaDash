import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[var(--bg-body)] overflow-hidden">

            {/* Sidebar desktop*/}
            <Sidebar />

            {/** Sidebar backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/** Main Content */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 md:ml-64">
                <Navbar toggleSidebar={() =>
                    setIsSidebarOpen(!isSidebarOpen)
                } />

                <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;