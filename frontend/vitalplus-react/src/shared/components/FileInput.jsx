import { useState } from "react";
import Usuario from "@/assets/svg/icono-usu-dark.svg"

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
    <div className="flex items-center gap-4">
      <div>
      {/* imagen */}
      {preview ? (
          <img
            src={preview}
            alt="Vista previa"
            className="h-32 w-32 rounded-full object-cover"
          />) :( 
          <img 
            src={Usuario}
            alt="Icono-Usuario"
            className="h-32 w-32 rounded-full object-cover"
          />  
      )}
       <label className="block text-sm font-medium text-gray-600">
          {label}
        </label>
      </div>

      {/* label + input */}
      <div className="flex flex-col space-y-3">
       

        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white"
        />
      </div>
    </div>
  );
}
