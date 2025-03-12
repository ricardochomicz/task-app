import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerValidation } from '../../validations/auth/RegisterValidation';
import { AuthService } from '../../services/auth/AuthService';
import { useAuth } from '../../context/AuthContext';
import { ToastService } from '../../commons/ToastMessages';

interface IRegisterForm {
    name: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<IRegisterForm>({ resolver: zodResolver(registerValidation) });

    const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
        try {
            await AuthService.register({
                name: data.name,
                email: data.email,
                password: data.password,
            }, setIsAuthenticated);
            navigate('/app/tasks');
        } catch (error: any) {
            ToastService.error(error.error);
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
                        {/* Nome */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">Seu Nome</label>
                            <input
                                type="text"
                                id="name"
                                {...register('name')}
                                placeholder="Digite seu nome"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

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

                        {/* Link para login */}
                        <p className="text-center text-gray-600 text-sm">
                            Já tem conta? <Link to="/login" className="text-blue-500 hover:underline">Faça login</Link>
                        </p>
                    </form>
                </div>
            </section>
        </div>

    )
}

export default Register