import { useState } from 'react';
import { motion } from 'framer-motion';

const EMPTY = {
  nom: '',
  email: '',
  entreprise: '',
  telephone: '',
  statut: 'prospect',
};

export default function ClientForm({ onAjouter, busy }) {
  const [form, setForm] = useState(EMPTY);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const ok = await onAjouter(form);
    if (ok) setForm(EMPTY);
  }

  return (
    <motion.form
      className="panel form-panel"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="panel-head">
        <h2>Nouveau contact</h2>
        <p>Ajoute un prospect ou un client en quelques secondes.</p>
      </div>

      <label>
        Nom *
        <input
          name="nom"
          value={form.nom}
          onChange={handleChange}
          placeholder="Alice Martin"
          required
          minLength={2}
        />
      </label>

      <label>
        Email *
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="alice@exemple.com"
          required
        />
      </label>

      <label>
        Entreprise
        <input
          name="entreprise"
          value={form.entreprise}
          onChange={handleChange}
          placeholder="NovaTech"
        />
      </label>

      <label>
        Téléphone
        <input
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          placeholder="06 01 02 03 04"
        />
      </label>

      <label>
        Statut
        <select name="statut" value={form.statut} onChange={handleChange}>
          <option value="prospect">Prospect</option>
          <option value="client">Client</option>
          <option value="inactif">Inactif</option>
        </select>
      </label>

      <motion.button
        type="submit"
        className="btn btn-primary"
        disabled={busy}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
      >
        {busy ? 'Ajout…' : 'Ajouter'}
      </motion.button>
    </motion.form>
  );
}
