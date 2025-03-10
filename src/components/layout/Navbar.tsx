import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from "lucide-react";
import { Menu as Dropdown, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAuth } from '../../context/AuthContext';
import { IUser } from '../../interfaces/UserInterface';
import { AuthService } from '../../services/auth/AuthService';
import Profile from '../users/Profile';


const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { authenticated, logout, refreshUser } = useAuth();

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleProfile = () => {
        return setUser(AuthService.getUserFromToken());
    }

    useEffect(() => {
        if (authenticated) {
            setUser(AuthService.getUserFromToken());
        } else {
            setUser(null);
        }
    }, [authenticated]);

    if (loading) {
        return <div>Carregando...</div>; // Ou qualquer outro indicador de carregamento
    }

    if (!authenticated) return null;

    return (
        <div>
            <nav className="bg-white  dark:bg-gray-900 w-full">
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

                    {/* AVATAR E DROPDOWN */}
                    <div className="relative hidden lg:flex items-center space-x-4">
                        <small className='text-white p-2'>Olá, {user?.name}</small>
                        <Dropdown as="div" className="relative">
                            <Dropdown.Button className="flex items-center space-x-2 focus:outline-none">
                                <img
                                    src="../../../9440461.jpg"
                                    alt="Avatar"
                                    className="h-10 w-10 rounded-full  "
                                />
                            </Dropdown.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dropdown.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">

                                    <Dropdown.Item>
                                        {({ active }) => (
                                            <Link
                                                to="#"
                                                onClick={toggleModal} // Abre o drawer quando clicado
                                                className={`flex items-center px-4 py-2 text-gray-700 dark:text-white ${active ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                                            >
                                                <User size={18} className="mr-2" />
                                                Perfil
                                            </Link>
                                        )}
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogout}
                                                className={`flex w-full items-center px-4 py-2 text-red-600 dark:text-red-400 ${active ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                                            >
                                                <LogOut size={18} className="mr-2" />
                                                Sair
                                            </button>
                                        )}
                                    </Dropdown.Item>
                                </Dropdown.Items>
                            </Transition>
                        </Dropdown>
                    </div>
                </div>
            </nav>
            {isModalOpen && <Profile isOpen={isModalOpen} onClose={closeModal} user={user} />}
        </div>
    );
};

export default NavBar;