import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import ActivityFeed from './components/ActivityFeed';
import EditClientModal from './components/EditClientModal';
import Toast from './components/Toast';
import LoadingGrid from './components/LoadingGrid';
import Splash from './components/Splash';
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from './services/clientService';

function exporterCSV(clients) {
  const headers = ['nom', 'email', 'entreprise', 'telephone', 'statut', 'notes'];
  const lines = [
    headers.join(','),
    ...clients.map((client) =>
      headers
        .map((key) => {
          const value = String(client[key] ?? '').replaceAll('"', '""');
          return `"${value}"`;
        })
        .join(',')
    ),
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `clients-crm-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [clients, setClients] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [filtreStatut, setFiltreStatut] = useState('tous');
  const [tri, setTri] = useState('recent');
  const [busy, setBusy] = useState(false);
  const [editBusy, setEditBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [clientEnEdition, setClientEnEdition] = useState(null);

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

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 2400);
    return () => window.clearTimeout(timer);
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

  async function handleSaveEdit(id, data) {
    setEditBusy(true);
    try {
      const maj = await updateClient(id, data);
      setClients((prev) => prev.map((client) => (client._id === id ? maj : client)));
      setClientEnEdition(null);
      showToast(`${maj.nom} a été modifié`);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setEditBusy(false);
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

  async function handleCopyEmail(email) {
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copié');
    } catch {
      showToast('Impossible de copier l’email', 'error');
    }
  }

  function handleExport() {
    if (clients.length === 0) {
      showToast('Aucun client à exporter', 'error');
      return;
    }
    exporterCSV(clients);
    showToast('Export CSV téléchargé');
  }

  return (
    <>
      <AnimatePresence>{showSplash && <Splash key="splash" />}</AnimatePresence>

      <AnimatePresence>
        {!showSplash && (
          <motion.div
            key="app"
            className="app-shell"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="ambient ambient-a"
              aria-hidden="true"
              animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="ambient ambient-b"
              aria-hidden="true"
              animate={{ x: [0, -14, 0], y: [0, 16, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="app">
              <Header />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.5 }}
              >
                <StatsBar
                  clients={clients}
                  filtreStatut={filtreStatut}
                  onFiltre={setFiltreStatut}
                />
              </motion.div>

              <motion.p
                className="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.45 }}
              >
                {loading
                  ? 'Chargement des contacts…'
                  : `${total} contact${total > 1 ? 's' : ''} · clique une stat pour filtrer · export CSV disponible`}
              </motion.p>

              <motion.div
                className="layout"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="sidebar">
                  <ClientForm onAjouter={handleAjouter} busy={busy} />
                  <ActivityFeed clients={clients} />
                </div>

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
                    tri={tri}
                    onRecherche={setRecherche}
                    onFiltre={setFiltreStatut}
                    onTri={setTri}
                    onStatut={handleStatut}
                    onEdit={setClientEnEdition}
                    onSupprimer={handleSupprimer}
                    onCopyEmail={handleCopyEmail}
                    onExport={handleExport}
                  />
                )}
              </motion.div>
            </div>

            <Toast toast={toast} />

            <AnimatePresence>
              {clientEnEdition && (
                <EditClientModal
                  key={clientEnEdition._id}
                  client={clientEnEdition}
                  busy={editBusy}
                  onClose={() => setClientEnEdition(null)}
                  onSave={handleSaveEdit}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
