/// <reference types="Cypress"> />

describe("Login validation",() =>
{
    it('should vist the url',()=>{
        cy.visit('http://admin.repligen.thelattice.org/auth');
    })
    it('should accept valid email id',() =>{
        cy.get("#mat-input-0").as('emailLocator')
        cy.get("@emailLocator").type('abcde')
        cy.get("#mat-input-1").click()
        cy.get("#mat-error-2").should('have.text'," Please enter a valid email ID ")
        cy.get("@emailLocator").clear().type('12345')
        cy.get("#mat-input-1").click()
        cy.get("#mat-error-4").should('have.text'," Please enter a valid email ID ")
        cy.get("@emailLocator").clear().type('!@#$%^&*()')
        cy.get("#mat-input-1").click()
        cy.get("#mat-error-6").should('have.text'," Please enter a valid email ID ")
        cy.get("@emailLocator").clear().type(' ')
        cy.get("#mat-input-1").click()
        cy.get("#mat-error-8").should('have.text'," Please enter a valid email ID ")
    })
    it('should accept valid email id',()  =>{
        cy.get("#mat-input-0").clear().type('ginni@fhv')
        cy.get("#mat-input-1").click()
        cy.get("#mat-error-10").should('have.text'," Please enter a valid email ID ")
    })
    it('should accept valid email id',()  =>{
        cy.get("#mat-input-0").clear().type('ginni@fhv.')
        cy.get("#mat-input-1").click()
        cy.get("#mat-error-12").should('have.text'," Please enter a valid email ID ")
    })
    it('should accept valid email id',()  =>{
        cy.get("#mat-input-0").clear().type('ginni@fhv.vf.')
        cy.get("#mat-input-1").click()
        cy.get("#mat-error-14").should('have.text'," Please enter a valid email ID ")
    })
    it('should accept valid email id',()  =>{
        cy.get("#mat-input-0").clear().type('ginni@fhv.comfff')
        cy.get("#mat-input-1").click()
    })
    it('should accept a valid password',()=>{
        cy.get('#mat-input-1').click()
        cy.get('#mat-error-1').should('have.text',' Password is required ')
        cy.get('#mat-input-1').type("a")
        cy.contains("LOGIN").click()
     })
     it('login using valid credentials',() =>{
         cy.get('#mat-input-0').clear().type('demo@repligen.com')
         cy.get('#mat-input-1').clear().type('KFComm2C')
         cy.contains('LOGIN').click()
         cy.url().should('include','customer-list')
     })

})
