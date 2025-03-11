import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from '../components/users/Profile';
import UserService from '../services/UserService';
import '@testing-library/jest-dom'; // Importa a extensão jest-dom
import { ToastService } from '../commons/ToastMessages';

// Mock do UserService e ToastService
jest.mock('../services/UserService', () => ({
    update: jest.fn(),
}));

jest.mock('../commons/ToastMessages', () => ({
    ToastService: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));
jest.mock('react-toastify/dist/ReactToastify.css', () => { });

const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
};

describe('Profile', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renderiza o component Profile', () => {
        render(<Profile user={mockUser} isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByText('Meu Perfil')).toBeInTheDocument();
        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
    });

    test('chama onClose quando o botão fechar é clicado', () => {
        render(<Profile user={mockUser} isOpen={true} onClose={mockOnClose} />);
        const closeButton = screen.getByTestId('close');

        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalled();
    });

    test('update user profile', async () => {
        (UserService.update as jest.Mock).mockResolvedValue({ data: { message: 'Perfil atualizado com sucesso!' } });

        render(<Profile user={mockUser} isOpen={true} onClose={mockOnClose} />);

        const nameInput = screen.getByLabelText(/Nome/i);
        const emailInput = screen.getByLabelText(/E-mail/i);
        const submitButton = screen.getByRole('button', { name: /Editar Perfil/i });

        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(UserService.update).toHaveBeenCalledWith({ name: 'Jane Doe', email: 'jane.doe@example.com' }, 1);
            expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
            expect(screen.getByDisplayValue('jane.doe@example.com')).toBeInTheDocument();
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    test('errors update', async () => {
        (UserService.update as jest.Mock).mockRejectedValue({ response: { data: { error: 'Erro ao atualizar perfil' } } });

        render(<Profile user={mockUser} isOpen={true} onClose={mockOnClose} />);

        const nameInput = screen.getByLabelText(/Nome/i);
        const emailInput = screen.getByLabelText(/E-mail/i);
        const submitButton = screen.getByRole('button', { name: /Editar Perfil/i });

        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(UserService.update).toHaveBeenCalledWith({ name: 'Jane Doe', email: 'jane.doe@example.com' }, 1);
        });

        await waitFor(() => {
            expect(ToastService.error).toHaveBeenCalledWith('Erro ao atualizar perfil');
        });
    });
});