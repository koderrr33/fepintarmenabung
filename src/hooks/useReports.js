import { useState, useCallback } from "react";
import api from "../lib/api";

export function useReports() {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [incRes, expRes] = await Promise.all([
        api.get("/reports/summary-by-category/income"),
        api.get("/reports/summary-by-category/expense"),
      ]);
      setIncome(incRes.data?.data || incRes.data || []);
      setExpense(expRes.data?.data || expRes.data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const totalIncome = income.reduce((s, i) => s + parseFloat(i.total || 0), 0);
  const totalExpense = expense.reduce((s, i) => s + parseFloat(i.total || 0), 0);

  return { income, expense, totalIncome, totalExpense, loading, fetch };
}