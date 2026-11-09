import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import Toast from './components/Toast';
import LoadingGrid from './components/LoadingGrid';
import Splash from './components/Splash';
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from './services/clientService';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
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
                <StatsBar clients={clients} />
              </motion.div>

              <motion.p
                className="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.45 }}
              >
                {loading
                  ? 'Chargement des contacts…'
                  : `${total} contact${total > 1 ? 's' : ''} synchronisé${total > 1 ? 's' : ''} avec l’API.`}
              </motion.p>

              <motion.div
                className="layout"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
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
              </motion.div>
            </div>

            <Toast toast={toast} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
