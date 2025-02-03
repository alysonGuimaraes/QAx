describe('PUT /tasks/:id/done', () => {

    beforeEach(function () {
        cy.fixture('tasks/put').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('finish task', function () {

        const { user, task } = this.tasks.update;

        cy.task('removeTask', task.name, user.email)

        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user)
            .then(userResp => {

                const token = userResp.body.token;

                cy.postTask(task, token)
                    .then(taskResp => {
                        const taskId = taskResp.body._id

                        cy.putTaskDone(taskId, token)
                            .then(response => {
                                expect(response.status).to.eq(204)
                            })

                        cy.getUniqueTask(taskId, token)
                            .then(response => {
                                expect(response.status).to.eq(200)
                                expect(response.body.is_done).to.be.true
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

                        cy.putTaskDone(taskId, token)
                            .then(response => {
                                expect(response.status).to.eq(404)
                            })

                    })

            })

    })

})