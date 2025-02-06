Cypress.Commands.add('purgeMessages', () => {
    cy.api({
      url: `${Cypress.env('amqpHost')}/tasks/contents`,
      method: 'DELETE',
      headers: {
          Authorization: Cypress.env('amqpToken')
      },
      body: {
        vhost: "ywtspiue",
        name: "tasks",
        mode: "purge"
      },
      failOnStatusCode: false
    })
  })
  
  Cypress.Commands.add('getMessageQueue', () => {
    cy.api({
      url: `${Cypress.env('amqpHost')}/tasks/get`,
      method: 'POST',
      headers: {
          Authorization: Cypress.env('amqpToken')
      },
      body: {
        vhost: "ywtspiue",
        name: "tasks",
        truncate: "50000",
        ackmode: "ack_requeue_true",
        encoding: "auto",
        count: "1"
    },
      failOnStatusCode: false
    })
  })