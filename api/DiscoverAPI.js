import makeRequest from './makeRequest';

const DiscoverAPI = {
  getCategories: () => {
    return makeRequest('categories', 'categories');
  },
  getFeaturedPlaylists: () => {
    return makeRequest('featured-playlists', 'playlists');
  },
  getNewReleases: () =>  {
    return makeRequest('new-releases', 'albums');
  }
}
export { DiscoverAPI };