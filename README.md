# API Escola - node.js + Express
API REST aimples para gerenciar alunos e professores
 
## Pré-requisitos
- Node.js Instalado
 
## Como rodar
 
### Instalar dependências
```bash
npm
```
 
### Iniciar o servidor
```bash
node index.js
```
 
### Acessar 
Abra o navegador em: `https://localhost:3000`
 
 
## Endpoints
 
### Alunos
 
| Métodos | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/alunos` | Lista todos os alunos |
| GET | `/alunos/:id` | Buscar um aluno específico |
| POST | `/alunos` | Cria um novo aluno |
| PUT | `/alunos/id:` | Atualiza um aluno |
| DELETE | `/alunos/id:` | Remove um aluno |
 
### Professores
 
| Métodos | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/professores` | Lista todos os professores |
| POST | `/professores` | Cria um novo professor |
| PUT | `/professores/id:` | Atualiza um professor |
| DELETE | `/professores/id:` | Remove um professores |
 
## Tecnologias
- Node.js
- Express
 
## Notas
- Os dados são armazenados em memória (reiniciar o servidor apaga tudo)
