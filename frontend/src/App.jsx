import { useMemo, useState } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import Toast from './components/Toast';
import { MOCK_CLIENTS } from './data/mockClients';

function creerId() {
  return `mock-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export default function App() {
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [recherche, setRecherche] = useState('');
  const [filtreStatut, setFiltreStatut] = useState('tous');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  const total = useMemo(() => clients.length, [clients]);

  function showToast(message, type = 'ok') {
    const id = Date.now();
    setToast({ id, message, type });
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2800);
  }

  async function handleAjouter(data) {
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 220));

    const emailPris = clients.some(
      (client) => client.email.toLowerCase() === data.email.toLowerCase()
    );

    if (emailPris) {
      showToast('Un client avec cet email existe déjà', 'error');
      setBusy(false);
      return false;
    }

    const nouveau = {
      ...data,
      _id: creerId(),
      createdAt: new Date().toISOString(),
    };

    setClients((prev) => [nouveau, ...prev]);
    showToast(`${data.nom} a été ajouté`);
    setBusy(false);
    return true;
  }

  async function handleStatut(id, statut) {
    setClients((prev) =>
      prev.map((client) => (client._id === id ? { ...client, statut } : client))
    );
    showToast('Statut mis à jour');
  }

  async function handleSupprimer(id) {
    const cible = clients.find((client) => client._id === id);
    if (!cible) return;
    if (!window.confirm(`Supprimer ${cible.nom} ?`)) return;

    setClients((prev) => prev.filter((client) => client._id !== id));
    showToast(`${cible.nom} a été supprimé`);
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <div className="app">
        <Header />
        <StatsBar clients={clients} />

        <p className="intro">
          {total} contact{total > 1 ? 's' : ''} en portefeuille — mode démo locale (étape 4).
        </p>

        <div className="layout">
          <ClientForm onAjouter={handleAjouter} busy={busy} />
          <ClientList
            clients={clients}
            recherche={recherche}
            filtreStatut={filtreStatut}
            onRecherche={setRecherche}
            onFiltre={setFiltreStatut}
            onStatut={handleStatut}
            onSupprimer={handleSupprimer}
          />
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
}
