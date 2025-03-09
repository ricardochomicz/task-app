import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import TaskIndex from "../components/tasks/TaskIndex";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/app/tasks" element={<TaskIndex />} />

        </Routes>
    );
};

export default AppRoutes;