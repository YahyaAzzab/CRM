import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import Toast from './components/Toast';
import LoadingGrid from './components/LoadingGrid';
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from './services/clientService';

export default function App() {
  const [clients, setClients] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [filtreStatut, setFiltreStatut] = useState('tous');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const total = useMemo(() => clients.length, [clients]);

  function showToast(message, type = 'ok') {
    const id = Date.now();
    setToast({ id, message, type });
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3000);
  }

  async function chargerClients() {
    setLoading(true);
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    chargerClients();
  }, []);

  async function handleAjouter(data) {
    setBusy(true);
    try {
      const cree = await createClient(data);
      setClients((prev) => [cree, ...prev]);
      showToast(`${cree.nom} a été ajouté`);
      return true;
    } catch (error) {
      showToast(error.message, 'error');
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function handleStatut(id, statut) {
    const precedent = clients.find((client) => client._id === id);
    setClients((prev) =>
      prev.map((client) => (client._id === id ? { ...client, statut } : client))
    );

    try {
      const maj = await updateClient(id, { statut });
      setClients((prev) => prev.map((client) => (client._id === id ? maj : client)));
      showToast('Statut mis à jour');
    } catch (error) {
      if (precedent) {
        setClients((prev) =>
          prev.map((client) => (client._id === id ? precedent : client))
        );
      }
      showToast(error.message, 'error');
    }
  }

  async function handleSupprimer(id) {
    const cible = clients.find((client) => client._id === id);
    if (!cible) return;
    if (!window.confirm(`Supprimer ${cible.nom} ?`)) return;

    const snapshot = clients;
    setClients((prev) => prev.filter((client) => client._id !== id));

    try {
      await deleteClient(id);
      showToast(`${cible.nom} a été supprimé`);
    } catch (error) {
      setClients(snapshot);
      showToast(error.message, 'error');
    }
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <div className="app">
        <Header />
        <StatsBar clients={clients} />

        <p className="intro">
          {loading
            ? 'Chargement des contacts…'
            : `${total} contact${total > 1 ? 's' : ''} synchronisé${total > 1 ? 's' : ''} avec l’API.`}
        </p>

        <div className="layout">
          <ClientForm onAjouter={handleAjouter} busy={busy} />

          {loading ? (
            <section className="panel list-panel">
              <div className="panel-head">
                <h2>Contacts</h2>
                <p>Récupération depuis MongoDB…</p>
              </div>
              <LoadingGrid />
            </section>
          ) : (
            <ClientList
              clients={clients}
              recherche={recherche}
              filtreStatut={filtreStatut}
              onRecherche={setRecherche}
              onFiltre={setFiltreStatut}
              onStatut={handleStatut}
              onSupprimer={handleSupprimer}
            />
          )}
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
}
