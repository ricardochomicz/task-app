import React, { useEffect, useState } from "react";
import { IUser } from "../../interfaces/UserInterface";
import { AuthService } from "../../services/auth/AuthService";
import { Star, Pencil, Trash, PaintBucket, Sparkles, NotebookPen } from "lucide-react";
import TaskCreate from "./TaskCreate";
import TaskService from "../../services/TaskService";
import { ITask } from "../../interfaces/TaskInterface";

// const colors = ["bg-white", "bg-blue-200", "bg-yellow-200", "bg-green-200", "bg-red-200", "bg-purple-200"];

const TaskIndex = () => {
    const colors = TaskService.getColors();
    const [user, setUser] = useState<IUser | null>(null);
    const [showColorPicker, setShowColorPicker] = useState<ITask | null>(null);
    const [tasks, setTasks] = useState<ITask[]>([]);

    const favoriteTasks = tasks.filter((task) => task.favorite);
    const otherTasks = tasks.filter((task) => !task.favorite);

    const fetchTasks = async () => {
        try {
            const response = await TaskService.index();
            setTasks(response);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    useEffect(() => {
        setUser(AuthService.getUserFromToken());
        fetchTasks();
    }, []);


    // Função para alternar cor de fundo
    const changeColor = (id: number, newColor: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, color: newColor } : task
            )
        );
        setShowColorPicker(null); // Fecha o seletor após a escolha
    };

    // Função para favoritar/desfavoritar
    const toggleFavorite = (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, isFavorite: !task.favorite } : task
            )
        );
    };

    return (
        <div className="p-4">
            <TaskCreate />

            {/* Favoritos */}
            <div className="flex items-center gap-2 mb-4">
                <Sparkles size={22} className="text-yellow-400 mt-4" />
                <h2 className="text-lg text-white font-semibold mt-4">Favoritas</h2>
                <span className="bg-white/40 text-white text-xs rounded-full mt-4 px-2 py-0.5 ml-1">
                    {favoriteTasks.length}
                </span>
            </div>
            {favoriteTasks.length === 0 ? (
                <div className="glass p-8 rounded-2xl text-center">
                    <p className="text-white/70">Nenhuma tarefa favorita ainda. Marque uma tarefa com estrela para destacá-la aqui.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">

                    {tasks
                        .filter((task) => task.favorite)
                        .map((task) => (
                            <div key={task.id} className={`p-4 rounded-xl shadow-md ${task.color} relative`}>
                                {/* Header */}
                                <div className="flex justify-between items-center border-b pb-2">
                                    <input
                                        type="text"
                                        className="w-full text-lg font-semibold focus:outline-none bg-transparent"
                                        value={task.title}
                                        readOnly
                                    />
                                    <button onClick={() => toggleFavorite(task.id as number)}>
                                        <Star size={20} className="text-yellow-500 fill-yellow-500 transition-colors" />
                                    </button>
                                </div>

                                {/* Description */}
                                <p className="mt-2 text-gray-600 text-sm min-h-[120px]">{task.description}</p>

                                {/* Actions */}
                                <div className="flex justify-between items-center mt-3">
                                    <div className="flex gap-2">
                                        <button className="text-gray-500 hover:text-gray-700">
                                            <Pencil size={16} />
                                        </button>
                                        <button onClick={() => setShowColorPicker(task)} className="text-gray-500 hover:text-blue-500 relative">
                                            <PaintBucket size={16} />
                                        </button>
                                    </div>
                                    <button className="text-gray-500 hover:text-red-500">
                                        <Trash size={16} />
                                    </button>
                                </div>
                                {/* Seletor de Cores */}
                                {showColorPicker === task && (
                                    <div className="absolute z-10 bottom-12 left-2 bg-white shadow-lg rounded-lg p-2 flex gap-2">
                                        {colors.map((color) => (
                                            <button key={color} className={`w-6 h-6 rounded-full ${color}`} onClick={() => changeColor(task.id as number, color)} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                </div>
            )}

            {/* Outras tarefas */}
            <div className="flex items-center gap-2 mb-4">
                <NotebookPen size={22} className="text-green-400 mt-4" />
                <h2 className="text-lg font-semibold text-white mt-4">Outras tarefas</h2>
                <span className="bg-white/40 text-white text-xs rounded-full mt-4 px-2 py-0.5 ml-1">
                    {otherTasks.length}
                </span>
            </div>
            {otherTasks.length === 0 ? (
                <div className="glass p-8 rounded-2xl text-center">
                    <p className="text-white/70">Nenhuma tarefa ainda. Crie uma nova tarefa para começar.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                    {tasks
                        .filter((task) => !task.favorite)
                        .map((task) => (
                            <div key={task.id} className={`p-4 rounded-xl shadow-md ${task.color} relative`}>
                                {/* Header */}
                                <div className="flex justify-between items-center border-b pb-2">
                                    <input
                                        type="text"
                                        className="w-full text-lg font-semibold focus:outline-none bg-transparent"
                                        value={task.title}
                                        readOnly
                                    />
                                    <button onClick={() => toggleFavorite(task.id as number)}>
                                        <Star size={20} className="text-gray-400 hover:text-yellow-500 transition-colors" />
                                    </button>
                                </div>

                                {/* Description */}
                                <p className="mt-2 text-gray-600 text-sm min-h-[120px]">{task.description}</p>

                                {/* Actions */}
                                <div className="flex justify-between items-center mt-3">
                                    <div className="flex gap-2">
                                        <button className="text-gray-500 hover:text-gray-700">
                                            <Pencil size={16} />
                                        </button>
                                        <button onClick={() => setShowColorPicker(task)} className="text-gray-500 hover:text-blue-500 relative">
                                            <PaintBucket size={16} />
                                        </button>
                                    </div>
                                    <button className="text-gray-500 hover:text-red-500">
                                        <Trash size={16} />
                                    </button>
                                </div>
                                {/* Seletor de Cores */}
                                {showColorPicker === task && (
                                    <div className="absolute z-10 bottom-12 left-2 bg-white shadow-lg rounded-lg p-2 flex gap-2">
                                        {colors.map((color) => (
                                            <button key={color} className={`w-6 h-6 rounded-full ${color}`} onClick={() => changeColor(task.id as number, color)} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default TaskIndex;
