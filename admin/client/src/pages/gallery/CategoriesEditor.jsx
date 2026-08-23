import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { Field, Input } from '../../components/ui/Field';
import { galleryApi } from '../../api/gallery.api';
import { getErrorMessage } from '../../api/axiosClient';
import { useToast } from '../../context/ToastContext';

export default function CategoriesEditor({ categories, onChange }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const openCreate = () => {
    setEditing(null);
    setName('');
    setModalOpen(true);
  };

  const openEdit = (category) => {
    setEditing(category);
    setName(category.name);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Category name is required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const updated = await galleryApi.updateCategory(editing.id, name.trim());
        onChange(categories.map((c) => (c.id === editing.id ? updated : c)));
        toast.success('Category updated');
      } else {
        const created = await galleryApi.createCategory(name.trim());
        onChange([...categories, created]);
        toast.success('Category added');
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
      await galleryApi.deleteCategory(deleteTarget.id);
      onChange(categories.filter((c) => c.id !== deleteTarget.id));
      toast.success('Category removed');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card
      title="Gallery Categories"
      description="Filter tabs shown at the top of the gallery page."
      actions={<Button size="sm" icon={Plus} onClick={openCreate}>Add Category</Button>}
    >
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span
            key={category.id}
            className="inline-flex items-center gap-2 rounded-full border border-admin-border bg-slate-50 pl-3.5 pr-1.5 py-1.5 text-sm text-admin-ink"
          >
            {category.name}
            <button onClick={() => openEdit(category)} className="p-1 rounded-full hover:bg-white text-admin-muted hover:text-admin-primary">
              <Pencil size={12} />
            </button>
            <button onClick={() => setDeleteTarget(category)} className="p-1 rounded-full hover:bg-white text-admin-muted hover:text-admin-danger">
              <Trash2 size={12} />
            </button>
          </span>
        ))}
        {categories.length === 0 && <p className="text-sm text-admin-muted py-4">No categories yet.</p>}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Rename Category' : 'Add Category'}
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleSave}>{editing ? 'Save' : 'Add'}</Button>
          </>
        }
      >
        <form onSubmit={handleSave}>
          <Field label="Category Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Cup Cakes" autoFocus />
          </Field>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Remove the "${deleteTarget?.name}" category? Items must be moved or deleted first.`}
      />
    </Card>
  );
}
