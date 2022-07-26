import {generateRandomSentence,generateRandomWord} from '../../support/genration';
context("Conduit -> New Article", {baseUrl: 'https://demo.productionready.io'} ,()=>{
    beforeEach( ()=> {
        cy.visit('/#/login')
        cy.fixture("userLogin.json").then((userInfo) => {
            cy.signIn(userInfo)
            .waitSignIn(200)
        })
        cy.visit("/#/editor/")
    })
    it("Verify that you can't submit the article when the title is empty", ()=> {
        cy.fixture('articalSubmited.json').then(articalInfo => {
            cy.fillAllFields({
                description: articalInfo.description,
                body: articalInfo.body
            })
        })
        cy.sumbitArticle()
        
        cy.checkHref('/#/editor/')
        cy.checkErrorMssg("title can't be blank")
    })
    
    it("Verify that you can't submit the article when the description is empty", ()=>{
        cy.fixture('articalSubmited.json').then(articalInfo => {
            cy.fillAllFields({
                title: articalInfo.title,
                body: articalInfo.body
            })
        })
        cy.sumbitArticle()

        cy.checkHref('/#/editor/')
        cy.checkErrorMssg("description can't be blank")
    })

    it("Verify that you can't submit the article when the body is empty", ()=>{
        cy.fixture('articalSubmited.json').then(articalInfo => {
            cy.fillAllFields({
                title: articalInfo.title,
                description: articalInfo.description
            })
        })
        cy.sumbitArticle()

        cy.checkHref('/#/editor/')
        cy.checkErrorMssg("body can't be blank")
    })

    it("Add a new article with no tags",()=>{
        const artical = {
            title: generateRandomSentence(3),
            description: generateRandomWord(15),
            body: generateRandomWord(50)
        }
        cy.fillAllFields(artical)
        cy.sumbitArticle()

        cy.checkArticlContent(artical)
        cy.checkHref(`/#/article/${artical.title.split(' ').join('-')}`)
    })
    
    it("Add a new article with tags",()=>{
        const artical = {
            title: generateRandomSentence(3),
            description: generateRandomWord(15),
            body: generateRandomWord(50),
            tags: 'implementations'
        }
        cy.fillAllFields(artical)
        cy.sumbitArticle()

        cy.checkArticlContent(artical)
        cy.checkHref(`/#/article/${artical.title.split(' ').join('-')}`)
    })

    it.only("Verify that you can't submit the article when the title is not unique", ()=> { 
            cy.fixture('articalSubmited.json').then(articalInfo => {
                cy.fillAllFields(articalInfo)
            })
            cy.sumbitArticle()

            cy.checkHref('/#/editor/')
            cy.checkErrorMssg("title must be unique")    
        
    })
    
})

context('Conduit -> New Article priority 1',{baseUrl: 'https://demo.productionready.io'},()=>{
    beforeEach(()=>{
        cy.visit('/#/login')
        cy.fixture("userLogin.json").then((userInfo) => {
            cy.signIn(userInfo)
            .waitSignIn(200)
        })
        cy.visit("/#/editor/")
    })
    it("Verify that you can't submit the article when all fields are empty", ()=> {
        cy.sumbitArticle()

        cy.checkHref('https://demo.productionready.io/#/editor/')
        cy.checkErrorMssg("title can't be blank")
    })
    it('Add a new article even with a very long title',()=>{
        const artical = {
            title: generateRandomSentence(50),
            description: generateRandomWord(15),
            body: generateRandomWord(50),
            tags: 'implementations'
        }
        cy.fillAllFields(artical)
        cy.sumbitArticle()

        cy.checkArticlContent(artical)
        cy.checkHref(`/#/article/${artical.title.split(' ').join('-')}`)
    })
})