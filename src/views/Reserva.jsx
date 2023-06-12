import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReservasFormulario from "../components/FormReserva";
import { useAuth } from "./Auth";
import Asientos from "../components/Seats";

function Reservar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <ReservasFormulario />
      <Asientos />
    </div>
  );
}
export default Reservar;
