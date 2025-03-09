import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerValidation } from '../../validations/auth/RegisterValidation';
import { AuthService } from '../../services/auth/AuthService';

interface IRegisterForm {
    name: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {

    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<IRegisterForm>({ resolver: zodResolver(registerValidation) });

    const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
        setLoading(true);
        try {
            const res = await AuthService.register({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (res) {
                console.log("Login", res)

            } else {

            }

            navigate('/app/tasks');
        } catch (error: any) {

            console.log(error)
            // ToastService.error(error.response?.data.error || '1Credenciais inválidas.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='relative w-full h-screen'>
                <img src="notas.png" alt="" className="absolute inset-0 w-full h-full object-cover " />
                <section className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center 
                            justify-center px-6 py-4 mx-auto 
                            md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Faça seu login
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu e-mail</label>
                                        <input
                                            type="email"
                                            {...register('email')}
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="seuemail@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sua senha</label>
                                        <input
                                            type="password"
                                            {...register('password')}
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        disabled={isSubmitting}
                                    >
                                        Entrar
                                    </button>

                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Já tenho conta <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Crie sua conta aqui</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Register