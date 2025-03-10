
import { Star } from "lucide-react";
import { SubmitHandler, UseFormRegister } from "react-hook-form";

interface TaskFormProps {
    handleSubmit: SubmitHandler<any>;
    register: UseFormRegister<any>;
    errors: any;
    favorite: boolean
    setFavorite: (value: boolean) => void;
}

function TaskForm({ handleSubmit, register, errors, favorite, setFavorite }: TaskFormProps) {

    return (
        <div>
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="w-96 bg-white shadow-md rounded-xl border p-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <input
                            type="text"
                            className="w-full text-lg font-semibold focus:outline-none bg-transparent"
                            placeholder="Título"
                            {...register('title')}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        <button type="button" onClick={() => setFavorite(!favorite)}>
                            <Star
                                size={20}
                                className={`${favorite ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                                    } transition-colors`}
                            />
                        </button>

                    </div>
                    {/* Input de Descrição */}
                    <textarea
                        className="w-full mt-2 p-2 text-gray-600 bg-transparent border-none focus:ring-0 focus:outline-none resize-none"
                        placeholder="Descrição da nota..."
                        {...register('description')}
                        rows={2}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    {/* Botão de Criar */}

                    <div className="flex justify-end">
                        <button type="submit" className="text-white text-sm bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Criar
                        </button>
                    </div>
                </form>
            </div >
        </div>
    )
}

export default TaskForm