import { Moon, Sun, Menu, Bell } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ toggleSidebar }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-16 border-b border-[var(--border)] bg-white/70 dark:bg-[hsl(225,14%,11%)]/70
        background-blur-md sticky top-0 z-10 flex items-center justify-between px-4 transition-colors duration-300">
            {/**Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="p-2 mr-4 md:hidden rounded-lg hover:bg-[var(--bg-body)] text-[var(--text-muted)]"
            >
                <Menu size={24} />
            </button>

            {/**Search / placeholder del titulo */}
            <div className="flex bg-[var(--bg-body)] px-4 py-2 rounded-lg w-full max-w-md hidden md:flex border border-transparent focus-within:border-[var(--primary)] transition-all">
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent border-none outline-none text-[var(--text-main)] text-sm w-full placeholder-[var(--text-muted)]"
                />
            </div>

            {/**Rigth actions */}
            <div className="flex items-center gap-4">
                <button className="p2 rounded-full hover:bg-[var(--bg-body)] text-[var(--text-muted)] relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[var(--bg-card)]"></span>
                </button>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-[var(--bg-body)] text-[var(--text-main)] transition-colors"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/** Avatar*/}
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[var(--primary)] to-purple-400 p-[2px]">
                    <div className="h-full w-full rounded-full bg-white dark:bg-gray-800 p-0.5">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            alt="Avatar"
                            className="rounded-full h-full w-full"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;