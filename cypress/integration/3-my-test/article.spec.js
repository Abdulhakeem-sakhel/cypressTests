import {generateRandomSentence,generateRandomWord} from '../../support/genration';
context("Conduit -> New Article" ,()=>{
    beforeEach( ()=> {
        cy.visit('/#/login')
        cy.signIn()
          .waitSignIn(200)
        cy.visit("/#/editor/")
    })
    it("Verify that you can't submit the article when the title is empty", ()=> {
        let articalInfo = {
            description: "iam bored",
            body: "I have no idea",
            errorMessage: "title can't be blank"
        }
        cy.fillAllFields(articalInfo)
        cy.checkHref('/#/editor/')
    })
    
    it("Verify that you can't submit the article when the description is empty", ()=>{
        let articalInfo = {
            title: "the mysteries of the world",
            body: "I have no idea",
            errorMessage: "description can't be blank"
        }
        cy.fillAllFields(articalInfo)
        cy.checkHref('/#/editor/')
    })

    it("Verify that you can't submit the article when the body is empty", ()=>{
        let articalInfo = {
            title: "the mysteries of the world",
            description: "iam bored",
            errorMessage: "body can't be blank"
        }
        cy.fillAllFields(articalInfo)
        cy.checkHref('/#/editor/')
    })

    it("Add a new article with no tags",()=>{
        let articalInfo = {
            title: generateRandomSentence(3),
            description: generateRandomWord(15),
            body: generateRandomWord(50),
        }
        cy.fillAllFields(articalInfo)
        cy.wait(1000).checkArticlContent(articalInfo)
        cy.checkHref(`/#/article/${articalInfo.title.split(' ').join('-')}`)
    })
    
    it("Add a new article with tags",()=>{
        let articalInfo = {
            title: generateRandomSentence(3),
            description: generateRandomWord(15),
            body: generateRandomWord(50),
            tags: ['implementations', 'codebaseShow']
        }
        cy.fillAllFields(articalInfo)
        cy.wait(1000).checkArticlContent(articalInfo)
        cy.checkHref(`/#/article/${articalInfo.title.split(' ').join('-')}`)
    })

    it("Verify that you can't submit the article when the title is not unique", ()=> { 
        let articalInfo = {
            title: "the mysteries of the world",
            description: "iam bored",
            body: "I have no idea",
        }
        cy.fillAllFields(articalInfo)
        cy.checkHref('/#/editor/')
        cy.checkErrorMssg("title must be unique")    
    })

    it("Verify that you can't submit the article when all fields are empty", ()=> {
        let articalInfo = {
            errorMessage : "title can't be blank",
        }
        cy.fillAllFields(articalInfo)
        cy.checkHref('/#/editor/')
    })
    it('Add a new article even with a very long title',()=>{
        Cypress.Keyboard.defaults({keystrokeDelay: 0,})
        const articalInfo = {
            title: generateRandomSentence(100),
            description: generateRandomWord(15),
            body: generateRandomWord(50),
            tags: ['implementations', 'codebaseShow']
        }
        cy.fillAllFields(articalInfo)
        
        cy.wait(1000).checkArticlContent(articalInfo)
        cy.checkHref(`/#/article/${articalInfo.title.split(' ').join('-')}`)
    })
    
})