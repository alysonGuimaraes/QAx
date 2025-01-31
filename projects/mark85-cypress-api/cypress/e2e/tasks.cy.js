describe('POST /tasks', () => {

    let task, user, token;

    beforeEach(() => {

        cy.fixture('tasks').then(caseTasks => {
            task  = caseTasks.create.task
            user = caseTasks.create.user

            cy.task('deleteTask', task.name, user.email)

            cy.postSession(user).then(res => {
                token = res.body.token
            })
        })
    })

    it('register a new task', () => {

        cy.task('deleteUser', user.email)

        cy.postUser(user)

        cy.postTask(task, token).then(response => {
            expect(response.status).to.eq(200)
        })

    })
})