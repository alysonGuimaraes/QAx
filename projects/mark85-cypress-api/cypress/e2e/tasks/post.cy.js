describe('POST /tasks', () => {

    beforeEach(function ()  {

        cy.fixture('tasks/post').then(function (caseTasks) {
            this.caseTasks  = caseTasks
        })

    })

    it('register a new task', function()  {

        const { user, task } = this.caseTasks.create

        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user).then(res => {
            const token = res.body.token

            cy.task('removeTask', task.name, user.email)

            cy.postTask(task, token).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.tags).to.eql(task.tags)
                expect(response.body.is_done).to.be.false
                expect(response.body.user).to.eq(res.body.user._id)
                expect(response.body._id.length).to.eq(24)
            })
        })

    })

    it('duplicate task', function()  {

        const { user, task } = this.caseTasks.dup

        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user).then(res => {
            const token = res.body.token

            cy.task('removeTask', task.name, user.email)

            cy.postTask(task, token)

            cy.postTask(task, token).then(response => {
                expect(response.status).to.eq(409)
                expect(response.body.message).to.eq("Duplicated task!")
            })
        })

    })
})