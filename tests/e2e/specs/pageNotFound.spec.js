describe('Test Page Not Found', () => {
  it('Check No Tv Results With Dummy Data On Landing screen', () => {
    cy.visit('http://localhost:8080/dhasaj').then(() => {
      cy.get('div h1.pt-6').then((res) => {
        expect(res[0].innerText).to.contains('Page Not found')
      })
      cy.get('.mt-4.yellow').click()
      cy.url().should('not.include', 'show')
    })
  })
  it('Check No Tv Results With Dummy Data On Details Screen', () => {
    cy.visit('http://localhost:8080/show/123dhasaj').then(() => {
      cy.get('div h1.pt-6').then((res) => {
        expect(res[0].innerText).to.contains('Page Not found')
      })
      cy.get('.mt-4.yellow').click()
      cy.url().should('not.include', 'show')
    })
  })
})
