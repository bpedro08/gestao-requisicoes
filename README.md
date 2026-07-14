# ReqManager - Sistema de Gestão de Requisições Internas

Aplicação web para gestão de requisições internas de recursos organizacionais.
Os colaboradores podem solicitar a utilização de espaços, equipamentos e viaturas.
Os administradores gerem o catálogo de recursos e aprovam ou rejeitam os pedidos.

---

## Stack Tecnológica

- **Frontend:** Angular 19 (Standalone Components)
- **Backend:** Laravel 11 (REST API)
- **Base de dados:** MySQL 8
- **Autenticação:** Laravel Sanctum (Bearer Token)
- **Infraestrutura:** Docker + Docker Compose

---

## Funcionalidades

**Colaborador**
- Login e logout
- Consultar recursos disponíveis
- Criar requisições com seleção de data e hora
- Consultar as suas requisições e respetivo estado
- Cancelar requisições pendentes ou aprovadas

**Administrador**
- Gestão completa de recursos (criar, editar, ativar/desativar, eliminar)
- Consultar todas as requisições de todos os utilizadores
- Aprovar ou rejeitar requisições pendentes com observações
- Marcar requisições aprovadas como concluídas
- Cancelar requisições aprovadas

---

## Pré-requisitos

- Docker 24.0+
- Docker Compose 2.0+
- Git

---

## Instalação

**1. Clonar o repositório**
```bash
git clone https://github.com/bpedro08/gestao-requisicoes
cd gestao-requisicoes
```

**2. Configurar as variáveis de ambiente**
```bash
cp backend/.env.example backend/.env
```

**3. Iniciar os containers**
```bash
docker compose up -d --build
```

**4. Executar as migrations e o seeder**
```bash
docker exec -it requisicoes_backend php artisan migrate:fresh --seed
```

**5. Gerar a chave da aplicação**
```bash
docker exec -it requisicoes_backend php artisan key:generate
```

**6. Abrir a aplicação**

http://localhost:4200

---

## Credenciais de Teste

| Perfil | Email | Password |
|---|---|---|
| Administrador | admin@company.com | password |
| Colaborador | jon@winterfell.com | thewall |
| Colaborador | walt@bluecrystal.com | heisenberg |

---

## Endpoints da API

| Método | Endpoint | Autenticação | Descrição |
|---|---|---|---|
| POST | /api/login | Pública | Login |
| POST | /api/logout | Requerida | Logout |
| GET | /api/me | Requerida | Utilizador atual |
| GET | /api/resources | Requerida | Listar recursos ativos |
| GET | /api/resources/all | Admin | Listar todos os recursos |
| POST | /api/resources | Admin | Criar recurso |
| PUT | /api/resources/{id} | Admin | Editar recurso |
| DELETE | /api/resources/{id} | Admin | Eliminar recurso |
| GET | /api/requests | Requerida | Listar requisições |
| POST | /api/requests | Requerida | Criar requisição |
| PATCH | /api/requests/{id}/cancel | Requerida | Cancelar requisição |
| PATCH | /api/requests/{id}/approve | Admin | Aprovar requisição |
| PATCH | /api/requests/{id}/reject | Admin | Rejeitar requisição |
| PATCH | /api/requests/{id}/complete | Admin | Concluir requisição |

---

## Comandos Úteis

### Docker

| Comando | Descrição |
|---|---|
| `docker compose up -d` | Inicia todos os containers em background |
| `docker compose down` | Para e remove os containers (dados preservados) |
| `docker compose ps` | Lista o estado de todos os containers |
| `docker compose logs -f backend` | Acompanha os logs do backend em tempo real |

### Backend (Laravel)

| Comando | Descrição |
|---|---|
| `docker compose exec backend bash` | Acede ao terminal do container do backend |
| `docker compose exec backend php artisan migrate` | Aplica novas migrations |
| `docker compose exec backend php artisan migrate:fresh --seed` | Reset completo da base de dados com dados de teste |
| `docker compose exec backend php artisan make:model ModelName -mcr` | Cria model, migration, controller e resource |
| `docker compose exec backend php artisan route:list` | Lista todas as rotas registadas |
| `docker compose exec backend php artisan optimize:clear` | Limpa todas as caches (config, rotas, views) |
| `docker compose exec backend php artisan tinker` | Abre o REPL interativo do Laravel |

### Base de Dados

| Comando | Descrição |
|---|---|
| `docker compose exec mysql mysql -u root -p` | Acede diretamente ao MySQL |

### Frontend (Angular)

| Comando | Descrição |
|---|---|
| `docker compose exec frontend bash` | Acede ao terminal do container do frontend |