const API_KEY = '48983342-f944feb478e2b8c4cd8b85956';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 40) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
        query
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    return await response.json();
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching images.',
      position: 'topRight',
    });
    console.error('Error fetching images:', error);
    return { hits: [], totalHits: 0 };
  }
}
