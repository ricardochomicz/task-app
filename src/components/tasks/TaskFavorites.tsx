import React from "react";
import { Star, Pencil, Trash, PaintBucket, Sparkles } from "lucide-react";
import { ITask } from "../../interfaces/TaskInterface";

interface TaskFavoritesProps {
    tasks: ITask[];
    editingTask: ITask | null;
    showColorPicker: ITask | null;
    setEditingTask: React.Dispatch<React.SetStateAction<ITask | null>>;
    setShowColorPicker: (task: ITask | null) => void;
    toggleFavorite: (id: number) => void;
    deleteTask: (id: number) => void;
    changeColor: (id: number, newColor: string) => void;
    colors: string[];
}

const TaskFavorites: React.FC<TaskFavoritesProps> = ({
    tasks,
    editingTask,
    showColorPicker,
    setEditingTask,
    setShowColorPicker,
    toggleFavorite,
    deleteTask,
    changeColor,
    colors,
}) => {

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Sparkles size={22} className="text-yellow-400 mt-4" />
                <h2 className="text-lg text-white font-semibold mt-4">Favoritas</h2>
                <span className="bg-white/40 text-white text-xs rounded-full mt-4 px-2 py-0.5 ml-1">
                    {tasks.length}
                </span>
            </div>
            {tasks.length === 0 ? (
                <div className="glass p-8 rounded-2xl text-center">
                    <p className="text-white/70">
                        Nenhuma tarefa favorita ainda. Marque uma tarefa com estrela para destacá-la aqui.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                    {tasks.map((task) => (
                        <div key={task.id} className={`p-4 rounded-xl shadow-md ${task.color} relative`}>
                            <small>{task.updated_at}</small>
                            <div className="flex justify-between items-center pb-2">
                                {editingTask?.id === task.id ? (
                                    <input
                                        type="text"
                                        className="w-full text-lg font-semibold focus:outline-none bg-transparent rounded px-2"
                                        value={editingTask?.title}
                                        onChange={(e) =>
                                            setEditingTask((prev) =>
                                                prev ? { ...prev, title: e.target.value } : null
                                            )
                                        }
                                        autoFocus
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="w-full text-lg font-semibold focus:outline-none bg-transparent"
                                        value={task.title}
                                        readOnly
                                    />
                                )}
                                <button onClick={() => toggleFavorite(task.id as number)}>
                                    <Star size={20} className="text-yellow-500 fill-yellow-500 transition-colors" />
                                </button>
                            </div>

                            {/* Descrição */}
                            {editingTask?.id === task.id ? (
                                <textarea
                                    className="w-full text-sm bg-transparent rounded px-2 min-h-[120px]"
                                    value={editingTask?.description || ""}
                                    onChange={(e) =>
                                        setEditingTask((prev) =>
                                            prev ? { ...prev, description: e.target.value } : null
                                        )
                                    }
                                    rows={2}
                                />
                            ) : (
                                <p className="mt-2 text-gray-600 text-sm min-h-[120px]">{task.description}</p>
                            )}

                            {/* Ações */}
                            <div className="flex justify-between items-center mt-3">
                                <div className="flex gap-2">
                                    <button onClick={() => setEditingTask(task)} className="text-gray-500 hover:text-gray-700">
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => setShowColorPicker(task)}
                                        className="text-gray-500 hover:text-blue-500 relative"
                                    >
                                        <PaintBucket size={16} />
                                    </button>
                                </div>
                                <button onClick={() => deleteTask(task.id as number)} className="text-gray-500 hover:text-red-500">
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

export default TaskFavorites;
