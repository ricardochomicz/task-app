import { useState } from "react";
import TaskForm from "./_partials/TaskForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITask } from "../../interfaces/TaskInterface";
import TaskService from "../../services/TaskService";
import { ToastService } from "../../commons/ToastMessages";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskValidation } from "../../validations/TaskValidation";

interface TaskCreateProps {
    onTaskCreated: () => void;
}

function TaskCreate({ onTaskCreated }: TaskCreateProps) {
    const [favorite, setIsFavorite] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ITask>({ resolver: zodResolver(taskValidation) });

    const onSubmit: SubmitHandler<ITask> = async (data) => {
        console.log(data)
        try {
            const response = await TaskService.create({ ...data, favorite });
            onTaskCreated();
            reset();
            ToastService.success("Tarefa criada com sucesso!");
        } catch (error) {

        }
    }

    return (
        <div>
            {/* Formulario */}
            <TaskForm
                favorite={favorite}
                setFavorite={setIsFavorite}
                register={register}
                handleSubmit={handleSubmit(onSubmit)}
                errors={errors}
            />
        </div>
    )
}

export default TaskCreate;