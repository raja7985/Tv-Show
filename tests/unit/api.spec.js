import moxios from 'moxios'
import api from '@/api'

describe('api.js', () => {
  beforeEach(() => {
    moxios.install(api)
  })
  afterEach(() => {
    moxios.uninstall(api)
  })
  it('should get a good response with 200 OK', done => {
    moxios.stubRequest('https://api.tvmaze.com/shows', {
      status: 200,
      responseText: 'good request :)'
    })
    api
      .get('https://api.tvmaze.com/shows')
      .then(res => expect(res.status).toBe(200))
      .finally(done)
  })

  it('should get a bad response with 404 status', done => {
    moxios.stubRequest('https://api.tvmaze.com/shows', {
      status: 404,
      response: {
        response: {
          status: 404
        }
      }
    })
    api
      .get('https://api.tvmaze.com/shows')
      .catch(error => {
        expect(error.response.status).toBe(404)
      })
      .finally(done)
  })
  it('should get a bad response with 404 status', done => {
    moxios.stubRequest('https://api.tvmaze.com/show/180', {
      status: 404,
      response: {
        response: {
          status: 404
        }
      }
    })
    api
      .get('https://api.tvmaze.com/show/180')
      .catch(error => {
        expect(error.response.status).toBe(404)
      })
      .finally(done)
  })
})
