import { motion } from 'framer-motion';

const STATUT_LABEL = {
  prospect: 'Prospect',
  client: 'Client',
  inactif: 'Inactif',
};

function formatDate(value) {
  if (!value) return 'Date inconnue';
  return new Date(value).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ActivityFeed({ clients }) {
  const recent = [...clients]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 5);

  return (
    <motion.section
      className="panel activity-panel"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="panel-head">
        <h2>Activité récente</h2>
        <p>Dernières mises à jour de ton portefeuille.</p>
      </div>

      {recent.length === 0 ? (
        <p className="muted">Aucune activité pour le moment.</p>
      ) : (
        <ul className="activity-list">
          {recent.map((client, index) => (
            <motion.li
              key={client._id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div>
                <strong>{client.nom}</strong>
                <span className={`badge badge-${client.statut}`}>{STATUT_LABEL[client.statut]}</span>
              </div>
              <small>{formatDate(client.updatedAt || client.createdAt)}</small>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}
