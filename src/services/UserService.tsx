import api from "../Api";
import { ToastService } from "../commons/ToastMessages";

interface IUserData {
    name: string,
    email: string
}

const UserService = {

    async update(data: IUserData, user: number) {
        try {
            let res = await api.put(`/users/${user}`, data);
            ToastService.success(res.data.message);
        } catch (error: any) {
            ToastService.error(error.response.data.error);
        }
    },
}

export default UserService