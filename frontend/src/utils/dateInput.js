export function toDateTimeLocalValue(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fromDateTimeLocalValue(val) {
  if (!val) return undefined;
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

export function toDateInputValue(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function fromDateInputValue(val) {
  if (!val) return undefined;
  const d = new Date(`${val}T12:00:00`);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}
