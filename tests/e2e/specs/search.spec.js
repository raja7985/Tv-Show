describe('Test Show Complete List Component', () => {
  it('Check No Tv Results With Dummy Data', () => {
    cy.visit('http://localhost:8080').then(() => {
      cy.get("button[aria-label='search'] .v-icon").should('exist')
      cy.get("button[aria-label='search'] .v-icon").click()
      cy.get("[type='text']").type('not A Valid Data').wait(3000)
      cy.get('div.v-overlay__content  p').contains('No Tv Shows Found')
    })
  })
  it('Check Tv Results With Data', () => {
    cy.visit('http://localhost:8080').then(() => {
      cy.get("button[aria-label='search'] .v-icon").should('exist')
      cy.get("button[aria-label='search'] .v-icon").click()
      cy.get("[type='text']").type('star').wait(3000)
      cy.get('div.v-overlay__content  p').should('not.exist')
      let id
      cy.get('div.v-overlay__content .show-card a').first().then(dta => {
        id = (dta[0].href).substring((dta[0].href).lastIndexOf('/') + 1, dta[0].href.length)
        cy.get('div.v-overlay__content .show-card').first().click()
        cy.url().should('include', '/show/' + id)
      })
    })
  })
})
