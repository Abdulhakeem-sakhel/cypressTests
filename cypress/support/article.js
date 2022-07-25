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

Cypress.Commands.add('fillTags',(tags) =>{
    cy.get('[ng-model="$ctrl.tagField"]')
    .clear()
    .type(tags)
})

Cypress.Commands.add('sumbitArticle',()=>{
    cy.get('[ng-click="$ctrl.submit()"]')
    .click()
})

Cypress.Commands.add('checkHref',(href)=> {
    cy.location().then((location) => {
        expect(location.href).match(new RegExp(href))
    })
})


Cypress.Commands.add('checkErrorMssg',(error)=>{
    error = new RegExp(error,"ig")
    cy.get('[ng-repeat="error in errors"]')
    .then($elm=>{
        expect($elm).to.be.visible
        cy.log($elm.text())
        expect($elm.text()).match(error)
    })
    
})

Cypress.Commands.add('checkArticlContent',(articalInfo) => {
    cy.get('[ng-bind="::$ctrl.article.title"]')
    .then($elm =>{
        expect($elm.text()).match(new RegExp(articalInfo.title))
    })

    cy.get('[ng-bind-html="::$ctrl.article.body"]')
    .then($elm =>{
        expect($elm.text()).match(new RegExp(articalInfo.body))
    })

    cy.fixture("my.json").then((userInfo)=>{
        cy.get('[ng-bind="$ctrl.article.author.username"]').first()
        .should('have.text',userInfo.name)
    })
})

Cypress.Commands.add("getTitleName", ()=> {
    cy.fixture('my.json').then(userInfo => {
        cy.visit(`https://demo.productionready.io/#/@${userInfo.name}`)
    })
    cy.intercept({method: "GET",pathname: "/api/articles"}).as('author')
    cy.wait('@author').then(http => {
    })
    cy.get('[ng-bind="$ctrl.article.title"]').first()
    .then($elm =>{ 
        cy.visit('https://demo.productionready.io/#/editor/')
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

