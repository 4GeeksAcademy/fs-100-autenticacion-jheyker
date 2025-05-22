import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h2>Bienvenido</h2>

      <div className="mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate("/registro")}
        >
          Registrarse
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

