import { motion } from 'framer-motion';

export default function LoadingGrid() {
  return (
    <div className="client-grid" aria-busy="true" aria-label="Chargement des clients">
      {[0, 1, 2].map((item) => (
        <motion.div
          key={item}
          className="skeleton-card"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: item * 0.15 }}
        />
      ))}
    </div>
  );
}
