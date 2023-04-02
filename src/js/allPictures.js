import axios from 'axios';

async function allPictures(query, page, per_page) {
  const params = new URLSearchParams({
    key: '34963526-7ac0071891fccc5e52be44557',
    q: query,
    page: page,
    per_page: per_page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
export default allPictures;
