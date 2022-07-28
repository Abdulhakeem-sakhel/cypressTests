const LOCATERS = {
    titleField: '[ng-model="$ctrl.article.title"]',
    descriptionField: '[ng-model="$ctrl.article.description"]',
    bodyField: '[ng-model="$ctrl.article.body"]',
    tagsField: '[ng-model="$ctrl.tagField"]',
    sumbitButton: '[ng-click="$ctrl.submit()"]',
    errorMessage: '[ng-repeat="error in errors"]',
    titleContent: '[ng-bind="::$ctrl.article.title"]',
    bodyContent: '[ng-bind-html="::$ctrl.article.body"]',
    authorName: '[ng-bind="$ctrl.article.author.username"]',
    sumbitedTitle: '[ng-bind="$ctrl.article.title"]'
}

Cypress.Commands.add('fillFeild',(locater,text)=>{
    cy.get(locater)
      .clear()
      .type(text)
})

Cypress.Commands.add('fillAllFields',(articalInfo)=> {
    if(articalInfo.title){
        cy.fillFeild(LOCATERS.titleField,articalInfo.title)
    }
    if(articalInfo.description){
        cy.fillFeild(LOCATERS.descriptionField,articalInfo.description)
    }
    if(articalInfo.body){
        cy.fillFeild(LOCATERS.bodyField,articalInfo.body)
    }
    if(articalInfo.tags !== undefined){
        cy.fillFeild(LOCATERS.tagsField,articalInfo.tags.join(" "))
    }
    cy.get(LOCATERS.sumbitButton)
      .click()
    
    if(articalInfo.errorMessage){
        cy.checkErrorMssg(articalInfo.errorMessage)
    }
    
})

Cypress.Commands.add('checkHref',(href)=> {
    cy.location().then((location) => {
        expect(location.href).match(new RegExp(href))
    })
})


Cypress.Commands.add('checkErrorMssg',(error)=>{
    error = new RegExp(error,"ig")
    cy.get(LOCATERS.errorMessage)
      .then($elm=>{
        expect($elm).to.be.visible
        cy.log($elm.text())
        expect($elm.text()).match(error)
    })
    
})

Cypress.Commands.add('checkArticlContent',(articalInfo) => {
    cy.get(LOCATERS.titleContent)
      .then($elm =>{
        expect($elm.text()).match(new RegExp(articalInfo.title))
    })

    cy.get(LOCATERS.bodyContent)
      .then($elm =>{
        expect($elm.text()).match(new RegExp(articalInfo.body))
    })

 
    cy.get('[ng-bind="$ctrl.article.author.username"]').first()
        .should('have.text',Cypress.env('name'))
})

Cypress.Commands.add('signIn',()=>{
    cy.get('[ng-model="$ctrl.formData.email"]')
    .clear()
    .type(Cypress.env('email'))

    cy.get('[ng-model="$ctrl.formData.password"]')
    .clear()
    .type(Cypress.env('password'))

    //cy.get('[ng-bind="$ctrl.title"] > [type="submit"]')
    cy.get('[ng-bind="$ctrl.title"]').eq(1)
    .click()
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