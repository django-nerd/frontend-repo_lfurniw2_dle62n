import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4Tf9WOIaWs6LOezG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-slate-950 pointer-events-none" />
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 md:px-8 flex items-end pb-10">
        <div>
          <span className="inline-block text-xs tracking-widest uppercase text-blue-200/80 mb-3">Automotive • Corporate • Dynamic</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-sm">Location de véhicules — Suite de gestion complète</h1>
          <p className="mt-3 text-blue-100/90 max-w-2xl">Contrats, factures, paiements, chauffeurs et parc auto — tout en un seul endroit. Modèles FR/EN, tarification flexible et export PDF.</p>
        </div>
      </div>
    </section>
  )
}
