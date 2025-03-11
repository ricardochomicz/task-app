
import { render, screen, fireEvent } from '@testing-library/react';
import TaskSearch from '../components/tasks/TaskSearch';
import '@testing-library/jest-dom';


describe('TaskSearch', () => {
    const mockSetSearch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renderiza o componente TaskSearch', () => {
        render(<TaskSearch search="" setSearch={mockSetSearch} />);
        expect(screen.getByPlaceholderText('Buscar tarefas...')).toBeInTheDocument();
    });

    test('chama setSearch na alteração de entrada', () => {
        render(<TaskSearch search="" setSearch={mockSetSearch} />);
        const input = screen.getByPlaceholderText('Buscar tarefas...');

        fireEvent.change(input, { target: { value: 'Nova Tarefa' } });

        expect(mockSetSearch).toHaveBeenCalledWith('Nova Tarefa');
    });

    test('exibe o valor de pesquisa correto', () => {
        render(<TaskSearch search="Tarefa Existente" setSearch={mockSetSearch} />);
        const input = screen.getByPlaceholderText('Buscar tarefas...');

        expect(input).toHaveValue('Tarefa Existente');
    });
});