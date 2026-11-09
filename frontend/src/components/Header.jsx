import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="brand">
        <Logo size={48} />
        <div>
          <p className="brand-name">Mon CRM</p>
          <p className="brand-tag">Relation client, claire et rapide</p>
        </div>
      </div>
    </motion.header>
  );
}
