import Notiflix from 'notiflix';
import fetchImages from './js/fetchImages';
import { lightbox } from './js/lightbox';
import './css/style.css';

let page = 1;
let per_page = 40;

const formSearch = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const buttonLoad = document.querySelector('.load-more');

function renderCardImage(images) {
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
        return `<div class="photo-card">
        <a href = "${largeImageURL}">
        <img class="photo-image" src="${webformatURL}" alt="${tags}" loading="lazy" /> 
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${downloads}
          </p>
        </div>
        </div>
      `;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

formSearch.addEventListener('submit', onSearch);
buttonLoad.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';
  const elements = formSearch.elements;
  query = elements.searchQuery.value;

  const response = await fetchImages(query, page, per_page);
  if (!response.hits.length) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    buttonLoad.classList.add('is-hidden');
    return;
  }
  renderCardImage(response.hits);
  buttonLoad.style.display = 'block';
  page += 1;
}

async function onLoadMore() {
  page += 1;
  const response = await fetchImages(query, page, per_page);
  renderCardImage(response.hits);
  lightbox.refresh();
  currentHits += response.hits.length;

  if (currentHits >= response.totalHits) {
    Notiflix.Notify.failure(
      'We are sorry, but you have reached the end of search results.'
    );
    buttonLoad.classList.add('is-hidden');
  }
}
