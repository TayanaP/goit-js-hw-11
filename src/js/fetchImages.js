import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '34963526-7ac0071891fccc5e52be44557';

export default async function fetchImages(query, page, per_page) {
  const options = new URLSearchParams({
    key: KEY,
    q: query,
    page: page,
    per_page: per_page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  try {
    const response = await axios.get(`${URL}?${options}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
