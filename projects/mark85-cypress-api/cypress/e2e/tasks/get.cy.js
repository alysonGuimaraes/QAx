describe('GET /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks 
        })
    })

    it('get all user tasks', function () {

        const { user, tasks } = this.tasks.list

        cy.task('removeTasksLike', 'Estud4r')

        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user).then(userRes => {

            const token = userRes.body.token

            tasks.forEach(task => cy.postTask(task, token))


            cy.getTasks(token)
                .then(res => {
                    expect(res.status).to.eq(200)
            }).its('body')
                .should('be.an', 'array')
                .and('have.length', tasks.length)
        })
    })
})

describe('GET /tasks/:id', () => {

    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks 
        })
    })

    it('unique task', function () {

        const { user, task } = this.tasks.unique;

        cy.task('removeTask', task.name, user.email)

        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user)
            .then(userResp => {

                const token = userResp.body.token;

                cy.postTask(task, token)
                    .then(taskResp => {
                        const taskId = taskResp.body._id

                        cy.getUniqueTask(taskId, token)
                            .then(response => {
                                expect(response.status).to.eq(200)
                        })

                    })

            })

    })

    it('not found', function () {

        const { user, task } = this.tasks.unique;

        cy.task('removeTask', task.name, user.email)

        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user)
            .then(userResp => {

                const token = userResp.body.token;

                cy.postTask(task, token)
                    .then(taskResp => {
                        const taskId = taskResp.body._id

                        cy.deleteUniqueTask(taskId, token)
                            .then(response => {
                                expect(response.status).to.eq(204)
                        })

                        cy.getUniqueTask(taskId, token)
                            .then(response => {
                                expect(response.status).to.eq(404)
                        })

                    })

            })

    })

})