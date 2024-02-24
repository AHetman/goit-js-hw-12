import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
// import 'dotenv/config';

export async function searchImages(userValue, currentPage) {
  const API_KEY = '42361876-39dc0f6de1023fb2a8c585c35';
  // const API_KEY = process.env.API_KEY;
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const url = `${BASE_URL}${END_POINT}`;
  const params = {
    key: API_KEY,
    q: userValue,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 15,
    page: currentPage,
    safesearch: true,
  };
  try {
    const result = await axios.get(url, { params });
    if (result.data.hits.length === 0) {
      iziToast.show({
        position: 'topRight',
        messageColor: 'white',
        progressBar: false,
        backgroundColor: 'red',
        closeOnClick: true,
        close: false,
        message:
          '😭 Sorry, there are no images matching youre search query. Please, try again!',
      });
    }
    return result.data;
  } catch (error) {
    throw error;
  }
}
