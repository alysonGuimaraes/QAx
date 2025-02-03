describe('DELETE /tasks/:id', () => {

    beforeEach(function () {
        cy.fixture('tasks/delete').then(function (tasks) {
            this.tasks = tasks 
        })
    })

    it('remove task', function () {

        const { user, task } = this.tasks.remove;

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

                    })

            })

    })

    it('not found', function () {

        const { user, task } = this.tasks.not_found;

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

                        cy.deleteUniqueTask(taskId, token)
                            .then(response => {
                                expect(response.status).to.eq(404)
                        })

                    })

            })

    })

})