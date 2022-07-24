context("Conduit -> New Article", ()=>{
    beforeEach( ()=> {
        cy.visit('https://demo.productionready.io/#/login')
        cy.fixture("my.json").then((userInfo) => {
            cy.signIn(userInfo)
            .checkSignIn(200)
        })
        cy.visit("https://demo.productionready.io/#/editor/")
    })
    it("Verify that you can't submit the article when the title is empty", ()=> {
        cy.fillDescription('Description')
        cy.fillBody('Body')
        cy.sumbitArticle()
        
        cy.checkHref('https://demo.productionready.io/#/editor/')
        cy.checkErrorMssg(/title can't be blank/)
    })
    
})