import { useState } from "react";
import Usuario from "@/assets/svg/icono-usu-dark.svg"
import medicamento from "@/assets/svg/logo-medicamentos-dark.svg"

export default function FileInput({
  label = "Subir archivo",
  accept = "image/*",
  onChange,
  variant ="user"
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

    // aca se obtiene el archivo real para su manipulacion
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
            src={variant === "user" ? Usuario : medicamento}
            alt="Icono-Usuario"
            className={variant === "user" ? "h-32 w-32 rounded-full object-cover" : "h-32 w-32 object-contain"}
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
          className="block w-full text-sm
          text-gray-600 file:mr-4 file:rounded-lg
          file:border-0 file:bg-brand
          file:px-4 file:py-2 file:text-white"
        />
      </div>
    </div>
  );
}