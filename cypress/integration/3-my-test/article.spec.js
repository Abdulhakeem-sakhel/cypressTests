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
            inputFieldDescription: "iam bored",
            inputFieldBody: "I have no idea",
            errorMessage: "title can't be blank"
        }
        cy.sumbitArtical(articalInfo)
        cy.checkHref('/#/editor/')
    })
    
    it("Verify that you can't submit the article when the description is empty", ()=>{
        let articalInfo = {
            inputFieldTitle: "the mysteries of the world",
            inputFieldBody: "I have no idea",
            errorMessage: "description can't be blank"
        }
        cy.sumbitArtical(articalInfo)
        cy.checkHref('/#/editor/')
    })

    it("Verify that you can't submit the article when the body is empty", ()=>{
        let articalInfo = {
            inputFieldTitle: "the mysteries of the world",
            inputFieldDescription: "iam bored",
            errorMessage: "body can't be blank"
        }
        cy.sumbitArtical(articalInfo)
        cy.checkHref('/#/editor/')
    })

    it("Add a new article with no tags",()=>{
        let articalInfo = {
            inputFieldTitle: generateRandomSentence(3),
            inputFieldDescription: generateRandomWord(15),
            inputFieldBody: generateRandomWord(50),
        }
        cy.sumbitArtical(articalInfo)
        cy.wait(1000).checkArticlContent(articalInfo)
        cy.checkHref(`/#/article/${articalInfo.inputFieldTitle.split(' ').join('-')}`)
    })
    
    it("Add a new article with tags",()=>{
        let articalInfo = {
            inputFieldTitle: generateRandomSentence(3),
            inputFieldDescription: generateRandomWord(15),
            inputFieldBody: generateRandomWord(50),
            inputFieldTags: ['implementations', 'codebaseShow']
        }
        cy.sumbitArtical(articalInfo)
        cy.wait(1000).checkArticlContent(articalInfo)
        cy.checkHref(`/#/article/${articalInfo.inputFieldTitle.split(' ').join('-')}`)
    })

    it("Verify that you can't submit the article when the title is not unique", ()=> { 
        let articalInfo = {
            inputFieldTitle: "the mysteries of the world",
            inputFieldDescription: "iam bored",
            inputFieldBody: "I have no idea",
            errorMessage: "title must be unique"
        }
        cy.sumbitArtical(articalInfo)
        cy.checkHref('/#/editor/')
    })

    it("Verify that you can't submit the article when all fields are empty", ()=> {
        let articalInfo = {
            errorMessage : "title can't be blank",
        }
        cy.sumbitArtical(articalInfo)
        cy.checkHref('/#/editor/')
    })
    it('Add a new article even with a very long title',()=>{
        Cypress.Keyboard.defaults({keystrokeDelay: 0,})
        const articalInfo = {
            inputFieldTitle: generateRandomSentence(100),
            inputFieldDescription: generateRandomWord(15),
            inputFieldBody: generateRandomWord(50),
            inputFieldTags:['codebaseShow']
        }
        cy.sumbitArtical(articalInfo)
        
        cy.wait(1000).checkArticlContent(articalInfo)
        cy.checkHref(`/#/article/${articalInfo.inputFieldTitle.split(' ').join('-')}`)
    })
    
})