context("Conduit -> New Article", ()=>{
    beforeEach( ()=> {
        cy.visit('https://demo.productionready.io/#/login')
        cy.fixture("my.json").then((userInfo) => {
            cy.signIn(userInfo)
            .waitSignIn(200)
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
    
    it("Verify that you can't submit the article when the description is empty", ()=>{
        cy.fillTitle('title')
        cy.fillBody('body')
        cy.sumbitArticle()

        cy.checkHref('https://demo.productionready.io/#/editor/')
        cy.checkErrorMssg("description can't be blank")
    })

    it("Verify that you can't submit the article when the body is empty", ()=>{
        cy.fillTitle('title')
        cy.fillDescription('Description')
        cy.sumbitArticle()

        cy.checkHref('https://demo.productionready.io/#/editor/')
        cy.checkErrorMssg("body can't be blank")
    })

    it("Add a new article with no tags",()=>{
        const artical = {
            title: genSentence(3),
            description: genWord(15),
            body: genWord(50)
        }

        cy.fillTitle(artical.title)
        cy.fillDescription(artical.description)
        cy.fillBody(artical.body)
        cy.sumbitArticle()

        cy.checkArticlContent(artical)
        cy.checkHref(`https://demo.productionready.io/#/article/${artical.title.split(' ').join('-')}`)
    })
    
    
})


function genWord(length) {
    let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let string = '';
    for(let ii=0; ii<length; ii++){
        string += chars[Math.floor(Math.random() * chars.length)];
}
    return string;
}

function genSentence(wordsCount)
{
    let str='';
    for (let i=0;i<wordsCount;i++)
    {
        str += genWord(4)+" "
    }
    return str.trim();
}