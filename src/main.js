import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import {
  displayImages,
  showLoadingIndicator,
  hideLoadingIndicator,
} from './js/render-functions';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loadMoreBtn = document.querySelector('#load-more');

let currentQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;

const handleSearch = async event => {
  event.preventDefault();

  currentQuery = searchInput.value.trim();
  if (!currentQuery) {
    iziToast.warning({ message: 'Please enter a search term.' });
    return;
  }

  currentPage = 1;
  loadMoreBtn.classList.add('hidden');

  showLoadingIndicator();

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    totalHits = data.totalHits;

    if (totalHits === 0) {
      iziToast.info({ message: 'No images found. Try another keyword!' });
      return;
    }

    displayImages(data.hits);

    if (currentPage * perPage < totalHits) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({ message: `Something went wrong: ${error.message}` });
  } finally {
    hideLoadingIndicator();
  }
};

const handleLoadMore = async () => {
  currentPage++;

  showLoadingIndicator();

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    displayImages(data.hits, true);

    scrollPage();

    if (currentPage * perPage >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({ message: `Something went wrong: ${error.message}` });
  } finally {
    hideLoadingIndicator();
  }
};

const scrollPage = () => {
  const firstCard = document.querySelector('.gallery .photo-card');
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
};

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);
