# App

## Gympass style app

### RF (Requisitos Funcionais)

 - [ ] Deve ser possivel se cadastrar;
 - [ ] Deve ser possivel se autenticar;
 - [ ] Deve ser possivel obter o perfil de um usuario autenticado;
 - [ ] deve ser possivel obter o numero de check-ins realizados pelo usuario autenticado;
 - [ ] deve ser possivel o ususuario obter seu historico de check-ins;
 - [ ] deve ser possivel  o usuario buscar academias próximas;
 - [ ] deve ser possivel o usuario buscar academias pelo nomem;
 - [ ] deve ser possivel o usuario realizar o check-in em uma academia;
 - [ ] deve ser possivel validar o check-in de um usuario;
 - [ ] deve ser possivel cadastrar uma academia;

### RN (Requisitos de Negocio)

- [ ] O usuario não deve poder se cadastrar com um email duplicado
- [ ] o usuario não pode fazer 2 check-ins no mesmo dia;
- [ ] o usuario não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] o check-ins não pode ser validado até 20 minutos após criado;
- [ ] o check-ins só pode ser validado por administradores;
- [ ] a acadeia só pode ser cadastrada por administradores;

### RNF (Requisitos não-funcionais)

- [ ]  a senha do usuario precisa ser criptografada;
- [ ] os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] todas listas de dados precisam estar paginadas com 20  itens por pagina;
- [ ] o usuario deve ser identificado por um JWT (JSON Web Token);