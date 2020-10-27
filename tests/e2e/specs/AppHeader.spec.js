describe('Test App Header Component', () => {
  it('Check If All the components are Displayed or not', () => {
    cy.visit('http://localhost:8080').then(() => {
      cy.get('div .logo_txt').contains('TV Shows')
      cy.get("button[aria-label='search'] .v-icon").should('exist')
    })
  })
})
