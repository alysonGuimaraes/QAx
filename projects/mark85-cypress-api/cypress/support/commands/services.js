Cypress.Commands.add('postUser', (user) => {
    cy.api({
      url: `${Cypress.config('baseUrl')}/users`,
      method: 'POST',
      body: user,
      failOnStatusCode: false
    })
})

Cypress.Commands.add('postSession', (user) => {
  cy.api({
    url: '/sessions',
    method: 'POST',
    body: {
      email: user.email,
      password: user.password
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('postTask', (task, token) => {
  cy.api({
    url:'/tasks',
    method: 'POST',
    headers: {
        Authorization: token
    },
    body: task,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('getUniqueTask', (taskId, token) => {
  cy.api({
      url: `/tasks/${taskId}`,
      method: 'GET',
      headers: {
          Authorization: token
      },
      failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteUniqueTask', (taskId, token) => {
  cy.api({
      url: `/tasks/${taskId}`,
      method: 'DELETE',
      headers: {
          Authorization: token
      },
      failOnStatusCode: false
  })
})

Cypress.Commands.add('getTasks', token => {
  cy.api({
      url: '/tasks',
      method: 'GET',
      headers: {
          Authorization: token
      },
      failOnStatusCode: false
  })
})

Cypress.Commands.add('putTaskDone', (taskId, token) => {
  cy.api({
      url: `/tasks/${taskId}/done`,
      method: 'PUT',
      headers: {
          Authorization: token
      },
      failOnStatusCode: false
  })
})