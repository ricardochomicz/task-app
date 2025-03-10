import api from "../Api";

interface IUserData {
    name: string,
    email: string
}

const UserService = {
    update(data: IUserData, user: number) {
        const token = localStorage.getItem('token');
        return api.put(`/users/${user}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
}

export default UserService