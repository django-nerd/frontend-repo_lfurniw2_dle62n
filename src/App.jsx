import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import DashboardCards from './components/DashboardCards'
import QuickActions from './components/QuickActions'
import Entities from './components/Entities'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [dash, setDash] = useState({ revenueByMonth:{}, unpaidInvoices:0, occupancyRate:0, revenueByVehicle:{}, revenueByClient:{} })
  const refresh = async () => {
    try {
      const r = await fetch(`${API}/reports/dashboard`)
      const j = await r.json()
      setDash(j)
    } catch (e) { console.error(e) }
  }
  useEffect(()=>{ refresh() }, [])

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <DashboardCards data={dash} />
      <QuickActions onRefresh={refresh} />
      <Entities />
      <footer className="max-w-6xl mx-auto px-6 md:px-8 py-10 text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Gestion de location — FR/EN, contrats, factures, paiements et rapports.</p>
      </footer>
    </div>
  )
}

export default App
