import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskFavorites from '../components/tasks/TaskFavorites';
import '@testing-library/jest-dom';
import { ITask } from '../interfaces/TaskInterface';


const mockTasks: ITask[] = [
    { id: 1, title: 'Tarefa 1', description: 'Descrição 1', favorite: true, color: 'bg-blue-200' },
    { id: 2, title: 'Tarefa 2', description: 'Descrição 2', favorite: true, color: 'bg-red-200' },
];

describe('TaskFavorites Component', () => {
    beforeEach(() => {
        render(
            <TaskFavorites
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

    test('renderiza corretamente o título Favoritas', () => {
        expect(screen.getByText('Favoritas')).toBeInTheDocument();
    });

    test('exibe mensagem quando não há tarefas favoritas', () => {
        render(
            <TaskFavorites
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

        expect(screen.getByText('Nenhuma tarefa favorita ainda. Marque uma tarefa com estrela para destacá-la aqui.'))
            .toBeInTheDocument();
    });
});
