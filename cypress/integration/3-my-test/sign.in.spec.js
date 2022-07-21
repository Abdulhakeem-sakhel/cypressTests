context("sign in testing", () => {
    beforeEach( ()=> {
        cy.visit('https://demo.productionready.io/#/login')
        cy.fixture("my.json").then((userInfo) => {
            cy.signIn(userInfo)
            .checkSignIn(200)
        })
    })

    it("test", ()=> {
        cy.get('[class="nav nav-pills outline-active"]')
        .within(() => {
            cy.get("li.nav-item")
            .contains('Global Feed')
            .click()
        })
        cy.get('nav.navbar').find('ul.nav[show-authed="true"]').within(() => {
            cy.get('li.nav-item').eq(0).children('a')
            .should('have.attr','href','#/')

            cy.get('li.nav-item').eq(1).children('a')
            .should('have.attr','href','#/editor/')

            cy.get('li.nav-item').eq(2).children('a')
            .should('have.attr','href','#/settings')

            cy.get('li.nav-item').eq(3).children('a')
            .should('have.attr','href','#/@abod')
        })
    })

    it('test user article', () => {
        cy.fixture('my.json').then(userInfo => {
            cy.get('nav.navbar')
            .find('ul.nav[show-authed="true"]')
            .find('li.nav-item')
            .contains(userInfo.name)
            .click()
        })
        
        cy.intercept({
            pathname: '/api/articles',
            method: 'GET'
        }).as('articles')

        cy.wait('@articles').its('response.statusCode').should('eq',307)
        cy.wait('@articles').then(http => {
            expect(http.response.statusCode).to.eq(200)
            expect(http.response.body.articlesCount).to.eq(0)
        })

        cy.get('.articles-toggle')
        .find('ul.nav')
        .children().eq(1)
        .click()

        cy.wait('@articles').its('response.statusCode').should('eq',307)
        cy.wait('@articles').then(http => {
            expect(http.response.statusCode).to.eq(200)
            expect(http.response.body.articlesCount).to.eq(0)
        })

       
        //cy.wait(3000).get('div.ng-scope > article-list')
        //.find('.article-preview:not(.ng-hide)')
        //.should('have.text','\n  No articles are here... yet.\n')
    })

    it.only("delete artical",()=>{
        cy.fixture('my.json').then(userInfo => {
            cy.get('nav.navbar')
            .find('ul.nav[show-authed="true"]')
            .find('li.nav-item')
            .contains(userInfo.name)
            .click()
        })

        cy.intercept({
            pathname: '/api/articles',
            method: 'GET'
        }).as('articles')

        cy.wait('@articles').its('response.statusCode').should('eq',307)
        cy.wait('@articles').then(http => {
            expect(http.response.statusCode).to.eq(200)
            //expect(http.response.body.articlesCount).to.eq(1)
            if(http.response.body.articlesCount > 0){
                cy.deleteArtical()
            }
            else if (http.response.body.articlesCount === 0)
            {
                cy.log('no article left ')
            }
        })

    })

    it('new article', () => {
        cy.get('nav.navbar > div')
        .find('ul.nav > li')
        .contains(' New Article')
        .click();


        cy.get('[ng-model="$ctrl.article.title"]').type('the mysteries of the world')
        cy.get('[ng-model="$ctrl.article.description"]').type('iam bored')
        cy.get('[ng-model="$ctrl.article.body"]').type('#I have no idea')
        cy.get('[ng-click="$ctrl.submit()"]').click()
    })


    
})