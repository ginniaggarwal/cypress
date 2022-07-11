//// <reference types  ="Cypress" > />

const { hasUncaughtExceptionCaptureCallback } = require("process")

describe("secure login in amdin portal",()=>{
    it('Visit to the portal',()=>{
        cy.visit('http://admin.repligen.thelattice.org/auth/login')
    })
    
    // ===================================Validate Email Input============================================
    it('Keep email blank',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear()
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('mat-error').should('have.text',' Email ID is required ')
    })
    it('Enter only alphabets in email',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').type('ginniaggarwal')
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('mat-error').should('have.text',' Please enter a valid email ID ')
    })
    it('Enter only numeric input in email',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('1234567890')
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('mat-error').should('have.text',' Please enter a valid email ID ')
    })
    it('Enter only special characters in email',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('!@#$%^&*()')
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('mat-error').should('have.text',' Please enter a valid email ID ')
    })
    it('Enter invalid format of email 1',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('ginnithelattice.in')
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('mat-error').should('have.text',' Please enter a valid email ID ')
    })
    it('Enter invalid format of email 2',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('ginni@thelatticein')
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('mat-error').should('have.text',' Please enter a valid email ID ')
    })
    it('Enter invalid format of email 3',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('ginni@@thelattice.in')
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('mat-error').should('have.text',' Please enter a valid email ID ')
    })
    it('Enter invalid format of email 4',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('ginni@thelattice..in')
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('mat-error').should('have.text',' Please enter a valid email ID ')
    })
    it('Enter invalid format of email 5',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('ginni@thelattice.com')
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('@getotp').should('not.be.disabled')
        cy.get('.mat-snack-bar-container').should('have.text','Invalid email ID' )
    })
    it('Enter invalid format of email 6',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('ginni@thelattice.in.com')
        cy.get('.mat-raised-button').should('have.text','GET OTP')
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('@getotp').should('not.be.disabled')
        cy.get('.mat-snack-bar-container').should('have.text','Invalid email ID')
        
    })
    //=========================================Other domain validation ===================================================
    it('Use domain other than lattice/repligen',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('ginniaggarwal97@gmail.com')
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('not.be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('.mat-snack-bar-container').should('have.text','Invalid email ID') 
    })

    //=========================================== domain validation================================================

    it('Enter non registered email',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('ginni123@thelattice.in')    //replace lattice/repligen emails
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('not.be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('.mat-snack-bar-container').should('have.text','OTP sent to your email ID') 
    })
    xit('Enter existing email',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('ginni@thelattice.in')       //replace lattice/repligen emails
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('not.be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('.mat-snack-bar-container').should('have.text','OTP sent to your email ID')
        cy.go('back')   
    })

//=========================================== OTP validation================================================

    it('Keep OTP empty',()=>{
        cy.get('[formcontrolname="otp"]').as('otp')
        cy.get('@otp').clear()
        cy.get('.mat-raised-button').as('submit')
        cy.get('@submit').should('be.disabled')
        cy.get('@submit').contains('SUBMIT')

    })
    it('Enter alphabets in OTP',()=>{
        cy.get('[formcontrolname="otp"]').as('otp')
        cy.get('@otp').type('abcde')
        cy.get('.mat-raised-button').as('submit')
        cy.get('@submit').should('be.disabled')
        cy.get('@submit').contains('SUBMIT')

    })

    it('Enter special characters in OTP',()=>{
        cy.get('[formcontrolname="otp"]').as('otp')
        cy.get('@otp').type('!@#$%^^')
        cy.get('.mat-raised-button').as('submit')
        cy.get('@submit').should('be.disabled')
        cy.get('@submit').contains('SUBMIT')
    })

    it('Enter alphanumeric OTP',()=>{
        cy.get('[formcontrolname="otp"]').as('otp')
        cy.get('@otp').type('abc123')
        cy.get('@otp').invoke('val')
            .then(($text)=>{
            expect($text.length).to.eq(3)
            expect($text).to.eq('123')
            })
        cy.get('.mat-raised-button').as('submit')
        cy.get('@submit').should('be.disabled')
        cy.get('@submit').contains('SUBMIT')
    })

    it('Enter incorrect OTP',()=>{
        cy.get('[formcontrolname="otp"]').as('otp')
        cy.get('@otp').type('123456')
        cy.get('.mat-raised-button').as('submit')
        cy.get('@submit').should('be.enabled')
        cy.get('@submit').contains('SUBMIT').click()
        cy.get('.mat-snack-bar-container').should('have.text','Invalid OTP')
    })

    it('Enter freetext OTP',()=>{
        cy.get('[formcontrolname="otp"]').as('otp')
        cy.get('@otp').clear().type('ab@123')
        cy.get('@otp').invoke('val')
            .then(($text)=>{
            expect($text.length).to.eq(3)
            expect($text).to.eq('123')
            })
        cy.get('.mat-raised-button').as('submit')
        cy.get('@submit').should('be.disabled')
        cy.get('@submit').contains('SUBMIT')
    })

    it('Enter less than 6 digit OTP',()=>{
        cy.get('[formcontrolname="otp"]').as('otp')
        cy.get('@otp').clear().type('123567')
        cy.get('.mat-raised-button').contains('SUBMIT').click()
        cy.get('@otp').invoke('val')
            .then(($text)=>{
                if($text.length < 6){
                    cy.get('mat-error').should('have.text',' Invalid OTP ')
                    cy.get('.mat-raised-button').as('submit')
                    cy.get('@submit').should('be.disabled')
                }
                else{
                   
                    cy.get('mat-error').should('not.exist')
                    cy.get('.mat-raised-button').as('submit')
                    cy.get('@submit').should('be.enabled').click()
                    cy.get('.mat-snack-bar-container').should('have.text','Invalid OTP')
                    
                }
                expect($text).to.eq('123567')
            })
    })
    
    xit('Enter non-existing email',()=>{
        cy.get('[formcontrolname="email_id"]').as('email')
        cy.get('@email').clear().type('ginni@thelattice.in')
        cy.get('.mat-raised-button').as('getotp')
        cy.get('@getotp').should('not.be.disabled')
        cy.get('@getotp').contains("GET OTP").click()
        cy.get('.mat-snack-bar-container').should('have.text','OTP sent to your email ID')  
        cy.go('back') 
    })
    

//========================================= Static accounts validation =======================================================
it('Visit to the portal',()=>{
    cy.visit('http://admin.repligen.thelattice.org/auth/login')
})

it('Login using user account',()=>{
    cy.get('[formcontrolname="email_id"]').as('email')
    cy.get('@email').clear().type('user@repligen.com')      //replace with user/demo email
    cy.get('.mat-raised-button').as('getotp')
    cy.get('@getotp').should('not.be.disabled')
    cy.get('@getotp').contains("GET OTP").click()
    cy.get('[formcontrolname="otp"]').as('otp')
    cy.get('@otp').clear().type('123567')                 //update static OTP
    cy.get('.mat-raised-button').contains('SUBMIT').click()
    cy.url().contains('customer-list')   
    })

})