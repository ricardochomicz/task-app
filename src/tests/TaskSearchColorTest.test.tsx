import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskSearchColor from '../components/tasks/TaskSearchColor';

describe('TaskSearchColor', () => {
    const mockOnSelectColor = jest.fn();
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500'];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renderiza o component TaskSearchColor', () => {
        render(<TaskSearchColor colors={colors} selectedColor={null} onSelectColor={mockOnSelectColor} />);
        colors.forEach(color => {
            expect(screen.getByTestId(color)).toBeInTheDocument();
        });
    });

    test('chama onSelectColor com a cor correta quando um botão de cor é clicado', () => {
        render(<TaskSearchColor colors={colors} selectedColor={null} onSelectColor={mockOnSelectColor} />);
        const colorButton = screen.getByTestId('bg-red-500');

        fireEvent.click(colorButton);

        expect(mockOnSelectColor).toHaveBeenCalledWith('bg-red-500');
    });

    test('chama onSelectColor com nulo quando o botão de cor selecionado é clicado novamente', () => {
        render(<TaskSearchColor colors={colors} selectedColor="bg-red-500" onSelectColor={mockOnSelectColor} />);
        const colorButton = screen.getByTestId('bg-red-500');

        fireEvent.click(colorButton);

        expect(mockOnSelectColor).toHaveBeenCalledWith(null);
    });

    test('renderiza o botão de filtro claro quando uma cor é selecionada', () => {
        render(<TaskSearchColor colors={colors} selectedColor="bg-red-500" onSelectColor={mockOnSelectColor} />);
        expect(screen.getByText('Limpar Filtro')).toBeInTheDocument();
    });

    test('chama onSelectColor com nulo quando o botão limpar filtro é clicado', () => {
        render(<TaskSearchColor colors={colors} selectedColor="bg-red-500" onSelectColor={mockOnSelectColor} />);
        const clearFilterButton = screen.getByText('Limpar Filtro');

        fireEvent.click(clearFilterButton);

        expect(mockOnSelectColor).toHaveBeenCalledWith(null);
    });
});