import { User } from "lucide-react";
import { IUser } from "../../interfaces/UserInterface";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import { ToastService } from "../../commons/ToastMessages";

interface ProfileProps {
    user: IUser | null;
    isOpen: boolean;
    onClose: () => void;
}

interface IUserData {
    name: string;
    email: string;
}

const Profile: React.FC<ProfileProps> = ({ user, isOpen, onClose }) => {
    const [formData, setFormData] = useState<IUserData>({
        name: user?.name || '',
        email: user?.email || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
            });
        }
    }, [user]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) {
            ToastService.error("ID ou usuário inválido.");
            return;
        }
        try {
            let res = await UserService.update(formData, user.id);
            ToastService.success(res.data.message);
            onClose();
            console.log('Perfil atualizado com sucesso!')
        } catch (error: any) {
            console.log('Erro ao atualizar perfil');
            ToastService.error(error.response.data.error);
        }
    };


    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-96 p-6 transition-all duration-300 transform animate-fadeIn">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <User size={22} className="text-gray-400" />
                                <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
                                    Meu Perfil
                                </h5>
                            </div>
                            <button
                                onClick={onClose} data-testid="close"
                                className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600"
                            >
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
                                </svg>
                            </button>
                        </div>

                        <form className="mb-6" onSubmit={handleUpdate}>
                            <div className="mb-6">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Editar Perfil
                            </button>
                        </form>
                        <small className="text-white">As alterações serão refletidas quando fizer o login novamente</small>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
