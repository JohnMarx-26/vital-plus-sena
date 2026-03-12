import { useState } from "react";

export default function FileInput({
  label = "Subir archivo",
  accept = "image/*",
  onChange,
}) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    let previewUrl = null;

    if (selectedFile.type.startsWith("image/")) {
      previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }

    if (onChange) {
      onChange(selectedFile, previewUrl);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-600">
        {label}
      </label>

      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white"
      />

      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          className="h-32 w-32 rounded-full object-cover"
        />
      )}
    </div>
  );
}