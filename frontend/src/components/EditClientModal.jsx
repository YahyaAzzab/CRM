import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function EditClientModal({ client, busy, onClose, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!client) {
      setForm(null);
      return;
    }

    setForm({
      nom: client.nom || '',
      email: client.email || '',
      entreprise: client.entreprise || '',
      telephone: client.telephone || '',
      statut: client.statut || 'prospect',
      notes: client.notes || '',
    });
  }, [client]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!client || !form) return null;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSave(client._id, form);
  }

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.form
        className="modal-panel"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="panel-head">
          <h2>Modifier le contact</h2>
          <p>Met à jour les informations de {client.nom}.</p>
        </div>

        <label>
          Nom *
          <input name="nom" value={form.nom} onChange={handleChange} required minLength={2} />
        </label>

        <label>
          Email *
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Entreprise
          <input name="entreprise" value={form.entreprise} onChange={handleChange} />
        </label>

        <label>
          Téléphone
          <input name="telephone" value={form.telephone} onChange={handleChange} />
        </label>

        <label>
          Statut
          <select name="statut" value={form.statut} onChange={handleChange}>
            <option value="prospect">Prospect</option>
            <option value="client">Client</option>
            <option value="inactif">Inactif</option>
          </select>
        </label>

        <label>
          Notes
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            maxLength={500}
            placeholder="Contexte, prochain appel, budget…"
          />
        </label>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={busy}>
            Annuler
          </button>
          <motion.button
            type="submit"
            className="btn btn-primary"
            disabled={busy}
            whileTap={{ scale: 0.97 }}
          >
            {busy ? 'Enregistrement…' : 'Enregistrer'}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}
