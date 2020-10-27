describe('Test App Footer Component', () => {
  it('Check If All the components are Displayed or not', () => {
    cy.visit('http://localhost:8080').then(() => {
      cy.get('div > footer  strong').then((res) => {
        expect(res[0].innerText).to.contain('All Tv Shows')
      })
    })
  })
})
