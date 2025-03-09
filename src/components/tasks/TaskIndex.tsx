import React, { useEffect, useState } from "react";
import { IUser } from "../../interfaces/UserInterface";
import { AuthService } from "../../services/auth/AuthService";

const TaskIndex = () => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        setUser(AuthService.getUserFromToken());
    }, []);
    return (
        <div>TaskIndex - {user ? (
            <h1>Bem-vindo, {user.name}!</h1>
        ) : (
            <p>Carregando usuário...</p>
        )}</div>
    );
}

export default TaskIndex;
