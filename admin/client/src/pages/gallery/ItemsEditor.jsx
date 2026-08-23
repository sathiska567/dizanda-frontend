import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ImageUpload from '../../components/ui/ImageUpload';
import { Field, Input, Select, Textarea } from '../../components/ui/Field';
import { galleryApi } from '../../api/gallery.api';
import { getErrorMessage } from '../../api/axiosClient';
import { useToast } from '../../context/ToastContext';

const emptyForm = { title: '', category: '', image: '', description: '', flavorsText: '' };

function toFormState(item) {
  return {
    title: item.title,
    category: item.category,
    image: item.image,
    description: item.description,
    flavorsText: (item.availableFlavors || []).join(', '),
  };
}

export default function ItemsEditor({ items, categories, onChange }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, category: categories[0]?.name || '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm(toFormState(item));
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.image) {
      toast.error('Title, category and image are required');
      return;
    }
    const payload = {
      title: form.title,
      category: form.category,
      image: form.image,
      description: form.description,
      availableFlavors: form.flavorsText.split(',').map((f) => f.trim()).filter(Boolean),
    };
    setSaving(true);
    try {
      if (editing) {
        const updated = await galleryApi.updateItem(editing.id, payload);
        onChange(items.map((i) => (i.id === editing.id ? updated : i)));
        toast.success('Gallery item updated');
      } else {
        const created = await galleryApi.createItem(payload);
        onChange([...items, created]);
        toast.success('Gallery item added');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await galleryApi.deleteItem(deleteTarget.id);
      onChange(items.filter((i) => i.id !== deleteTarget.id));
      toast.success('Gallery item removed');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card
      title="Gallery Items"
      description="Individual portfolio pieces displayed in the gallery grid."
      actions={
        <Button size="sm" icon={Plus} onClick={openCreate} disabled={categories.length === 0}>
          Add Item
        </Button>
      }
    >
      {categories.length === 0 && (
        <p className="text-sm text-admin-muted mb-4">Add a category first before creating gallery items.</p>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-admin-muted text-center py-10">No gallery items yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-admin-border overflow-hidden group">
              <div className="aspect-square bg-slate-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-[10px] uppercase tracking-wider text-admin-primary font-medium">{item.category}</p>
                <p className="text-sm font-medium text-admin-ink truncate">{item.title}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="secondary" icon={Pencil} onClick={() => openEdit(item)} className="flex-1">Edit</Button>
                  <Button size="sm" variant="danger" icon={Trash2} onClick={() => setDeleteTarget(item)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Gallery Item' : 'Add Gallery Item'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleSave}>{editing ? 'Save Changes' : 'Add Item'}</Button>
          </>
        }
      >
        <form className="grid sm:grid-cols-[200px_1fr] gap-6" onSubmit={handleSave}>
          <ImageUpload value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} aspect="aspect-square" />
          <div className="space-y-4">
            <Field label="Title">
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </Field>
            <Field label="Category">
              <Select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Description">
              <Textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </Field>
            <Field label="Available Flavors" hint="comma-separated">
              <Input
                value={form.flavorsText}
                onChange={(e) => setForm((f) => ({ ...f, flavorsText: e.target.value }))}
                placeholder="Vanilla, Chocolate, Strawberry"
              />
            </Field>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Remove "${deleteTarget?.title}" from the gallery?`}
      />
    </Card>
  );
}
