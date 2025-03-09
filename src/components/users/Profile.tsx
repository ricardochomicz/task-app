import { User } from "lucide-react";
import { IUser } from "../../interfaces/UserInterface";

interface ProfileProps {
    user: IUser | null;
    toggleDrawer: () => void;
    isOpen: boolean,
    onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, toggleDrawer, isOpen, onClose }) => {
    return (
        <div>
            <div className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} bg-white w-80 dark:bg-gray-700`} aria-labelledby="drawer-right-label">
                <div className="flex items-center gap-2 mb-4">
                    <User size={22} className="text-gray-400" />
                    <h5 id="drawer-label" className="inline-flex items-center text-base font-semibold text-gray-500 uppercase dark:text-gray-400">

                        Meu Perfil</h5>
                </div>
                <button type="button" onClick={onClose} data-drawer-hide="drawer-contact" aria-controls="drawer-contact" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close menu</span>

                </button>
                <form className="mb-6">
                    <div className="mb-6">
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                        <input type="text" value={user?.name || ''} id="subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Let us know how we can help you" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                        <input type="email" value={user?.email || ''} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block">Editar Perfil</button>
                </form>

            </div>
        </div>

    );
};

export default Profile;
