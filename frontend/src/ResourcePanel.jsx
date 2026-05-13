import { useCallback, useEffect, useState } from 'react';
import { api } from './api';
import { IconResource } from './components/IsometricIcons.jsx';

const CATEGORIES = ['stress', 'anxiety', 'sleep', 'motivation', 'general'];

const emptyForm = {
  title: '',
  description: '',
  category: 'general',
  url: '',
  postedBy: 'Admin',
};

export default function ResourcePanel() {
  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const q = categoryFilter ? `?category=${encodeURIComponent(categoryFilter)}` : '';
      const res = await api(`/api/resources${q}`);
      setItems(res.data ?? []);
    } catch (e) {
      setError(e.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const startCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError(null);
  };

  const startEdit = (row) => {
    setEditingId(row._id);
    setForm({
      title: row.title ?? '',
      description: row.description ?? '',
      category: row.category ?? 'general',
      url: row.url ?? '',
      postedBy: row.postedBy ?? 'Admin',
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
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      url: form.url.trim() || undefined,
      postedBy: form.postedBy.trim() || 'Admin',
    };

    try {
      if (editingId) {
        await api(`/api/resources/${editingId}`, { method: 'PUT', body: payload });
      } else {
        await api('/api/resources', { method: 'POST', body: payload });
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
    if (!window.confirm('Delete this resource?')) return;
    setError(null);
    try {
      await api(`/api/resources/${id}`, { method: 'DELETE' });
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
          <IconResource size={32} />
        </div>
        <h2>Wellness resources</h2>
      </div>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="toolbar">
        <label>
          Category:
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter resources by category"
          >
            <option value="">All</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <form onSubmit={submit}>
        <div className="form-grid cols-2">
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="r-title">Title</label>
            <input
              id="r-title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
              maxLength={100}
            />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="r-desc">Description</label>
            <textarea
              id="r-desc"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              required
              maxLength={500}
            />
          </div>
          <div className="field">
            <label htmlFor="r-cat">Category</label>
            <select
              id="r-cat"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="r-by">Posted by</label>
            <input
              id="r-by"
              value={form.postedBy}
              onChange={(e) => setForm((f) => ({ ...f, postedBy: e.target.value }))}
            />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="r-url">URL (optional)</label>
            <input
              id="r-url"
              type="url"
              placeholder="https://"
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            />
          </div>
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {editingId ? 'Update resource' : 'Add resource'}
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
        <p className="empty">No resources for this filter.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Link</th>
                <th>By</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row._id}>
                  <td>{row.title}</td>
                  <td>{row.category}</td>
                  <td>
                    {row.url ? (
                      <a href={row.url} target="_blank" rel="noreferrer">
                        Open
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>{row.postedBy}</td>
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
