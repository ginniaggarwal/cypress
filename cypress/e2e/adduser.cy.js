////<reference types ="Cypress"> 

describe('Add User',()=>{
    it('Login using valid credentials',()=>{
        cy.visit('http://admin.repligen.thelattice.org/auth')
        cy.get('#mat-input-0').type('demo@repligen.com')
        cy.get('#mat-input-1').type('KFComm2C')
        cy.get('.mat-button-wrapper').contains('LOGIN').click()
    })
    it('validate landing screen',()=>{
        cy.url().should('include','customer-list')
        //add user
        cy.get('.mat-button-wrapper').contains(' ADD ').click()
        cy.wait(3000)
    })
        
    it('blank input in custid',()=>{
        cy.get('[formcontrolname="customer_id"]').should('be.empty').click()
        cy.get('[formcontrolname="name"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Customer ID is required')
    })
    it('invalid custid',()=>{
        cy.get('[formcontrolname="customer_id"]').clear().type('Cust 001')
        cy.get('[formcontrolname="name"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter correct customer ID.')
    })
    it('alphabets input in custid',()=>{
        cy.get('[formcontrolname="customer_id"]').type('customerid')
        cy.get('[formcontrolname="name"]').click()
    })
    it('numeric input in custid',()=>{
        cy.get('[formcontrolname="customer_id"]').clear().type('123456789')
        cy.get('[formcontrolname="name"]').click()
    })
    it('special characters input in custid',()=>{
        cy.get('[formcontrolname="customer_id"]').clear().type('!@#$%^&*()')
        cy.get('[formcontrolname="name"]').click()
    })
    it('freetext input in custid',()=>{
        cy.get('[formcontrolname="customer_id"]').clear().type('Cust_001')
        cy.get('[formcontrolname="name"]').click()
    })
    it('blank input in companyname',()=>{
        cy.get('[formcontrolname="name"]').should('be.empty').click()
        cy.get('[formcontrolname="email"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Company name is required ')
    })
    it('alphabets input in companyname',()=>{
        cy.get('[formcontrolname="name"]').type('lattice')
        cy.get('[formcontrolname="email"]').click()
    })
    it('numeric input in companyname',()=>{
        cy.get('[formcontrolname="name"]').clear().type('123456789')
        cy.get('[formcontrolname="email"]').click()
    })
    it('special characters input in companyname',()=>{
        cy.get('[formcontrolname="name"]').clear().type('!@#$%^&*()')
        cy.get('[formcontrolname="email"]').click()
    })
    it('freetext input in companyname',()=>{
        cy.get('[formcontrolname="name"]').clear().type('Lattice 1nnovation')
        cy.get('[formcontrolname="email"]').click()
    })
    it('only alphabets in email',()=>{
        cy.get('[formcontrolname="email"]').should('be.empty').click()
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Primary Email ID is required ')
    })
    it('only alphabets in email',()=>{
        cy.get('[formcontrolname="email"]').clear().type('Lattice')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter a valid email. ')
        cy.get('.mat-error').eq(1).should('have.text',' Email should be of minimum 10 characters. ')
    })
    it('only numbers in email',()=>{
        cy.get('[formcontrolname="email"]').clear().type('12345670')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter a valid email. ')
        cy.get('.mat-error').eq(1).should('have.text',' Email should be of minimum 10 characters. ')
    })
    it('only special chars in email',()=>{
        cy.get('[formcontrolname="email"]').clear().type('!@#^&*()')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter a valid email. ')
        cy.get('.mat-error').eq(1).should('have.text',' Email should be of minimum 10 characters. ')
    })
    it('less than 10 chars email',()=>{
        cy.get('[formcontrolname="email"]').clear().type('a@gm.com')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Email should be of minimum 10 characters. ')
    })
    it('Invalid email format_1',()=>{
        cy.get('[formcontrolname="email"]').clear().type('ginniaggarwa@')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter a valid email. ')
    })
    it('Invalid email format_1',()=>{
        cy.get('[formcontrolname="email"]').clear().type('ginniaggarwa@')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter a valid email. ')
    })
    it('Invalid email format_2',()=>{
        cy.get('[formcontrolname="email"]').clear().type('ginniaggarwa@@')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter a valid email. ')
    })
    it('Invalid email format_3',()=>{
        cy.get('[formcontrolname="email"]').clear().type('ginniaggarwa@gmail')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter a valid email. ')
    })
    it('Invalid email format_4',()=>{
        cy.get('[formcontrolname="email"]').clear().type('ginniag@garwa@')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter a valid email. ')
    })
    it('Invalid email format_5',()=>{
        cy.get('[formcontrolname="email"]').clear().type('ginniaggarwa@gmil.')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter a valid email. ')
    })
    it('Invalid email format_6',()=>{
        cy.get('[formcontrolname="email"]').clear().type('ginniaggarwa@gmail.@')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter a valid email. ')
    })
    it('Invalid email format_7',()=>{
        cy.get('[formcontrolname="email"]').clear().type('ginniaggarwa@gmail.com^')
        cy.get('[formcontrolname="purchase_password"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Please enter a valid email. ')
    })
    it('valid email format',()=>{
        cy.get('[formcontrolname="email"]').clear().type('ginni@gmail.com')
        cy.get('[formcontrolname="purchase_password"]').click()
    })
    it('blank password',()=>{
        cy.get('[formcontrolname="purchase_password"]').should('be.empty')
        cy.get('[formcontrolname="email"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Password is required ')
        cy.get('.mat-error').eq(1).should('have.text',' Password must contain atleast one uppercase, lowercase, digit and special character ')
    })
    it('all lowercase password',()=>{
        cy.get('[formcontrolname="purchase_password"]').clear().type('testpassword')
        cy.get('[formcontrolname="email"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Password must contain atleast one uppercase, lowercase, digit and special character ')
    })
    it('all lowercase password',()=>{
        cy.get('[formcontrolname="purchase_password"]').clear().type('TESTPASSWORD')
        cy.get('[formcontrolname="email"]').click()
        cy.get('.mat-error').eq(0).should('have.text',' Password must contain atleast one uppercase, lowercase, digit and special character ')
    })

})