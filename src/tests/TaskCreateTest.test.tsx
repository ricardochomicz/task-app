
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskCreate from '../components/tasks/TaskCreate';
import TaskService from '../services/TaskService';
import { ToastService } from '../commons/ToastMessages';
import '@testing-library/jest-dom';
import 'react-toastify/dist/ReactToastify.css';
import userEvent from "@testing-library/user-event";


// Mock do TaskService e ToastService
jest.mock("../services/TaskService", () => ({
    create: jest.fn(),
}));

jest.mock("../commons/ToastMessages", () => ({
    ToastService: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));
jest.mock('react-toastify/dist/ReactToastify.css', () => { });

const mockOnTaskCreated = jest.fn();

describe("TaskCreate Component", () => {
    it("deve renderizar o formulário corretamente", () => {
        render(<TaskCreate onTaskCreated={jest.fn()} />);

        expect(screen.getByPlaceholderText("Título")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Descrição da nota...")).toBeInTheDocument();
        expect(screen.getByText("Criar")).toBeInTheDocument();
    });

    it("deve permitir que o usuário insira título e descrição", async () => {
        render(<TaskCreate onTaskCreated={jest.fn()} />);

        const titleInput = screen.getByPlaceholderText("Título");
        const descriptionInput = screen.getByPlaceholderText("Descrição da nota...");

        await userEvent.type(titleInput, "Nova tarefa");
        await userEvent.type(descriptionInput, "Descrição da nova tarefa");

        expect(titleInput).toHaveValue("Nova tarefa");
        expect(descriptionInput).toHaveValue("Descrição da nova tarefa");
    });

    it("deve chamar TaskService.create no envio do formulário", async () => {
        (TaskService.create as jest.Mock).mockResolvedValue({});
        const onTaskCreatedMock = jest.fn();

        render(<TaskCreate onTaskCreated={onTaskCreatedMock} />);

        const titleInput = screen.getByPlaceholderText("Título");
        const descriptionInput = screen.getByPlaceholderText("Descrição da nota...");
        const submitButton = screen.getByText("Criar");

        await userEvent.type(titleInput, "Teste");
        await userEvent.type(descriptionInput, "Teste descrição");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(TaskService.create).toHaveBeenCalledWith({ title: "Teste", description: "Teste descrição", favorite: false });
            expect(onTaskCreatedMock).toHaveBeenCalled();
        });
    });

    it("deve alternar o estado favorito", async () => {
        render(<TaskCreate onTaskCreated={jest.fn()} />);

        const favoriteButton = screen.getByTestId("favorite");
        fireEvent.click(favoriteButton);

        await waitFor(() => {
            expect(favoriteButton.querySelector("svg")).toHaveClass("text-yellow-500");
        });
    });
});
