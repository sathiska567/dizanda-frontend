import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ImageUpload from '../../components/ui/ImageUpload';
import { Field, Input } from '../../components/ui/Field';
import { homeApi } from '../../api/home.api';
import { getErrorMessage } from '../../api/axiosClient';
import { useToast } from '../../context/ToastContext';

const emptyForm = { name: '', flavor: '', image: '' };

export default function FeaturedProductsEditor({ products, onChange }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({ name: product.name, flavor: product.flavor, image: product.image });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.image) {
      toast.error('Name and image are required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const updated = await homeApi.updateFeaturedProduct(editing.id, form);
        onChange(products.map((p) => (p.id === editing.id ? updated : p)));
        toast.success('Featured product updated');
      } else {
        const created = await homeApi.createFeaturedProduct(form);
        onChange([...products, created]);
        toast.success('Featured product added');
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
      await homeApi.deleteFeaturedProduct(deleteTarget.id);
      onChange(products.filter((p) => p.id !== deleteTarget.id));
      toast.success('Featured product removed');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card
      title="Featured Products"
      description="The signature commissions shown on the home page catalog section."
      actions={<Button size="sm" icon={Plus} onClick={openCreate}>Add Product</Button>}
    >
      {products.length === 0 ? (
        <p className="text-sm text-admin-muted text-center py-10">No featured products yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-xl border border-admin-border overflow-hidden group">
              <div className="aspect-square bg-slate-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-admin-ink truncate">{product.name}</p>
                <p className="text-xs text-admin-muted truncate">{product.flavor}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="secondary" icon={Pencil} onClick={() => openEdit(product)} className="flex-1">Edit</Button>
                  <Button size="sm" variant="danger" icon={Trash2} onClick={() => setDeleteTarget(product)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Featured Product' : 'Add Featured Product'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleSave}>{editing ? 'Save Changes' : 'Add Product'}</Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSave}>
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="The Noir Marquis" />
          </Field>
          <Field label="Flavor description">
            <Input value={form.flavor} onChange={(e) => setForm((f) => ({ ...f, flavor: e.target.value }))} placeholder="70% Valrhona Dark Ganache & Espresso" />
          </Field>
          <ImageUpload value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} aspect="aspect-square" />
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Remove "${deleteTarget?.name}" from the featured products list?`}
      />
    </Card>
  );
}
