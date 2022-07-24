Cypress.Commands.add('fillTitle',(title)=>{
    cy.get('[ng-model="$ctrl.article.title"]')
    .clear()
    .type(title)
})

Cypress.Commands.add('fillDescription',(description) => {
    cy.get('[ng-model="$ctrl.article.description"]')
    .clear()
    .type(description)
})

Cypress.Commands.add('fillBody',(body)=>{
    cy.get('[ng-model="$ctrl.article.body"]')
    .clear()
    .type(body)
})

Cypress.Commands.add('sumbitArticle',()=>{
    cy.get('[ng-click="$ctrl.submit()"]')
    .click()
})

Cypress.Commands.add('checkHref',(href)=> {
    cy.location().then((location) => {
        expect(location.href).to.eq(href)
    })
})


Cypress.Commands.add('checkErrorMssg',(error)=>{
    cy.get('[ng-repeat="error in errors"]')
    .then($elm=>{
        expect($elm).to.be.visible
        cy.log($elm.text())
        expect($elm.text()).match(error)
    })
    
})

Cypress.Commands.add("waitSignIn",(status) =>{
    cy.intercept({
        pathname: '/api/users/login',
        method: 'POST'
    })
    .as('signInHttp')

    cy.wait('@signInHttp').its('response.statusCode').then(statusCode=>{
        if(statusCode === status)
        {
            expect(statusCode).to.eq(status)
        }
        else if(statusCode === 307)
        {
            cy.wait('@signInHttp').its('response.statusCode').should('eq',status)
        }
        else {
            throw new Error('an expected http request happend');
        }
    })
    
})