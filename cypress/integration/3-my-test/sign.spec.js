context("sign up testing ", () => {
    before(() => {
        cy.visit('https://demo.productionready.io/#/register');
    })
    it("fail sign up",() => {
        cy.signingup({ username:'abod', email:'abodsakhel1071@gmail.com',pass:'123456786'})
        .stateSignUp(422)
    })
    it("success sign up", () => {
        cy.signingup({ username:genUser(), email: genEmail(),pass:'123456786'})
        .stateSignUp(200)
    })
})



function genUser() {
    var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var string = '';
    for(var ii=0; ii<19; ii++){
        string += chars[Math.floor(Math.random() * chars.length)];
}
    return string;
}

function genEmail() {
    return genUser()+'@gmail.com'
}