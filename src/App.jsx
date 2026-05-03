import { useState, useEffect } from 'react'
import DashboardPage from './components/dashboard/DashboardPage'
import { Wallet, Activity, CreditCard, PieChart } from 'lucide-react'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  useEffect(() => {
    console.log('✅ App started! Welcome to FinTrack.')
    console.log('💡 Tip: Click "Add Transaction" to start tracking your finances.')
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Wallet size={32} className="logo-icon" />
            <div className="logo-text">
              <h1 className="logo-title">FinTrack</h1>
              <p className="logo-tagline">Smart Finance Tracking</p>
            </div>
          </div>
          <nav className="header-nav">
            <a
              href="#dashboard"
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              <Activity size={20} />
              Dashboard
            </a>
            <a
              href="#transactions"
              className={`nav-link ${currentPage === 'transactions' ? 'active' : ''}`}
              onClick={() => setCurrentPage('transactions')}
            >
              <CreditCard size={20} />
              Transactions
            </a>
            <a
              href="#reports"
              className={`nav-link ${currentPage === 'reports' ? 'active' : ''}`}
              onClick={() => setCurrentPage('reports')}
            >
              <PieChart size={20} />
              Reports
            </a>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <DashboardPage />
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
          <p>Made with ❤️ for smarter financial management.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
