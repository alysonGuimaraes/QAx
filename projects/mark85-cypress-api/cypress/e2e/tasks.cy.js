describe('POST /tasks', () => {

    beforeEach(function ()  {

        cy.fixture('tasks').then(function (caseTasks) {
            this.caseTasks  = caseTasks
        })

    })

    it('register a new task', function()  {

        const { user, task } = this.caseTasks.create

        cy.task('deleteUser', user.email)
        cy.postUser(user)

        cy.postSession(user).then(res => {
            const token = res.body.token

            cy.task('deleteTask', task.name, user.email)

            cy.postTask(task, token).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.tags).to.eql(task.tags)
                expect(response.body.is_done).to.be.false
                expect(response.body.user).to.eq(res.body.user._id)
                expect(response.body._id.length).to.eq(24)
            })
        })

    })
})