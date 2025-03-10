import api from "../Api";
import { ToastService } from "../commons/ToastMessages";
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
            throw { error: "Erro ao exibir tarefas" };
            return [];
        }
    },

    async isFavorite(id: number, isFavorite: boolean) {
        try {
            const res = await api.put(`/tasks/${id}/favorite`, { favorite: isFavorite });
            ToastService.success(isFavorite ? "Tarefa marcada como favorita!" : "Tarefa desmarcada como favorita!");
            return res.data;
        } catch (error) {
            ToastService.error("Erro ao favoritar/desfavoritar.");
        }
    },

    async updateColor(id: number, newColor: string) {
        try {
            const res = await api.put(`/tasks/${id}/color`, { color: newColor });
            return res.data;
        } catch (error) {
            ToastService.error("Erro ao atualizar a cor.");
        }
    },

    async destroy(id: number) {
        try {
            await api.delete(`/tasks/${id}`);
            ToastService.success("Tarefa excluída com sucesso!");
        } catch (error) {
            ToastService.error("Erro ao excluir tarefa.");
        }
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