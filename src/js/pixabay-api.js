import axios from 'axios';

const API_KEY = '48983342-f944feb478e2b8c4cd8b85956';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (searchQuery, page = 1, perPage = 40) => {
  if (!searchQuery.trim()) {
    throw new Error('Search query cannot be empty.');
  }

  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching images:', error.message);
    throw error;
  }
};
