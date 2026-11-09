import { AnimatePresence, motion } from 'framer-motion';
import ClientCard from './ClientCard';

function trierClients(clients, tri) {
  const copie = [...clients];

  switch (tri) {
    case 'nom':
      return copie.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
    case 'ancien':
      return copie.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      );
    case 'statut':
      return copie.sort((a, b) => a.statut.localeCompare(b.statut, 'fr'));
    case 'recent':
    default:
      return copie.sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt || 0) -
          new Date(a.updatedAt || a.createdAt || 0)
      );
  }
}

export default function ClientList({
  clients,
  recherche,
  filtreStatut,
  tri,
  onRecherche,
  onFiltre,
  onTri,
  onStatut,
  onEdit,
  onSupprimer,
  onCopyEmail,
  onExport,
}) {
  const terme = recherche.trim().toLowerCase();

  const filtrés = trierClients(
    clients.filter((client) => {
      const matchTexte =
        !terme ||
        client.nom.toLowerCase().includes(terme) ||
        client.email.toLowerCase().includes(terme) ||
        (client.entreprise || '').toLowerCase().includes(terme) ||
        (client.telephone || '').toLowerCase().includes(terme);

      const matchStatut = filtreStatut === 'tous' || client.statut === filtreStatut;
      return matchTexte && matchStatut;
    }),
    tri
  );

  return (
    <motion.section
      className="panel list-panel"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="panel-head panel-head-row">
        <div>
          <h2>Contacts</h2>
          <p>
            {filtrés.length} résultat{filtrés.length > 1 ? 's' : ''}
          </p>
        </div>
        <button type="button" className="btn btn-secondary btn-compact" onClick={onExport}>
          Export CSV
        </button>
      </div>

      <div className="filters filters-3">
        <input
          className="search"
          type="search"
          value={recherche}
          onChange={(event) => onRecherche(event.target.value)}
          placeholder="Rechercher nom, email, tél…"
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
        <select value={tri} onChange={(event) => onTri(event.target.value)} aria-label="Trier">
          <option value="recent">Plus récents</option>
          <option value="ancien">Plus anciens</option>
          <option value="nom">Nom A → Z</option>
          <option value="statut">Par statut</option>
        </select>
      </div>

      <div className="client-grid">
        <AnimatePresence mode="popLayout">
          {filtrés.map((client) => (
            <ClientCard
              key={client._id}
              client={client}
              onStatut={onStatut}
              onEdit={onEdit}
              onSupprimer={onSupprimer}
              onCopyEmail={onCopyEmail}
            />
          ))}
        </AnimatePresence>
      </div>

      {filtrés.length === 0 && (
        <motion.div className="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>Aucun contact trouvé</h3>
          <p>Ajoute un client à gauche, ou élargis ta recherche / ton filtre.</p>
        </motion.div>
      )}
    </motion.section>
  );
}
