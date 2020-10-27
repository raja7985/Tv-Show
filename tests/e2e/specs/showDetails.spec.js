describe('Test Show Complete List Component', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: '*/api.tvmaze.com/shows'
    }).as('apiCheck')
  })
  it('Check On Click Of Page We See Details Data', () => {
    cy.visit('http://localhost:8080')
    cy.wait('@apiCheck').then((xhr) => {
      const response = xhr.response.body
      response.sort((prevValue, nextValue) => prevValue.rating.average < nextValue.rating.average ? 1 : -1)
      const genres = response.reduce((acc, show) => acc.concat(show.genres), []).filter((genre, index, self) => self.indexOf(genre) === index)
      const showsByGenre = response.filter(show => show.genres && show.genres.some(g => g === genres[0]))
      cy.get('.v-main .col-12 .subtitle-1').first().click().then(() => {
        cy.url().should('include', '/show/' + showsByGenre[0].id)
      })
      cy.get('h1.display-2').should('contain', showsByGenre[0].name);
      (cy.get('p.subtitle-1 span').first()).then((res) => {
        expect(res[0].innerText).to.contain(showsByGenre[0].rating.average)
      })
      cy.get('.home').should('contain', 'Return to Home')
    })
  })
})
