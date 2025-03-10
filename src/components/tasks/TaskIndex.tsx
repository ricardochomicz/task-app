import React, { useEffect, useState } from "react";
import { Star, Pencil, Trash, PaintBucket, Sparkles, NotebookPen } from "lucide-react";
import TaskCreate from "./TaskCreate";
import TaskService from "../../services/TaskService";
import { ITask } from "../../interfaces/TaskInterface";
import TaskFavorites from "./TaskFavorites";
import TaskOthers from "./TaskOthers";
import TaskSearch from "./TaskSearch";

const TaskIndex = () => {
    const colors = TaskService.getColors();
    const [showColorPicker, setShowColorPicker] = useState<ITask | null>(null);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [editingTask, setEditingTask] = useState<ITask | null>(null);
    const [search, setSearch] = useState("");

    const favoriteTasks = tasks.filter((task) => task.favorite);
    const otherTasks = tasks.filter((task) => !task.favorite);

    const filteredFavoriteTasks = favoriteTasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    const filteredOtherTasks = otherTasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    const startEditing = (task: ITask) => {
        setEditingTask({
            ...task,
            description: task.description || "" // Evita erro de undefined
        });
    };


    const fetchTasks = async (search = "") => {
        try {
            const response = await TaskService.index(search);
            setTasks(response);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    useEffect(() => {
        fetchTasks(search);
    }, [search]);

    const saveEdit = async () => {
        if (!editingTask) return;

        await TaskService.update(editingTask.id as number, {
            title: editingTask.title,
            description: editingTask.description || "",
        });

        setEditingTask(null);
        fetchTasks();
    };



    // Função para alternar cor de fundo
    const changeColor = async (id: number, newColor: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, color: newColor } : task
            )
        );
        setShowColorPicker(null);
        await TaskService.updateColor(id, newColor);
    };

    // Função para favoritar/desfavoritar
    const toggleFavorite = async (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, favorite: !task.favorite } : task
            )
        );
        const task = tasks.find((t) => t.id === id);
        if (task) {
            await TaskService.isFavorite(id, !task.favorite);
        }
    };

    const deleteTask = async (id: number) => {
        await TaskService.destroy(id);
        fetchTasks();
    };

    return (
        <div>

            <div className="p-4">
                <TaskCreate onTaskCreated={fetchTasks} />

                <TaskSearch search={search} setSearch={setSearch} />

                <TaskFavorites
                    tasks={favoriteTasks}
                    editingTask={editingTask}
                    setEditingTask={setEditingTask}
                    showColorPicker={showColorPicker}
                    setShowColorPicker={setShowColorPicker}
                    toggleFavorite={toggleFavorite}
                    deleteTask={deleteTask}
                    changeColor={changeColor}
                    colors={colors}
                />

                <TaskOthers
                    tasks={otherTasks}
                    editingTask={editingTask}
                    setEditingTask={setEditingTask}
                    showColorPicker={showColorPicker}
                    setShowColorPicker={setShowColorPicker}
                    toggleFavorite={toggleFavorite}
                    deleteTask={deleteTask}
                    changeColor={changeColor}
                    colors={colors}
                />


            </div>
            {editingTask && (
                <button
                    onClick={saveEdit}
                    className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all"
                >
                    Salvar
                </button>
            )}
        </div>
    );
};

export default TaskIndex;
