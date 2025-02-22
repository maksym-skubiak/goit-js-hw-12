import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.createElement('button');

let searchQuery = '';
let page = 1;
const perPage = 40;

loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('load-more');
loadMoreBtn.style.display = 'none';
document.body.appendChild(loadMoreBtn);

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = input.value.trim();
  if (!searchQuery) return;

  page = 1;
  loadMoreBtn.style.display = 'none';
  clearGallery();
  loader.style.display = 'block';

  const { hits, totalHits } = await fetchImages(searchQuery, page, perPage);
  loader.style.display = 'none';

  if (hits.length > 0) {
    renderGallery(hits);
    if (totalHits > perPage) {
      loadMoreBtn.style.display = 'block';
    }
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.style.display = 'block';

  const { hits, totalHits } = await fetchImages(searchQuery, page, perPage);
  loader.style.display = 'none';
  renderGallery(hits);

  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const cardHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  }

  if (page * perPage >= totalHits) {
    loadMoreBtn.style.display = 'none';
    alert("We're sorry, but you've reached the end of search results.");
  }
});
