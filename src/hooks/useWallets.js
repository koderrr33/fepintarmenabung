import { useState, useCallback } from "react";
import api from "../lib/api";

export function useWallets() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/wallets");
      setWallets(data?.data || data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (payload) => {
    const { data } = await api.post("/wallets", payload);
    return data;
  };

  const update = async (id, payload) => {
    const { data } = await api.put(`/wallets/${id}`, payload);
    return data;
  };

  const remove = async (id) => {
    await api.delete(`/wallets/${id}`);
  };

  return { wallets, loading, fetch, create, update, remove };
}