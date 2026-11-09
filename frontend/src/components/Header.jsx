import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="brand">
        <span className="brand-mark" aria-hidden="true" />
        <div>
          <p className="brand-name">Mon CRM</p>
          <p className="brand-tag">Relation client, claire et rapide</p>
        </div>
      </div>
    </motion.header>
  );
}
