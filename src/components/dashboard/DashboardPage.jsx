import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { formatCurrency, getCategoryIcon, formatDate } from '@/lib/utils'
import { api } from '@/lib/api'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { EmptyState } from '@/components/ui/EmptyState'
import { Plus, ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, Calendar, Search } from 'lucide-react'

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    category: 'expense',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await api.getTransactions()
      setTransactions(data)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const addTransaction = async (e) => {
    e.preventDefault()
    try {
      await api.createTransaction({
        ...formData,
        amount: parseFloat(formData.amount)
      })
      await fetchTransactions()
      setShowAddModal(false)
      setFormData({
        type: 'income',
        amount: '',
        category: 'expense',
        description: '',
        date: new Date().toISOString().split('T')[0]
      })
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const stats = {
    totalIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    totalExpense: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    balance: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) -
             transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    transactions: transactions.length
  }

  const filteredTransactions = transactions
    .filter(t => {
      const matchesType = filter === 'all' || t.type === filter
      const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) ||
                           t.category.toLowerCase().includes(search.toLowerCase())
      return matchesType && matchesSearch
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const categories = ['food', 'transport', 'utilities', 'entertainment', 'health', 'shopping', 'salary', 'investment', 'other']

  return (
    <div className="dashboard-container">
      <div className="stats-grid">
        <Card className="stat-card">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="stat-icon income-icon">
              <ArrowUpRight size={24} />
            </div>
            <div className="stat-value">
              <span className="stat-label">Total Income</span>
              <div className="stat-number">{formatCurrency(stats.totalIncome)}</div>
            </div>
          </motion.div>
        </Card>

        <Card className="stat-card">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="stat-icon expense-icon">
              <ArrowDownRight size={24} />
            </div>
            <div className="stat-value">
              <span className="stat-label">Total Expenses</span>
              <div className="stat-number">{formatCurrency(stats.totalExpense)}</div>
            </div>
          </motion.div>
        </Card>

        <Card className="stat-card balance-card">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="stat-icon balance-icon">
              <Wallet size={24} />
            </div>
            <div className="stat-value">
              <span className="stat-label">Total Balance</span>
              <div className={`stat-number ${stats.balance >= 0 ? 'positive' : 'negative'}`}>
                {formatCurrency(stats.balance)}
              </div>
            </div>
          </motion.div>
        </Card>

        <Card className="stat-card">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-value">
              <span className="stat-label">Transactions</span>
              <div className="stat-number">{stats.transactions}</div>
            </div>
          </motion.div>
        </Card>
      </div>

      <div className="main-content">
        <div className="content-header">
          <h1>Transactions</h1>
          <div className="header-actions">
            <div className="search-container">
              <Search size={18} className="search-icon" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <Button onClick={() => setShowAddModal(true)} className="primary-btn">
              <Plus size={18} />
              Add Transaction
            </Button>
          </div>
        </div>

        <div className="transactions-section">
          <div className="section-header">
            <h2>Recent Transactions</h2>
            <div className="filter-buttons">
              <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>
                All
              </Button>
              <Button variant={filter === 'income' ? 'primary' : 'secondary'} onClick={() => setFilter('income')}>
                Income
              </Button>
              <Button variant={filter === 'expense' ? 'primary' : 'secondary'} onClick={() => setFilter('expense')}>
                Expenses
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading transactions...</p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <EmptyState
              icon={<TrendingUp size={48} />}
              title="No transactions found"
              message="Get started by adding your first transaction"
            />
          ) : (
            <div className="transaction-list">
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="transaction-item"
                >
                  <div className="transaction-icon">
                    <div className={`transaction-badge ${transaction.type}`}>
                      {getCategoryIcon(transaction.category)}
                    </div>
                  </div>
                  <div className="transaction-content">
                    <div className="transaction-header">
                      <h3 className="transaction-title">{transaction.description}</h3>
                      <span className={`transaction-amount ${transaction.type}`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                    <div className="transaction-details">
                      <span className="transaction-category">{transaction.category}</span>
                      <span className="transaction-date">
                        <Calendar size={14} />
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Add Transaction</h2>
              <button className="close-modal" onClick={() => setShowAddModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={addTransaction} className="modal-form">
              <div className="form-group">
                <label>Type</label>
                <div className="type-selector">
                  <button
                    type="button"
                    className={formData.type === 'income' ? 'type-btn selected income-type' : 'type-btn'}
                    onClick={() => setFormData({ ...formData, type: 'income' })}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    className={formData.type === 'expense' ? 'type-btn selected expense-type' : 'type-btn'}
                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                  >
                    Expense
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Amount</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  className="category-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <Input
                  type="text"
                  placeholder="What was this transaction for?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="modal-footer">
                <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="primary-btn">
                  Add Transaction
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default DashboardPage