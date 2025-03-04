import axiosClient from '@/apis/axios-client';

export const getF1Data = async (year: number | string, type: string) => {
  try {
    const response = await axiosClient.get(`/results/${year}/${type}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const crawlF1Data = async () => {
  try {
    const response = await axiosClient.get('/crawl');
    return response.data;
  } catch (error) {
    console.error('Failed to crawl F1 data:', error);
    throw error;
  }
};

export const crawlF1Metadata = async () => {
  try {
    const response = await axiosClient.get('/crawl');
    return response;
  } catch (error) {
    console.error('Failed to crawl F1 data:', error);
    throw error;
  }
};

export const getF1Metadata = async (
  year?: string,
  type?: string,
  grandPrix?: string,
) => {
  try {
    const params: Record<string, string> = {};
    if (year) params.year = year;
    if (type) params.type = type;
    if (grandPrix && grandPrix !== 'All') params.grandPrix = grandPrix;

    const response = await axiosClient.get('/metadata', { params });
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch F1 metadata:', error);
    throw error;
  }
};
