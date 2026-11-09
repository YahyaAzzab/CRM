import { AnimatePresence, motion } from 'framer-motion';
import ClientCard from './ClientCard';

export default function ClientList({ clients, recherche, filtreStatut, onRecherche, onFiltre, onStatut, onSupprimer }) {
  const terme = recherche.trim().toLowerCase();

  const filtrés = clients.filter((client) => {
    const matchTexte =
      !terme ||
      client.nom.toLowerCase().includes(terme) ||
      client.email.toLowerCase().includes(terme) ||
      (client.entreprise || '').toLowerCase().includes(terme);

    const matchStatut = filtreStatut === 'tous' || client.statut === filtreStatut;
    return matchTexte && matchStatut;
  });

  return (
    <motion.section
      className="panel list-panel"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="panel-head">
        <h2>Contacts</h2>
        <p>{filtrés.length} résultat{filtrés.length > 1 ? 's' : ''}</p>
      </div>

      <div className="filters">
        <input
          className="search"
          type="search"
          value={recherche}
          onChange={(event) => onRecherche(event.target.value)}
          placeholder="Rechercher par nom, email…"
          aria-label="Rechercher un client"
        />
        <select
          value={filtreStatut}
          onChange={(event) => onFiltre(event.target.value)}
          aria-label="Filtrer par statut"
        >
          <option value="tous">Tous les statuts</option>
          <option value="prospect">Prospects</option>
          <option value="client">Clients</option>
          <option value="inactif">Inactifs</option>
        </select>
      </div>

      <div className="client-grid">
        <AnimatePresence mode="popLayout">
          {filtrés.map((client) => (
            <ClientCard
              key={client._id}
              client={client}
              onStatut={onStatut}
              onSupprimer={onSupprimer}
            />
          ))}
        </AnimatePresence>
      </div>

      {filtrés.length === 0 && (
        <motion.div
          className="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>Aucun contact ne correspond à ta recherche.</p>
        </motion.div>
      )}
    </motion.section>
  );
}
