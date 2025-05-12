import { FaEye } from "react-icons/fa"; // Importamos el ícono de ojo desde react-icons
import "../App.css";

const OpenPdfButton = () => {
  const handleClick = () => {
    window.open("/ejemplo-cv.pdf", "_blank");
  };

  return (
    <button onClick={handleClick} className="open-pdf-button">
      <FaEye className="button-icon" /> Ver CV Ejemplo
    </button>
  );
};

export default OpenPdfButton;
