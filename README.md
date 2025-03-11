# Task App

## Descrição

O Task App é uma aplicação web para gerenciamento de tarefas, onde os usuários podem criar, editar, excluir e marcar tarefas como favoritas. A aplicação também permite a busca e filtragem de tarefas por cor.

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/ricardochomicz/task-app.git
    cd task-app
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Roda a aplicação em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-la no navegador.

### `npx jest`

Inicia o executor de testes no modo interativo.\
Veja a seção sobre [testes em execução](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

## Configuração do Docker

Para construir e rodar a aplicação usando Docker, você pode usar o `Dockerfile` fornecido:

1. Construa a imagem Docker:
    ```sh
    docker build -t task-app .
    ```

2. Rode o contêiner Docker:
    ```sh
    docker run -p 80:80 task-app
    ```

## Configuração de CI/CD

O projeto está configurado para usar GitHub Actions para CI/CD. O arquivo de configuração está localizado em `.github/workflows/ci-cd.yml`.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

## Estrutura de Diretórios

- **src/**: Contém o código-fonte da aplicação.
  - **components/**: Componentes React.
  - **context/**: Contextos React para gerenciamento de estado.
  - **helpers/**: Funções auxiliares.
  - **interfaces/**: Definições de interfaces TypeScript.
  - **routes/**: Configuração de rotas da aplicação.
  - **tests/**: Testes unitários e de integração.
  - **validations/**: Validações de formulários usando Zod.
- **public/**: Arquivos públicos estáticos.

## Vídeo Demonstrativo
[Assistir](https://youtu.be/4P6oRjyOpao)


## Testes

Os testes são escritos usando `@testing-library/react` e `jest`. Os arquivos de teste estão localizados no diretório `src/tests/`.

Exemplo de teste para o componente `TaskCreate`:

```tsx
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
            expect(ToastService.success).toHaveBeenCalledWith("Tarefa criada com sucesso!");
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
