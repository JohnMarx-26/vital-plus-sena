import UserForm from "../components/UserForm";

export default function CreateUserPage() {
  const handleCancel = () => {
    console.log("Retroceder");
  };

  const handleCreateUser = (formData) => {
    console.log("Guardar usuario:", formData);
  };

  return (
    <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <UserForm
          title="Crear cuenta"
          submitLabel="Guardar"
          onCancel={handleCancel}
          onSubmit={handleCreateUser}
        />
      </div>
    </section>
  );
}