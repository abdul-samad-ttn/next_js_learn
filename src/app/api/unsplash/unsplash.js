import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

const apiRequest = {
  // searchQuery is the string by which user wants to seach any photo
  searchPhotos:(searchQuery) => {
    return unsplash.search.getPhotos({
      query: searchQuery,
      page: 1,
      perPage: 10,
      color: 'green',
      orientation: 'portrait',
    });
  },
  // id is a string type that represent unique id of a photo
  getPhotoById: (id) => {
    return unsplash.photos.get({ photoId: id });
  },
  // options = {page, perPage}
  getPhotosList: (options={}) => { 
    unsplash.photos.list(options);
  }
}

export default apiRequest