import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ImageUpload from '../../components/ui/ImageUpload';
import { Field, Input, Textarea } from '../../components/ui/Field';
import { aboutApi } from '../../api/about.api';
import { getErrorMessage } from '../../api/axiosClient';
import { useToast } from '../../context/ToastContext';

const emptyForm = { name: '', role: '', bio: '', comment: '', image: '' };

export default function TeamEditor({ team, onChange }) {
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

  const openEdit = (member) => {
    setEditing(member);
    setForm({ name: member.name, role: member.role, bio: member.bio, comment: member.comment, image: member.image });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.image) {
      toast.error('Name, role and photo are required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const updated = await aboutApi.updateTeamMember(editing.id, form);
        onChange(team.map((m) => (m.id === editing.id ? updated : m)));
        toast.success('Team member updated');
      } else {
        const created = await aboutApi.createTeamMember(form);
        onChange([...team, created]);
        toast.success('Team member added');
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
      await aboutApi.deleteTeamMember(deleteTarget.id);
      onChange(team.filter((m) => m.id !== deleteTarget.id));
      toast.success('Team member removed');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card
      title="Founders & Team"
      description="Profiles shown in the 'Leadership & Vision' section of the About page."
      actions={<Button size="sm" icon={Plus} onClick={openCreate}>Add Member</Button>}
    >
      {team.length === 0 ? (
        <p className="text-sm text-admin-muted text-center py-10">No team members yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {team.map((member) => (
            <div key={member.id} className="rounded-xl border border-admin-border overflow-hidden flex gap-4 p-4">
              <div className="w-20 h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-admin-ink truncate">{member.name}</p>
                <p className="text-xs text-admin-primary truncate mb-2">{member.role}</p>
                <p className="text-xs text-admin-muted line-clamp-2">{member.bio}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="secondary" icon={Pencil} onClick={() => openEdit(member)} className="flex-1">Edit</Button>
                  <Button size="sm" variant="danger" icon={Trash2} onClick={() => setDeleteTarget(member)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Team Member' : 'Add Team Member'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleSave}>{editing ? 'Save Changes' : 'Add Member'}</Button>
          </>
        }
      >
        <form className="grid sm:grid-cols-[160px_1fr] gap-6" onSubmit={handleSave}>
          <ImageUpload value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} aspect="aspect-[4/5]" label="Photo" />
          <div className="space-y-4">
            <Field label="Full Name">
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </Field>
            <Field label="Role / Title">
              <Input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
            </Field>
            <Field label="Bio">
              <Textarea rows={3} value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
            </Field>
            <Field label="Quote / Comment">
              <Textarea rows={2} value={form.comment} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))} />
            </Field>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Remove "${deleteTarget?.name}" from the team?`}
      />
    </Card>
  );
}
