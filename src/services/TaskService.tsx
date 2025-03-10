import api from "../Api";
import { ITask } from "../interfaces/TaskInterface";

const TaskService = {
    create(data: ITask) {
        return api.post<ITask>("/tasks", data);
    },
    async index(): Promise<ITask[]> {
        try {
            const response = await api.get("/tasks");
            return response.data.data;
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            return [];
        }
    },

    async isFavorite(favorite: boolean, id: number) {
        await api.put(`/tasks/${id}/favorite`, { favorite });
    },

    async updateColor(color: string, id: number) {
        await api.put(`/tasks/${id}/color`, { color });
    },

    async destroy(id: number) {
        await api.delete(`/tasks/${id}`);
    },

    getColors() {
        return [
            "bg-white",
            "bg-blue-200",
            "bg-yellow-200",
            "bg-green-200",
            "bg-red-200",
            "bg-purple-200",
            "bg-pink-200",
            "bg-indigo-200",
            "bg-teal-200",
            "bg-lime-200"
        ];
    }
}

export default TaskService