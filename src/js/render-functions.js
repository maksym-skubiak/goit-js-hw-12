import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const fragment = document.createDocumentFragment();

  images.forEach(({ webformatURL, largeImageURL, tags }) => {
    const link = document.createElement('a');
    link.classList.add('gallery-item');
    link.href = largeImageURL;

    const img = document.createElement('img');
    img.src = webformatURL;
    img.alt = tags;
    img.loading = 'lazy';

    link.appendChild(img);
    fragment.appendChild(link);
  });

  gallery.appendChild(fragment);


  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}
