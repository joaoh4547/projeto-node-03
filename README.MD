# App

## Gympass style app

### RF (Requisitos Funcionais)

 - [x] Deve ser possível se cadastrar;
 - [x] Deve ser possível se autenticar;
 - [x] Deve ser possível obter o perfil de um usuário autenticado;
 - [x] deve ser possível obter o numero de check-ins realizados pelo usuário autenticado;
 - [x] deve ser possível o usuário obter seu histórico de check-ins;
 - [x] deve ser possível  o usuário buscar academias próximas;
 - [x] deve ser possível o usuário buscar academias pelo nome;
 - [x] deve ser possível o usuário realizar o check-in em uma academia;
 - [x] deve ser possível validar o check-in de um usuário;
 - [x] deve ser possível cadastrar uma academia;

### RN (Requisitos de Negocio)

- [x] O usuário não deve poder se cadastrar com um email duplicado
- [x] o usuário não pode fazer 2 check-ins no mesmo dia;
- [x] o usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] o check-ins não pode ser validado até 20 minutos após criado;
- [x] o check-ins só pode ser validado por administradores;
- [x] a academia só pode ser cadastrada por administradores;

### RNF (Requisitos não-funcionais)

- [x]  a senha do usuário precisa ser criptografada;
- [x] os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] todas listas de dados precisam estar paginadas com 20  itens por pagina;
- [x] o usuário deve ser identificado por um JWT (JSON Web Token);