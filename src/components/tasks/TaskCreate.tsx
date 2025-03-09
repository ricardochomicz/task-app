import { useState } from "react";
import { Star } from "lucide-react";

function TaskCreate() {
    const [isFavorite, setIsFavorite] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return (
        <div>
            <div className="flex justify-center items-center mt-2">
                <div className="w-96 bg-white shadow-md rounded-xl border p-4">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-2">
                        <input
                            type="text"
                            className="w-full text-lg font-semibold focus:outline-none bg-transparent"
                            placeholder="Título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button onClick={() => setIsFavorite(!isFavorite)}>
                            <Star
                                size={20}
                                className={`${isFavorite ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                                    } transition-colors`}
                            />
                        </button>
                    </div>

                    {/* Input de Descrição */}
                    <textarea
                        className="w-full mt-2 p-2 text-gray-600 bg-transparent border-none focus:ring-0 focus:outline-none resize-none"
                        placeholder="Criar nota..."
                        rows={2}
                    />
                    {/* Botão de Criar */}

                    <div className="flex justify-end">
                        <button type="button" className="text-white text-sm bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Criar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TaskCreate;