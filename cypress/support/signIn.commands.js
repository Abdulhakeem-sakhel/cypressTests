Cypress.Commands.add('signIn',(userInfo)=>{
    cy.get('[ng-model="$ctrl.formData.email"]')
    .clear()
    .type(userInfo.email)

    cy.get('[ng-model="$ctrl.formData.password"]')
    .clear()
    .type(userInfo.password)

    //cy.get('[ng-bind="$ctrl.title"] > [type="submit"]')
    cy.get('[ng-bind="$ctrl.title"]').eq(1)
    .click()
    })

Cypress.Commands.add("checkSignIn",(status) =>{
    cy.intercept({
        pathname: '/api/users/login',
        method: 'POST'
    })
    .as('signInHttp')

    cy.wait('@signInHttp').its('response.statusCode').should('eq',307)

    cy.wait('@signInHttp').its('response.statusCode').should('eq',status)
})

Cypress.Commands.add('deleteArtical',() => {
    cy.visit('https://demo.productionready.io/#/@abod')
    cy.get('[ng-bind="$ctrl.article.title"]').click()
    cy.get('[ng-show="$ctrl.canModify"]').find('button').eq(0).click()

    cy.intercept({
        pathname: '/api/articles',
        method: 'DELETE'
    })
    .as("httpdeleteArtical")

    cy.wait('httpdeleteArtical').then(http => {
        
    })
})