import { useState } from "react";
import { Star } from "lucide-react";
import TaskForm from "./_partials/TaskForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITask } from "../../interfaces/TaskInterface";
import TaskService from "../../services/TaskService";

function TaskCreate() {
    const [isFavorite, setIsFavorite] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ITask>({});

    const onSubmit: SubmitHandler<ITask> = async (data) => {
        console.log(data)
        try {
            const response = await TaskService.create(data);
        } catch (error) {

        }
    }

    return (
        <div>
            {/* Formulario */}
            <TaskForm
                favorite={isFavorite}
                register={register}
                handleSubmit={handleSubmit(onSubmit)}
                errors={errors}
            />

        </div>
    )
}

export default TaskCreate;