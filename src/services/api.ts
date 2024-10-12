import axios from 'axios';

interface ImageResult {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface ApiResponse {
  results: ImageResult[];
}

const API_KEY = 'j713XaXHnJF9r9ixjnk5QzG-iLf8X1L_ZJORo6fNj0g';
const BASE_URL = 'https://api.unsplash.com/search/photos';

export const fetchImages = async (
  query: string,
  page: number
): Promise<ImageResult[]> => {
  const response = await axios.get<ApiResponse>(BASE_URL, {
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
