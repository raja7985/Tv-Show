describe('Test Show Complete List Component', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: '*/api.tvmaze.com/shows'
    }).as('apiCheck')
  })
  it('Check If All the components are Displayed or not', () => {
    cy.visit('http://localhost:8080').then(() => {
      cy.get('h2.popular-list').contains('Most Watched Shows')
      cy.get('.show-listing .v-carousel').its('length').should('be.gt', 0)
    })
  })
  it('Check We get Data When The page loads and on Click We travel to the Correct Page', () => {
    cy.visit('http://localhost:8080')
    cy.wait('@apiCheck').then((xhr) => {
      const response = xhr.response.body
      const tvshows = response.sort((prevValue, nextValue) => prevValue.rating.average < nextValue.rating.average ? 1 : -1)
      const genres = response.reduce((acc, show) => acc.concat(show.genres), []).filter((genre, index, self) => self.indexOf(genre) === index)
      const showsByGenre = response.filter(show => show.genres && show.genres.some(g => g === genres[0]))

      expect(response.length).to.be.greaterThan(0)
      cy.get('.topsection-wrapper .title-section .display-2').contains(tvshows[0].name)
      cy.get('.v-main .col-12 >.display-1').first().then(res => {
        expect(res[0].innerText).to.include(genres[0])
        expect((showsByGenre[0].genres).toString()).to.include(genres[0])
      })
      cy.get('.v-main .col-12 .subtitle-1').first().then(res => {
        expect(res[0].innerText).to.include(showsByGenre[0].name)
      })
      cy.get('.v-main .col-12 .subtitle-1').first().click().then(() => {
        cy.url().should('include', '/show/' + showsByGenre[0].id)
      })
    })
  })
})
