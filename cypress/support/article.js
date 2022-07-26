const locaters = {
    articleTitleField: '[ng-model="$ctrl.article.title"]',
    articleDescriptionField: '[ng-model="$ctrl.article.description"]',
    articleBodyField: '[ng-model="$ctrl.article.body"]',
    articleTagsField: '[ng-model="$ctrl.tagField"]',
    articleSumbitButton: '[ng-click="$ctrl.submit()"]',
    errorMessage: '[ng-repeat="error in errors"]',
    articleTitleContent: '[ng-bind="::$ctrl.article.title"]',
    articleBodyContent: '[ng-bind-html="::$ctrl.article.body"]',
    articalAuthorName: '[ng-bind="$ctrl.article.author.username"]',
    articalSumbitedTitle: '[ng-bind="$ctrl.article.title"]'
}

Cypress.Commands.add('fillTitle',(title)=>{
    cy.get(locaters.articleTitleField)
      .clear()
      .type(title)
})

Cypress.Commands.add('fillDescription',(description) => {
    cy.get(locaters.articleDescriptionField)
      .clear()
      .type(description)
})

Cypress.Commands.add('fillBody',(body)=>{
    cy.get(locaters.articleBodyField)
      .clear()
      .type(body)
})

Cypress.Commands.add('fillTags',(tags) =>{
    cy.get(locaters.articleTagsField)
    .clear()
    .type(tags)
})

Cypress.Commands.add('fillAllFields',(articalInfo)=> {
    if(articalInfo.title !== undefined){
        cy.fillTitle(articalInfo.title)
    }
    if(articalInfo.description !== undefined){
        cy.fillDescription(articalInfo.description)
    }
    if(articalInfo.body !== undefined){
        cy.fillBody(articalInfo.body)
    }
    if(articalInfo.tags !== undefined){
        cy.fillTags(articalInfo.tags)
    }
    
})

Cypress.Commands.add('sumbitArticle',()=>{
    cy.get(locaters.articleSumbitButton)
      .click()
})

Cypress.Commands.add('checkHref',(href)=> {
    cy.location().then((location) => {
        expect(location.href).match(new RegExp(href))
    })
})


Cypress.Commands.add('checkErrorMssg',(error)=>{
    error = new RegExp(error,"ig")
    cy.get(locaters.errorMessage)
    .then($elm=>{
        expect($elm).to.be.visible
        cy.log($elm.text())
        expect($elm.text()).match(error)
    })
    
})

Cypress.Commands.add('checkArticlContent',(articalInfo) => {
    cy.get(locaters.articleTitleContent)
      .then($elm =>{
        expect($elm.text()).match(new RegExp(articalInfo.title))
    })

    cy.get(locaters.articleBodyContent)
    .then($elm =>{
        expect($elm.text()).match(new RegExp(articalInfo.body))
    })

    cy.fixture("userLogin.json").then((userInfo)=>{
        cy.get('[ng-bind="$ctrl.article.author.username"]').first()
          .should('have.text',userInfo.name)
    })
})

Cypress.Commands.add("getTitleName", ()=> {
    cy.fixture('userLogin.json').then(userInfo => {
        cy.visit(`/#/@${userInfo.name}`)
    })
    cy.intercept({method: "GET",pathname: "/api/articles"}).as('author')
    cy.wait('@author').then(http => {
    })
    cy.get(locaters.articalSumbitedTitle).first()
      .then($elm =>{ 
        cy.visit('/#/editor/')
          .then(() => $elm.text())
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

