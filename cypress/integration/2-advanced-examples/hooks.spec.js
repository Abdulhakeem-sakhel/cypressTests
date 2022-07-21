
describe('Cypress Test Hooks', function() {
    before(function() {
      // runs once before all tests in the it block
      cy.log("I am in before")
   
    })
  
    after(function() {
      // runs once after all tests in the it block
      cy.log("I am in after")
    })
  
    beforeEach(function() {
      // runs before each test in the it block
      cy.log("I am in beforeEach")
    })
  
    afterEach(function() {
      // runs after each test in the it block
      cy.log("I am in afterEach")
    })
  
    it.only('navigates', () => {
      cy.visit('https://apple.com')
      
    })
    
    // split visiting different origin in another test
    it('navigates to new origin', () => {
      cy.visit('https://google.com') // yup all good
    })

    
  })