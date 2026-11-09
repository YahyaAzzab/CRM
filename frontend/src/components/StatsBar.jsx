import { motion } from 'framer-motion';

const ITEMS = [
  { key: 'prospect', label: 'Prospects' },
  { key: 'client', label: 'Clients' },
  { key: 'inactif', label: 'Inactifs' },
];

export default function StatsBar({ clients }) {
  const counts = ITEMS.reduce((acc, item) => {
    acc[item.key] = clients.filter((c) => c.statut === item.key).length;
    return acc;
  }, {});

  return (
    <div className="stats">
      {ITEMS.map((item, index) => (
        <motion.div
          key={item.key}
          className={`stat stat-${item.key}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * index, duration: 0.4 }}
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
        </motion.div>
      ))}
    </div>
  );
}
