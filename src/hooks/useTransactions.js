import { useState, useCallback } from "react";
import api from "../lib/api";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/transactions");
      setTransactions(data?.data || data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (payload) => {
    const { data } = await api.post("/transactions", payload);
    return data;
  };

  const remove = async (id) => {
    await api.delete(`/transactions/${id}`);
  };

  return { transactions, loading, fetch, create, remove };
}