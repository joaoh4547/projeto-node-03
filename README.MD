# App

## Gympass style app

### RF (Requisitos Funcionais)

 - [ ] Deve ser possível se cadastrar;
 - [ ] Deve ser possível se autenticar;
 - [ ] Deve ser possível obter o perfil de um usuário autenticado;
 - [ ] deve ser possível obter o numero de check-ins realizados pelo usuário autenticado;
 - [ ] deve ser possível o usuário obter seu histórico de check-ins;
 - [ ] deve ser possível  o usuário buscar academias próximas;
 - [ ] deve ser possível o usuário buscar academias pelo nome;
 - [ ] deve ser possível o usuário realizar o check-in em uma academia;
 - [ ] deve ser possível validar o check-in de um usuário;
 - [ ] deve ser possível cadastrar uma academia;

### RN (Requisitos de Negocio)

- [ ] O usuário não deve poder se cadastrar com um email duplicado
- [ ] o usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] o usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] o check-ins não pode ser validado até 20 minutos após criado;
- [ ] o check-ins só pode ser validado por administradores;
- [ ] a academia só pode ser cadastrada por administradores;

### RNF (Requisitos não-funcionais)

- [ ]  a senha do usuário precisa ser criptografada;
- [ ] os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] todas listas de dados precisam estar paginadas com 20  itens por pagina;
- [ ] o usuário deve ser identificado por um JWT (JSON Web Token);