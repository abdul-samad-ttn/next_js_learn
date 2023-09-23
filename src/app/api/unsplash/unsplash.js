import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
});

const unsplashApiRequest = {
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
    return unsplash.photos.list(options); 
  }
}

export default unsplashApiRequest