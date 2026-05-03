import axios from "axios";

export const BASE_URL = "/api";

const apiClient = axios.create({ baseURL: BASE_URL });

apiClient.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

export const api = {
  getTransactions: async () => {
    const { data } = await apiClient.get('/transactions');
    return data;
  },

  getTransactionById: async (id) => {
    const { data } = await apiClient.get(`/transactions/${id}`);
    return data;
  },

  createTransaction: async (transaction) => {
    const { data } = await apiClient.post('/transactions', transaction);
    return data;
  },

  updateTransaction: async (id, transaction) => {
    const { data } = await apiClient.put(`/transactions/${id}`, transaction);
    return data;
  },

  deleteTransaction: async (id) => {
    const { data } = await apiClient.delete(`/transactions/${id}`);
    return data;
  },

  getTransactionCategories: async () => {
    const { data } = await apiClient.get('/categories');
    return data;
  },

  getSummary: async () => {
    const { data } = await apiClient.get('/summary');
    return data;
  },

  getTransactionsByDateRange: async (startDate, endDate) => {
    const { data } = await apiClient.get('/transactions', {
      params: { startDate, endDate }
    });
    return data;
  },
  
  searchTransactions: async (query) => {
    const { data } = await apiClient.get('/transactions', {
      params: { search: query }
    });
    return data;
  }
};

export default apiClient;
