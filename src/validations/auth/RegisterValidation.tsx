import * as z from 'zod';

export const registerValidation = z.object({

    name: z.string({ message: 'Informe o nome para continuar' })
        .min(6, 'O campo nome deve ter pelo menos 6 caracteres'),

    email: z.string({ message: 'Informe seu e-mail para continuar' })
        .email('Digite um e-mail válido'),

    password: z.string({ message: 'Informe sua senha para continuar' })
        .min(6, 'A senha deve ter pelo menos 6 caracteres'),

});