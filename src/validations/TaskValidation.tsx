import * as z from 'zod';

export const taskValidation = z.object({
    title: z.string()
        .min(3, { message: 'Informe o título da tarefa' })
        .max(30, { message: 'O título deve ter no máximo 30 caracteres' }),

    description: z.string().min(3, { message: 'Informe a descrição para continuar' })
});