import { Button, Input, TextArea } from "@/shared";
import { useState } from "react";
import { userSchemasComment } from "../Schemas/userSchemasComment";
import { Star } from "lucide-react";

/*=============================================================
Este formulario se utiliza en la pagina de detalle de productos
en la vista cliente, se utiliza para crear un comentario del 
producto 
===============================================================*/

export default function UserFormComment({ onRatingSubmit,}) {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comment: "", 
  });

//=================== Puntuacion Productos Estrellas ================
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
//===================================================================
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = userSchemasComment.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    //Puntuacion con estrellas del producto 
    if (rating === 0) {
    alert("Por favor selecciona una puntuación");
    return;
    }
    if (onRatingSubmit) {
    onRatingSubmit({...formData,rating});
  }
      //Limpia el formulario una vez se realiza el sub,it
      setFormData({ firstName: "", lastName: "", email: "", comment: "" });
      setRating(0);
      setErrors({});
  };

  return (
    // ================= Contenedor Padre =================
    <div className="flex flex-col w-225 p-5">
      {/* // ================= Formulario =================*/}
      <form onSubmit={handleSubmit} className="flex gap-5">
        <div className="flex flex-col w-85 gap-2">
          <Input
            label="Nombre"
            name="firstName"
            type="text"
            placeholder="Ingrese su nombre"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <Input
            label="Apellido"
            name="lastName"
            type="text"
            placeholder="Ingrese su apellido"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />

          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            placeholder="Ingrese su correo electrónico"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div className="flex flex-col w-1/2">
          {/* //=============== Puntuacion Producto ================ */}
          <div className="flex items-center">
            <label className="mr-2">Puntuación:</label>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    className="w-8 h-8 rounded-full mx-auto"
                  >
                    <Star
                      className={`${
                        starValue <= (hover || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
          {/* //========================= comentario y Boton ========================== */}
          <div className="flex flex-col gap-4">
            <TextArea
              label="Comentario"
              name="comment"
              maxLength={255}
              placeholder="Escribe tu comentario..."
              value={formData.comment}
              onChange={handleChange}
              error={errors.comment}
            />
            <Button variant="primary" type="submit">
              Enviar Comentario
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
