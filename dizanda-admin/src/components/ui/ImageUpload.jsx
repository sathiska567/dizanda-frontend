import { useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { uploadApi } from '../../api/upload.api';
import { getErrorMessage } from '../../api/axiosClient';
import { useToast } from '../../context/ToastContext';

export default function ImageUpload({ value, onChange, label = 'Image', aspect = 'aspect-video' }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadApi.uploadImage(file, setProgress);
      onChange(url);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <p className="text-xs font-semibold uppercase tracking-wide text-admin-muted mb-1.5">{label}</p>}
      <div
        className={`relative ${aspect} w-full rounded-xl border-2 border-dashed border-admin-border bg-slate-50 overflow-hidden group cursor-pointer`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
      >
        {value ? (
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-admin-muted text-xs gap-2">
            <ImagePlus size={22} />
            Click or drag an image here
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-2 text-xs text-admin-muted">
            <Loader2 size={20} className="animate-spin text-admin-primary" />
            Uploading {progress}%
          </div>
        )}

        {value && !uploading && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-admin-danger rounded-full p-1.5 shadow"
          >
            <X size={14} />
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="or paste an image URL"
        className="mt-2 w-full rounded-lg border border-admin-border bg-white px-3 py-2 text-xs text-admin-ink outline-none focus:border-admin-primary"
      />
    </div>
  );
}
