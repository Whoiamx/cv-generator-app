// FormContainer.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import OpenPdfButton from "../ui/OpenPdfButton";

export const FormContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [pdfLink, setPdfLink] = useState(null);

  const onSubmit = async (data) => {
    console.log(data); // Verifica que los datos estén correctos

    try {
      const response = await axios.post(
        "http://localhost:3001/api/generate-cv", // Asegúrate de que el servidor esté corriendo en este puerto
        data,
        {
          responseType: "blob", // Se espera que el backend devuelva un archivo binario (PDF)
        }
      );
      console.log(response.data); // Verifica que la respuesta sea el archivo PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setPdfLink(url); // Creamos un enlace para descargar el PDF
    } catch (error) {
      console.error("Error al generar el CV:", error);
    }
  };

  return (
    <div className="form-container">
      <h1>Generador de CV - Estilo Harvard</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">
            <b>Nombre Completo</b>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Ej: Juan Pérez"
            {...register("name", { required: "Este campo es obligatorio" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="location">
            <b>Ubicación</b>
          </label>
          <input
            type="text"
            id="location"
            placeholder="Ej: Buenos Aires, Argentina"
            {...register("location", { required: "Este campo es obligatorio" })}
          />
          {errors.location && (
            <p className="error">{errors.location.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <b>Correo Electrónico</b>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ej: juan.perez@example.com"
            {...register("email", { required: "Este campo es obligatorio" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            <b>Teléfono</b>
          </label>
          <input
            type="text"
            id="phone"
            placeholder="Ej: +54 9 11 1234-5678"
            {...register("phone", { required: "Este campo es obligatorio" })}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">
            <b>Linkedin</b>
          </label>
          <input
            type="text"
            id="linkedin"
            placeholder="Ej: linkedin.com/in/juanperez"
            {...register("linkedin", { required: "Este campo es obligatorio" })}
          />
          {errors.linkedin && (
            <p className="error">{errors.linkedin.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="experience">
            <b>Experiencia Laboral</b> (<i>separada por comas</i>)
          </label>
          <input
            type="text"
            id="experience"
            placeholder="Ej: Desarrollador Web en XYZ, Analista en ABC"
            {...register("experience", {
              required: "Este campo es obligatorio",
            })}
          />
          {errors.experience && (
            <p className="error">{errors.experience.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="skills">
            <b>Habilidades Técnicas</b> (<i>separadas por comas</i>)
          </label>
          <input
            type="text"
            id="skills"
            placeholder="Ej: JavaScript, React, Node.js"
            {...register("skills", { required: "Este campo es obligatorio" })}
          />
          {errors.skills && <p className="error">{errors.skills.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="education">
            <b> Educación Complementaria</b> (<i>separada por comas</i>)
          </label>
          <input
            type="text"
            id="education"
            placeholder="Ej: Curso de React en Udemy"
            {...register("education", {
              required: "Este campo es obligatorio",
            })}
          />
          {errors.education && (
            <p className="error">{errors.education.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="languages">
            <b>Idiomas</b> (<i>separados por comas</i>)
          </label>
          <input
            type="text"
            id="languages"
            placeholder="Ej: Español, Inglés (B2)"
            {...register("languages", {
              required: "Este campo es obligatorio",
            })}
          />
          {errors.languages && (
            <p className="error">{errors.languages.message}</p>
          )}
        </div>

        <button type="submit">
          <b>Generar CV</b>
        </button>
        <OpenPdfButton />
      </form>

      {pdfLink && (
        <a href={pdfLink} download="CV.pdf" className="download-link">
          <b>Descargar mi CV</b>
        </a>
      )}
    </div>
  );
};
