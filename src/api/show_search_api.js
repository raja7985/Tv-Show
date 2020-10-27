import api from '.'
const END_POINT = '/search/shows?q='
// Get Shows Results
const getTvShowsOnSearch = searchKeyword => api.get(END_POINT + searchKeyword)
export {
  getTvShowsOnSearch
}
