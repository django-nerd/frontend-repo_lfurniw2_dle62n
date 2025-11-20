import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 md:px-8 mt-10">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="bg-slate-800/60 border border-white/5 rounded-xl p-5 text-white">
        {children}
      </div>
    </section>
  )
}

function SimpleForm({ fields, onSubmit, submitLabel='Enregistrer' }) {
  const [form, setForm] = useState({})
  return (
    <form className="grid grid-cols-1 md:grid-cols-3 gap-3" onSubmit={(e)=>{e.preventDefault(); onSubmit(form); setForm({})}}>
      {fields.map(f => (
        <div key={f.name} className="flex flex-col gap-1">
          <label className="text-xs text-slate-300">{f.label}</label>
          {f.type === 'select' ? (
            <select value={form[f.name]||''} onChange={e=>setForm({...form,[f.name]: e.target.value})} className="bg-slate-700 border border-white/10 rounded px-3 py-2">
              <option value="">--</option>
              {f.options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ) : (
            <input type={f.type||'text'} value={form[f.name]||''} onChange={e=>setForm({...form,[f.name]: e.target.value})} placeholder={f.placeholder||''} className="bg-slate-700 border border-white/10 rounded px-3 py-2" />
          )}
        </div>
      ))}
      <div className="md:col-span-3">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">{submitLabel}</button>
      </div>
    </form>
  )
}

function DataTable({ items, cols }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-300">
            {cols.map(c => <th key={c.key} className="py-2 pr-6">{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it._id} className="border-t border-white/5">
              {cols.map(c => <td key={c.key} className="py-2 pr-6">{c.render? c.render(it[c.key], it) : (it[c.key] ?? '-') }</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Entities() {
  const [clients, setClients] = useState([])
  const [vehicules, setVehicules] = useState([])
  const [chauffeurs, setChauffeurs] = useState([])
  const [contrats, setContrats] = useState([])

  const fetchAll = async () => {
    const [c,v,ch,co] = await Promise.all([
      fetch(`${API}/clients`).then(r=>r.json()),
      fetch(`${API}/vehicules`).then(r=>r.json()),
      fetch(`${API}/chauffeurs`).then(r=>r.json()),
      fetch(`${API}/contrats`).then(r=>r.json()),
    ])
    setClients(c); setVehicules(v); setChauffeurs(ch); setContrats(co)
  }

  useEffect(()=>{ fetchAll() }, [])

  const post = async (path, body) => {
    await fetch(`${API}${path}`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
    await fetchAll()
  }

  return (
    <>
      <Section id="clients" title="Clients">
        <SimpleForm
          fields={[
            { name:'nom', label:'Nom' },
            { name:'adresse', label:'Adresse' },
            { name:'telephone', label:'Téléphone' },
            { name:'email', label:'Email', type:'email' },
            { name:'langue', label:'Langue', type:'select', options:[{value:'FR', label:'FR'},{value:'EN', label:'EN'}] },
          ]}
          onSubmit={(data)=> post('/clients', data)}
        />
        <div className="mt-4">
          <DataTable
            items={clients}
            cols={[
              { key:'nom', label:'Nom' },
              { key:'telephone', label:'Téléphone' },
              { key:'email', label:'Email' },
              { key:'langue', label:'Langue' },
            ]}
          />
        </div>
      </Section>

      <Section id="vehicules" title="Véhicules">
        <SimpleForm
          fields={[
            { name:'marque', label:'Marque' },
            { name:'modele', label:'Modèle' },
            { name:'immatricule', label:'Immatriculation' },
            { name:'categorie', label:'Catégorie' },
            { name:'tarifJour', label:'Tarif Jour', type:'number' },
            { name:'statut', label:'Statut', type:'select', options:[
              { value:'disponible', label:'Disponible' },
              { value:'en_location', label:'En location' },
              { value:'maintenance', label:'Maintenance' },
            ] },
          ]}
          onSubmit={(data)=> post('/vehicules', { ...data, tarifJour: parseFloat(data.tarifJour||0) })}
        />
        <div className="mt-4">
          <DataTable items={vehicules} cols={[
            { key:'marque', label:'Marque' },
            { key:'modele', label:'Modèle' },
            { key:'immatricule', label:'Immatriculation' },
            { key:'tarifJour', label:'Tarif/Jour' },
            { key:'statut', label:'Statut' },
          ]} />
        </div>
      </Section>

      <Section id="chauffeurs" title="Chauffeurs">
        <SimpleForm
          fields={[
            { name:'nom', label:'Nom' },
            { name:'telephone', label:'Téléphone' },
            { name:'permis', label:'Permis' },
            { name:'adresse', label:'Adresse' },
            { name:'disponibilite', label:'Disponibilité', type:'select', options:[
              { value:'disponible', label:'Disponible' },
              { value:'en_mission', label:'En mission' },
              { value:'repos', label:'Repos' },
            ] },
            { name:'tarifJour', label:'Tarif Jour', type:'number' },
            { name:'commission', label:'Commission', type:'number' },
          ]}
          onSubmit={(data)=> post('/chauffeurs', { ...data, tarifJour: data.tarifJour? parseFloat(data.tarifJour): undefined, commission: data.commission? parseFloat(data.commission): undefined })}
        />
        <div className="mt-4">
          <DataTable items={chauffeurs} cols={[
            { key:'nom', label:'Nom' },
            { key:'telephone', label:'Téléphone' },
            { key:'disponibilite', label:'Disponibilité' },
            { key:'tarifJour', label:'Tarif/Jour' },
            { key:'commission', label:'Commission' },
          ]} />
        </div>
      </Section>

      <Section id="contrats" title="Contrats de location">
        <SimpleForm
          fields={[
            { name:'clientId', label:'Client ID' },
            { name:'vehiculeId', label:'Véhicule ID' },
            { name:'chauffeurId', label:'Chauffeur ID (optionnel)' },
            { name:'typeDeplacement', label:'Type déplacement', type:'select', options:[{value:'ville',label:'Ville'},{value:'hors_ville',label:'Hors-ville'}] },
            { name:'tarifDeplacement', label:'Tarif déplacement', type:'number' },
            { name:'dateDebut', label:'Date début', type:'date' },
            { name:'dateFin', label:'Date fin', type:'date' },
            { name:'tarifLocation', label:'Tarif location (jour)', type:'number' },
            { name:'statut', label:'Statut', type:'select', options:[{value:'brouillon',label:'Brouillon'},{value:'actif',label:'Actif'},{value:'termine',label:'Terminé'}] },
          ]}
          onSubmit={(d)=> post('/contrats', {
            ...d,
            tarifDeplacement: parseFloat(d.tarifDeplacement||0),
            tarifLocation: parseFloat(d.tarifLocation||0),
            montantTotal: 0,
          })}
        />
        <div className="mt-4">
          <DataTable items={contrats} cols={[
            { key:'clientId', label:'Client' },
            { key:'vehiculeId', label:'Véhicule' },
            { key:'chauffeurId', label:'Chauffeur' },
            { key:'typeDeplacement', label:'Déplacement' },
            { key:'dateDebut', label:'Début' },
            { key:'dateFin', label:'Fin' },
            { key:'montantTotal', label:'Total' },
            { key:'statut', label:'Statut' },
          ]} />
        </div>
      </Section>
    </>
  )
}
