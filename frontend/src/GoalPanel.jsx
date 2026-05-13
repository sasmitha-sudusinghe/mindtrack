import { useCallback, useEffect, useState } from 'react';
import { api } from './api';
import { fromDateTimeLocalValue, toDateTimeLocalValue } from './utils/dateInput';
import { IconGoal } from './components/IsometricIcons.jsx';

const emptyForm = {
  studentId: '',
  title: '',
  description: '',
  targetDate: '',
  status: 'active',
  progress: '0',
};

export default function GoalPanel() {
  const [items, setItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const q = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : '';
      const res = await api(`/api/goals${q}`);
      setItems(res.data ?? []);
    } catch (e) {
      setError(e.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const startCreate = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      targetDate: toDateTimeLocalValue(new Date(Date.now() + 7 * 86400000).toISOString()),
    });
    setError(null);
  };

  const startEdit = (row) => {
    setEditingId(row._id);
    setForm({
      studentId: row.studentId ?? '',
      title: row.title ?? '',
      description: row.description ?? '',
      targetDate: row.targetDate ? toDateTimeLocalValue(row.targetDate) : '',
      status: row.status ?? 'active',
      progress: String(row.progress ?? 0),
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
    const targetIso = fromDateTimeLocalValue(form.targetDate);
    if (!targetIso) {
      setError('Target date is required.');
      setSaving(false);
      return;
    }
    const payload = {
      studentId: form.studentId.trim(),
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      targetDate: targetIso,
      status: form.status,
      progress: Number(form.progress),
    };

    try {
      if (editingId) {
        await api(`/api/goals/${editingId}`, { method: 'PUT', body: payload });
      } else {
        await api('/api/goals', { method: 'POST', body: payload });
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
    if (!window.confirm('Delete this goal?')) return;
    setError(null);
    try {
      await api(`/api/goals/${id}`, { method: 'DELETE' });
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
          <IconGoal size={32} />
        </div>
        <h2>Goals</h2>
      </div>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="toolbar">
        <label>
          Filter:
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter goals by status"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="abandoned">Abandoned</option>
          </select>
        </label>
      </div>

      <form onSubmit={submit}>
        <div className="form-grid cols-2">
          <div className="field">
            <label htmlFor="g-studentId">Student ID</label>
            <input
              id="g-studentId"
              value={form.studentId}
              onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="g-status">Status</label>
            <select
              id="g-status"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="abandoned">Abandoned</option>
            </select>
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="g-title">Title</label>
            <input
              id="g-title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
              maxLength={100}
            />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="g-desc">Description</label>
            <textarea
              id="g-desc"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              maxLength={300}
            />
          </div>
          <div className="field">
            <label htmlFor="g-target">Target date</label>
            <input
              id="g-target"
              type="datetime-local"
              value={form.targetDate}
              onChange={(e) => setForm((f) => ({ ...f, targetDate: e.target.value }))}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="g-progress">Progress (%)</label>
            <input
              id="g-progress"
              type="number"
              min={0}
              max={100}
              value={form.progress}
              onChange={(e) => setForm((f) => ({ ...f, progress: e.target.value }))}
              required
            />
          </div>
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {editingId ? 'Update goal' : 'Create goal'}
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
        <p className="empty">No goals match this filter.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Title</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Target</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row._id}>
                  <td>{row.studentId}</td>
                  <td>{row.title}</td>
                  <td>{row.status}</td>
                  <td>{row.progress}%</td>
                  <td className="muted">
                    {row.targetDate ? new Date(row.targetDate).toLocaleString() : '—'}
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
