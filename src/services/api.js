import axios from 'axios';

const API_KEY = 'j713XaXHnJF9r9ixjnk5QzG-iLf8X1L_ZJORo6fNj0g';
const BASE_URL = 'https://api.unsplash.com/search/photos';

export const fetchImages = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: 10,
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });
  return response.data.results;
};
