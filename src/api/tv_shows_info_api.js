import api from '.'
const END_POINT = '/shows'
// Get All Shows
const getListOfTvShows = () => api.get(END_POINT)
// Get Show details
const getShow = showId => api.get(END_POINT + '/' + showId)
// Get Show images
const getTvShowImages = showId => api.get(END_POINT + '/' + showId + '/images')
export {
  getListOfTvShows,
  getShow,
  getTvShowImages
}
