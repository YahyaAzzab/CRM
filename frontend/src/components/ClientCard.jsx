import { motion } from 'framer-motion';

const STATUT_LABEL = {
  prospect: 'Prospect',
  client: 'Client',
  inactif: 'Inactif',
};

function formatDate(value) {
  if (!value) return null;
  return new Date(value).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function ClientCard({ client, onStatut, onEdit, onSupprimer, onCopyEmail }) {
  const dateLabel = formatDate(client.updatedAt || client.createdAt);

  return (
    <motion.article
      className="client-card"
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="client-card-top">
        <div>
          <h3>{client.nom}</h3>
          <button
            type="button"
            className="client-email linkish"
            onClick={() => onCopyEmail(client.email)}
            title="Copier l’email"
          >
            {client.email}
          </button>
        </div>
        <span className={`badge badge-${client.statut}`}>{STATUT_LABEL[client.statut]}</span>
      </div>

      <div className="client-meta">
        {client.entreprise ? <span>{client.entreprise}</span> : <span className="muted">Sans entreprise</span>}
        {client.telephone ? <span>{client.telephone}</span> : <span className="muted">Sans téléphone</span>}
        {dateLabel ? <span className="muted">Maj {dateLabel}</span> : null}
      </div>

      {client.notes ? <p className="client-notes">{client.notes}</p> : null}

      <div className="client-actions">
        <label className="statut-select">
          Statut
          <select
            value={client.statut}
            onChange={(event) => onStatut(client._id, event.target.value)}
          >
            <option value="prospect">Prospect</option>
            <option value="client">Client</option>
            <option value="inactif">Inactif</option>
          </select>
        </label>

        <div className="action-row">
          <motion.button
            type="button"
            className="btn btn-secondary"
            onClick={() => onEdit(client)}
            whileTap={{ scale: 0.96 }}
          >
            Modifier
          </motion.button>
          <motion.button
            type="button"
            className="btn btn-ghost"
            onClick={() => onSupprimer(client._id)}
            whileTap={{ scale: 0.96 }}
          >
            Supprimer
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
