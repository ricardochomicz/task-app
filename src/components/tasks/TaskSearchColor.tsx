import React from "react";

interface TaskSearchColorProps {
    colors: string[];
    selectedColor: string | null;
    onSelectColor: (color: string | null) => void;
}

const TaskSearchColor: React.FC<TaskSearchColorProps> = ({ colors, selectedColor, onSelectColor }) => {
    return (
        <div className="flex gap-2 justify-center items-center mt-5">
            {colors.map((color) => (
                <button
                    key={color}
                    onClick={() => onSelectColor(selectedColor === color ? null : color)}
                    className={`w-8 h-8 rounded-full border-2 ${color} ${selectedColor === color ? "border-blue-500 scale-110" : "border-transparent"
                        } transition-transform`}
                />
            ))}
            {selectedColor && (
                <button
                    onClick={() => onSelectColor(null)}
                    className="ml-2 px-3 py-1 text-sm bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition"
                >
                    Limpar Filtro
                </button>
            )}
        </div>
    );
};

export default TaskSearchColor;
