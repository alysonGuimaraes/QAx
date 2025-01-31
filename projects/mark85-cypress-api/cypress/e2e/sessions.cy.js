describe('POST/ sessions', () => {

    // Outra forma de usar o fixtures (Teoricamente funciona, aqui não deu)
    //before(function () {
        //cy.fixture('users').then(function (users) {
            // Perceba o uso de function ao invés da arrow function, isso permite o uso do this para amarrar
            // a variável dentro do describe e não mantela ao escopo somente da função, todavia os outros casos
            // de testes deverão ser funções tradicionais (usando function) ao invés de arrow function (=>)
            //this.users = users
        //})
    //})

    it('user session', () => {
        cy.fixture("users").then(users => {
            const userData = users.login

            cy.task('deleteUser', userData.email)
            cy.postUser(userData)

            cy.postSession(userData).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.user.name).to.eq(userData.name)
                expect(response.body.token).not.to.be.empty
            })
        })
    })

    it('invalid email', () => {
        cy.fixture("users").then(users => {
            const userData = users.inv_email

            cy.postSession(userData).then(response => {
                expect(response.status).to.eq(401)
            })
        })
    })

    it('invalid password', () => {
        cy.fixture("users").then(users => {
            const userData = users.inv_pass

            cy.postSession(userData).then(response => {
                expect(response.status).to.eq(401)
            })
        })
    })
})