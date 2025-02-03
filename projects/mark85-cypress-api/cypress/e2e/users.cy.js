describe("POST /users", () => {

  it('Register a new user', () => {

    const user = {
        "name": "Alyson Silva", 
        "email": "Alyson.silva@teste.com", 
        "password": "teste1"
    }

    cy.task('removeUser', user.email)

    cy.postUser(user).then(response => {
      expect(response.status).to.eq(201)
      cy.log(JSON.stringify(response.body))
    })
  })

  it('Duplicate email', () => {

    const user = {
        "name": "James Gunn", 
        "email": "James.gunn@teste.com", 
        "password": "aly123"
    }

    cy.postUser(user).then(response => {
      expect(response.status).to.eq(409)
      expect(response.body.message).to.eq("Duplicated email!")
    })
  })

  context('Required fields', () => {

    let user;

    beforeEach(() => {
      user = {
        name: "Margot Robbie",
        email: "margot.robbie@teste.com",
        password: "teste1"
      }
    })

    it("Name is required", () => {
      delete user.name

      cy.postUser(user).then(response => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq("ValidationError: \"name\" is required")
      })
    })

    it("Email is required", () => {
      delete user.email

      cy.postUser(user).then(response => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq("ValidationError: \"email\" is required")
      })
    })

    it("Password is required", () => {
      delete user.password

      cy.postUser(user).then(response => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq("ValidationError: \"password\" is required")
      })
    })
  })
})