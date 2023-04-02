import Notiflix from 'notiflix';
import allPictures from './js/allPictures';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/style.css';
let page = 1;
let per_page = 40;

const form = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const button = document.querySelector('.load-more');

let query = null;

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

function renderImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href = "${largeImageURL}" class="photo-card">
        <img class="photo-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
          </p>
        </div>
        </a>
      `;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

const handleSubmit = async e => {
  e.preventDefault();
  page = 1;
  button.style.display = 'none';
  galleryEl.innerHTML = '';
  const elements = form.elements;
  query = elements.searchQuery.value;
  const images = await allPictures(query, page, per_page);
  if (images.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return false;
  }
  renderImages(images.hits);
  button.style.display = 'block';
  page = page + 1;
};

const handleClick = async e => {
  button.style.display = 'none';
  const images = await allPictures('cat', 1, 10);
  renderImages(images.hits);
  button.style.display = 'block';
  page = page + 1;
  if ((page - 1) * per_page >= images.totalHits) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    button.style.display = 'none';
  }
};
form.addEventListener('submit', handleSubmit);
button.addEventListener('click', handleClick);
