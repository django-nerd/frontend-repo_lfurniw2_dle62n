export default function DashboardCards({ data }) {
  const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(n || 0)
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 -mt-16 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/60 border border-white/5 rounded-xl p-5 text-white">
          <p className="text-slate-300 text-sm">Revenu ce mois</p>
          <p className="text-2xl font-semibold mt-2">{fmt(Object.values(data.revenueByMonth||{}).slice(-1)[0] || 0)}</p>
        </div>
        <div className="bg-slate-800/60 border border-white/5 rounded-xl p-5 text-white">
          <p className="text-slate-300 text-sm">Factures impayées</p>
          <p className="text-2xl font-semibold mt-2">{data.unpaidInvoices ?? 0}</p>
        </div>
        <div className="bg-slate-800/60 border border-white/5 rounded-xl p-5 text-white">
          <p className="text-slate-300 text-sm">Taux d’occupation</p>
          <p className="text-2xl font-semibold mt-2">{data.occupancyRate ?? 0}%</p>
        </div>
        <div className="bg-slate-800/60 border border-white/5 rounded-xl p-5 text-white">
          <p className="text-slate-300 text-sm">Véhicules suivis</p>
          <p className="text-2xl font-semibold mt-2">{Object.keys(data.revenueByVehicle||{}).length}</p>
        </div>
      </div>
    </section>
  )
}
