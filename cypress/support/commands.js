// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("signingup", ($userInfo) =>{
    cy.get('[ng-model="$ctrl.formData.username"]')
        .clear()
        .type($userInfo.username)

    cy.get('[ng-model="$ctrl.formData.email"]')
        .clear()
        .type($userInfo.email)

    cy.get('[ng-model="$ctrl.formData.password"]')
        .clear()
        .type($userInfo.pass)

    cy.get('[ng-disabled="$ctrl.isSubmitting"] > [type="submit"]')
        .click()
})

Cypress.Commands.add('stateSignUp',(state) =>{

    cy.intercept({pathname: '/api/users',method: 'POST'}).as('sign-up-state');

    
    cy.wait('@sign-up-state').its('response.statusCode').should('eq',307)
    //if(success === false)
        //cy.wait('@sign-up-state').its('response.body').should('deep.equal',{"errors":{"email":["has already been taken"],"username":["has already been taken"]}})        
    
    cy.wait('@sign-up-state').its('response.statusCode').should('eq',state)
})

