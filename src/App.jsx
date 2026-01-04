import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './components/Dashboard';
import TransfersPage from './components/Transfers';
import HistoryPage from './components/History';

export default function App() {
  // State is still kept here (The "Source of Truth")
  const [balance, setBalance] = useState(42850.12);
  const [transactions, setTransactions] = useState([...]);

  return (
    <Router>
      <div className="flex h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="p-10 overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashboardPage balance={balance} />} />
              <Route path="/transfers" element={<TransfersPage onTransfer={handleTransfer} />} />
              <Route path="/history" element={<HistoryPage transactions={transactions} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}