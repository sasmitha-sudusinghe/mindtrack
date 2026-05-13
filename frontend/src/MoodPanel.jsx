import { useCallback, useEffect, useState } from 'react';
import { api } from './api';
import { fromDateTimeLocalValue, toDateTimeLocalValue } from './utils/dateInput';
import { IconMood } from './components/IsometricIcons.jsx';

const emptyForm = {
  studentId: '',
  moodScore: '5',
  stressLevel: '5',
  sleepHours: '7',
  note: '',
  date: '',
};

export default function MoodPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await api('/api/moods');
      setItems(res.data ?? []);
    } catch (e) {
      setError(e.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm, date: toDateTimeLocalValue(new Date().toISOString()) });
    setError(null);
  };

  const startEdit = (row) => {
    setEditingId(row._id);
    setForm({
      studentId: row.studentId ?? '',
      moodScore: String(row.moodScore ?? ''),
      stressLevel: String(row.stressLevel ?? ''),
      sleepHours: String(row.sleepHours ?? ''),
      note: row.note ?? '',
      date: row.date ? toDateTimeLocalValue(row.date) : '',
    });
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      studentId: form.studentId.trim(),
      moodScore: Number(form.moodScore),
      stressLevel: Number(form.stressLevel),
      sleepHours: Number(form.sleepHours),
      note: form.note.trim() || undefined,
    };
    const iso = fromDateTimeLocalValue(form.date);
    if (iso) payload.date = iso;

    try {
      if (editingId) {
        await api(`/api/moods/${editingId}`, { method: 'PUT', body: payload });
      } else {
        await api('/api/moods', { method: 'POST', body: payload });
      }
      cancelEdit();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this mood log?')) return;
    setError(null);
    try {
      await api(`/api/moods/${id}`, { method: 'DELETE' });
      if (editingId === id) cancelEdit();
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <div className="panel-icon-wrap">
          <IconMood size={32} />
        </div>
        <h2>Mood logs</h2>
      </div>
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={submit}>
        <div className="form-grid cols-2">
          <div className="field">
            <label htmlFor="m-studentId">Student ID</label>
            <input
              id="m-studentId"
              value={form.studentId}
              onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))}
              required
              maxLength={120}
            />
          </div>
          <div className="field">
            <label htmlFor="m-date">Date</label>
            <input
              id="m-date"
              type="datetime-local"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
          </div>
          <div className="field">
            <label htmlFor="m-mood">Mood score (1–10)</label>
            <input
              id="m-mood"
              type="number"
              min={1}
              max={10}
              value={form.moodScore}
              onChange={(e) => setForm((f) => ({ ...f, moodScore: e.target.value }))}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="m-stress">Stress (1–10)</label>
            <input
              id="m-stress"
              type="number"
              min={1}
              max={10}
              value={form.stressLevel}
              onChange={(e) => setForm((f) => ({ ...f, stressLevel: e.target.value }))}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="m-sleep">Sleep hours</label>
            <input
              id="m-sleep"
              type="number"
              min={0}
              max={24}
              step={0.25}
              value={form.sleepHours}
              onChange={(e) => setForm((f) => ({ ...f, sleepHours: e.target.value }))}
              required
            />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="m-note">Note</label>
            <textarea
              id="m-note"
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              maxLength={300}
            />
          </div>
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {editingId ? 'Update log' : 'Add log'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-ghost" onClick={cancelEdit} disabled={saving}>
              Cancel
            </button>
          )}
          <button type="button" className="btn btn-ghost" onClick={startCreate} disabled={saving}>
            New form
          </button>
        </div>
      </form>

      {loading ? (
        <p className="loading">Loading…</p>
      ) : items.length === 0 ? (
        <p className="empty">No mood logs yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Mood</th>
                <th>Stress</th>
                <th>Sleep</th>
                <th>Note</th>
                <th>Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row._id}>
                  <td>{row.studentId}</td>
                  <td>{row.moodScore}</td>
                  <td>{row.stressLevel}</td>
                  <td>{row.sleepHours}</td>
                  <td>{row.note || '—'}</td>
                  <td className="muted">
                    {row.date ? new Date(row.date).toLocaleString() : '—'}
                  </td>
                  <td>
                    <div className="row-actions">
                      <button type="button" className="btn btn-ghost" onClick={() => startEdit(row)}>
                        Edit
                      </button>
                      <button type="button" className="btn btn-danger" onClick={() => remove(row._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
