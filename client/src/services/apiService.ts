import axios from 'axios';

const API_BASE_URL = 'http://localhost';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadFile = async (file: File) => {
  const body = new FormData();
  body.append("csv_file", file);
  const response = await apiService.post('/', body, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response;
};

export const getBankSlip = async (page = 0, limit = 20) => {
    const response = await apiService.get('/', {
      params: {
        page,
        limit
      }
    });
    return response.data;
};