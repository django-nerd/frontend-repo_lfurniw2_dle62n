export default function QuickActions({ onRefresh }) {
  const actions = [
    { label: 'Nouveau Client', href: '#clients' },
    { label: 'Nouveau Véhicule', href: '#vehicules' },
    { label: 'Nouveau Chauffeur', href: '#chauffeurs' },
    { label: 'Nouveau Contrat', href: '#contrats' },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 mt-6">
      <div className="bg-slate-800/60 border border-white/5 rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2 flex-wrap">
            {actions.map((a) => (
              <a key={a.label} href={a.href} className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md">
                {a.label}
              </a>
            ))}
          </div>
          <button onClick={onRefresh} className="text-sm bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md">Rafraîchir</button>
        </div>
      </div>
    </section>
  )
}
