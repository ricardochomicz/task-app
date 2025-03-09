import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginValidation } from '../../validations/auth/LoginValidation';
import { AuthService } from '../../services/auth/AuthService';
import { ToastService } from '../../commons/ToastMessages';

interface ILoginForm {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ILoginForm>({ resolver: zodResolver(loginValidation) });

    const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
        setLoading(true);
        try {
            const res = await AuthService.login({
                email: data.email,
                password: data.password,
            });
            navigate('/app/tasks');
        } catch (error: any) {
            console.log(error.error)
            ToastService.error(error.error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative w-full h-screen">
            <img src="notas.png" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
            <section className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
                    <h1 className="text-2xl font-bold text-gray-900 text-center">
                        Faça seu cadastro
                    </h1>

                    <form className="space-y-5 mt-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Seu E-mail</label>
                            <input
                                type="email"
                                id="email"
                                {...register('email')}
                                placeholder="seuemail@example.com"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Senha */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Sua Senha</label>
                            <input
                                type="password"
                                id="password"
                                {...register('password')}
                                placeholder="••••••••"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        {/* Botão de cadastro */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300"
                            disabled={isSubmitting}
                        >
                            Criar conta
                        </button>

                        {/* Link para register */}
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Não tem uma conta ainda? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Crie sua conta aqui</Link>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login