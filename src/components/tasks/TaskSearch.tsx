import React from "react";

interface TaskSearchProps {
    search: string;
    setSearch: (value: string) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ search, setSearch }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="mt-5 w-full max-w-md">
                <input
                    type="search"
                    placeholder="Buscar tarefas..."
                    value={search}
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-lg shadow-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />

            </div>
        </div>
    );
};

export default TaskSearch;
