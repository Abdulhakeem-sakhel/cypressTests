context.only("testing trigger ", () => {
    before(() => {
        cy.visit("https://docs.cypress.io/api/commands/trigger#Syntax")
    })
    
    it("mouse over", () => {
        cy.get("ul.scrollactive-nav").contains("Mouse Events").as("hiddenItem").then($elm => {
            expect($elm).to.be.hidden
        })
        cy.viewport("macbook-16")
        cy.get("@hiddenItem").then($elm => {
            expect($elm).to.be.visible
            expect($elm).to.contain("Mouse Events")
            cy.wrap($elm).trigger("mouseover")
        })
        //cy.get("ul.scrollactive-nav").contains("Mouse Events").parent().next()
        cy.get("@hiddenItem").parent().next().then($elm => {
            expect($elm).to.contain("Change Event")
        })
        .trigger("mouseover")
    })

    it("element gone", () =>{
        cy.get(".nuxt-content-highlight").first().as("divElement")
        cy.viewport("macbook-16")
        cy.get("ul.scrollactive-nav").contains("Mouse Events")//.trigger("mousedown")
        .click()
        cy.get("@divElement").wait(5000).should('not.exist')
    })
    it("Closures", () => {
        cy.get(".nuxt-content-highlight").eq(1).then($elm => {
            //debugger
            const txt = $elm.text()
            cy.log(txt)
            expect(txt).to.deep.equal("cy.get('a').trigger('mousedown') // Trigger mousedown event on link\n")
        })
    })


})


context("local stroge", () => {
    it("fixture", ()=> {
        cy.fixture("my").then($info => {
            cy.log($info.sike)
        })
    })
})


describe('if your app uses jQuery', () => {
    
    beforeEach(() => {
        cy.visit("https://docs.cypress.io/api/commands/trigger#Syntax")
        cy.viewport("macbook-16")
        cy.get("ul.scrollactive-nav").contains("Mouse Events").as("hiddenItem")
        
    })

    ;['mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach((event) => {
      it('triggers event: ' + event, () => {
        // if your app uses jQuery, then we can trigger a jQuery
        // event that causes the event callback to fire
        cy.get('@hiddenItem')
          .invoke('trigger', event)
          
      })
    })

    
  })


describe("parent", ()=> {
    beforeEach(() =>{
        cy.wrap(1).as('a')
    })

    context('child', ()=> {
        beforeEach(() => {
            cy.wrap(2).as('b')
        })

        describe("grandChild", () => {
            beforeEach(() => {
                cy.wrap(3).as('c')
            })
            it("have accese to all aliases", () => {
                //cy.get("@a").then(value => {expect(value).to.eq(1)})
                cy.get('@a').should('to.deep.eq',1)
                cy.get('@b').should('to.deep.eq',2)
                cy.get('@c').should('to.deep.eq',3)
            })
        })
    })

    it("Request", () => {
        cy.request('https://jsonplaceholder.cypress.io/comments').as('comments')

        cy.get('@comments').should((response) => {
            if(response.status === 200){
                expect(response).to.have.property('duration')
                
            }
            else 
            {
                cy.log(response)
            }
        })
    })
})