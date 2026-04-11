import { FileInput } from "@/shared";

export default function AvatarUploader({
  onChange,
  label = "Foto de perfil",
  variant = "user"
}) {
  return (
    <FileInput
      label={label}
      accept="image/png, image/jpeg, image/jpg, image/webp"
      onChange={onChange}
      variant={variant}
    />
  );
}