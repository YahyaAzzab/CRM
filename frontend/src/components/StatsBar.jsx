import { motion } from 'framer-motion';

const ITEMS = [
  { key: 'tous', label: 'Total', colorClass: 'stat-total' },
  { key: 'prospect', label: 'Prospects', colorClass: 'stat-prospect' },
  { key: 'client', label: 'Clients', colorClass: 'stat-client' },
  { key: 'inactif', label: 'Inactifs', colorClass: 'stat-inactif' },
];

export default function StatsBar({ clients, filtreStatut, onFiltre }) {
  const counts = {
    tous: clients.length,
    prospect: clients.filter((c) => c.statut === 'prospect').length,
    client: clients.filter((c) => c.statut === 'client').length,
    inactif: clients.filter((c) => c.statut === 'inactif').length,
  };

  return (
    <div className="stats stats-4">
      {ITEMS.map((item, index) => (
        <motion.button
          key={item.key}
          type="button"
          className={`stat ${item.colorClass} ${filtreStatut === item.key ? 'stat-active' : ''}`}
          onClick={() => onFiltre(item.key)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * index, duration: 0.4 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="stat-label">{item.label}</span>
          <motion.span
            className="stat-value"
            key={`${item.key}-${counts[item.key]}`}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            {counts[item.key]}
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
}
