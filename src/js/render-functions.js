import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const displayImages = (images, append = false) => {
  const gallery = document.querySelector('.gallery');

  if (!append) {
    gallery.innerHTML = '';
  }

  if (!images || images.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  const imageElements = images.map(createImageCard);
  gallery.append(...imageElements);

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};

const createImageCard = image => {
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const link = document.createElement('a');
  link.href = image.largeImageURL;

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;

  const info = document.createElement('div');
  info.classList.add('info');

  const likes = createInfoElement('Likes', image.likes);
  const views = createInfoElement('Views', image.views);
  const comments = createInfoElement('Comments', image.comments);
  const downloads = createInfoElement('Downloads', image.downloads);

  info.append(likes, views, comments, downloads);
  link.appendChild(img);
  card.append(link, info);

  return card;
};

const createInfoElement = (label, value) => {
  const p = document.createElement('p');
  p.innerHTML = `<b>${label}:</b> ${value}`;
  return p;
};

export const showLoadingIndicator = () => {
  const loader = document.querySelector('.loader');
  loader.textContent = 'Loading...';
  loader.classList.add('visible');
};

export const hideLoadingIndicator = () => {
  const loader = document.querySelector('.loader');
  loader.classList.remove('visible');
};

export const showErrorNotification = error => {
  iziToast.error({
    title: 'Error',
    message: `Something went wrong: ${error.message}`,
  });
};
