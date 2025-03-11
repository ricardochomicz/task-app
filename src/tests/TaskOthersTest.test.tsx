import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskOthers from '../components/tasks/TaskOthers';
import '@testing-library/jest-dom';
import { ITask } from '../interfaces/TaskInterface';


const mockTasks: ITask[] = [
    { id: 1, title: 'Tarefa 1', description: 'Descrição 1', favorite: false, color: 'bg-blue-200' },
    { id: 2, title: 'Tarefa 2', description: 'Descrição 2', favorite: false, color: 'bg-red-200' },
];

describe('TaskOthers Component', () => {
    beforeEach(() => {
        render(
            <TaskOthers
                tasks={mockTasks}
                editingTask={null}
                showColorPicker={null}
                setEditingTask={jest.fn()}
                setShowColorPicker={jest.fn()}
                toggleFavorite={jest.fn()}
                deleteTask={jest.fn()}
                changeColor={jest.fn()}
                colors={['bg-blue-200', 'bg-red-200']}
            />
        );
    });

    test('renderiza corretamente o título outras tarefas', () => {
        expect(screen.getByText('Outras tarefas')).toBeInTheDocument();
    });

    test('exibe mensagem quando não há outras tarefas', () => {
        render(
            <TaskOthers
                tasks={[]} // Testando lista vazia
                editingTask={null}
                showColorPicker={null}
                setEditingTask={jest.fn()}
                setShowColorPicker={jest.fn()}
                toggleFavorite={jest.fn()}
                deleteTask={jest.fn()}
                changeColor={jest.fn()}
                colors={['bg-blue-200', 'bg-red-200']}
            />
        );

        expect(screen.getByText('Nenhuma tarefa aqui.'))
            .toBeInTheDocument();
    });
});
