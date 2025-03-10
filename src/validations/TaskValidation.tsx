import * as z from 'zod';

export const taskValidation = z.object({
    title: z.string({ message: 'Informe o título da tarefa' }),

    description: z.string({ message: 'Informe a descrição para continuar' })
});