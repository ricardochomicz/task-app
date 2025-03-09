import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Menu, X } from 'lucide-react';

const NavBar = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);



    const handleLogout = () => {
        // logout();
        navigate("/login");
    };

    // if (!authenticated) return null;

    return (
        <nav className="bg-white border-b border-gray-300 dark:bg-gray-900 w-full">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                <Link to="/" className="flex items-center space-x-3">
                    <img src="../../../planning.png" className="h-8" alt="Logo" />
                    <span className="text-2xl font-semibold dark:text-white">Tarefas</span>
                </Link>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden text-gray-900 dark:text-white"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <div className={`lg:flex lg:items-center lg:space-x-6 ${menuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 text-sm">
                        <li><Link to="/app/tasksvehicles" className="hover:text-blue-500 dark:text-white">Tarefas</Link></li>


                    </ul>
                    <button onClick={handleLogout} className="mt-4 lg:mt-0 text-blue-600 dark:text-blue-500 hover:underline">
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;