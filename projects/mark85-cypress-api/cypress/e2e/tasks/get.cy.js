describe('GET /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks 
        })
    })

    it('get tasks', function () {

        const { user, tasks } = this.tasks.list

        cy.task('deleteTasksLike', 'Estud4r')

        cy.task('deleteUser', user.email)
        cy.postUser(user)

        cy.postSession(user).then(userRes => {

            const token = userRes.body.token

            tasks.forEach(task => cy.postTask(task, token))


            cy.api({
                url: '/tasks',
                method: 'GET',
                headers: {
                    Authorization: token
                },
                failOnStatusCode: false
            }).then(res => {
                expect(res.status).to.eq(200)
            }).its('body')
                .should('be.an', 'array')
                .and('have.length', tasks.length)
        })
    })
})