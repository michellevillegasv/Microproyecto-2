
import { useState } from 'react';
import { db, reservationsCollection} from '../firebaseConfig';


function ReservasFormulario() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [boletos, setBoletos] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    reservationsCollection.add({
      nombre: nombre,
      apellido: apellido,
      cedula: cedula,
      correo:correo,
      boletos:boletos
    })
    .then(function(docRef) {
      console.log('Reserva realizada con éxito');
    })
    .catch(function(error) {
      console.error('Error al hacer la reserva:', error);
    });

    setNombre('');
    setApellido('');
    setCedula(''),
    setCorreo(''),
    setBoletos('') 
  }

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="nombre">Nombre:</label>
      <input type="text" id="nombre" value={nombre} onChange={event => setNombre(event.target.value)} />

      <label htmlFor="apellido">Apellido:</label>
      <input type="text" id="apellido" value={apellido} onChange={event => setApellido(event.target.value)} />

      <label htmlFor="cedula">Cédula:</label>
      <input type="number" id="cedula" value={cedula} onChange={event => setCedula(event.target.value)} />

      <label htmlFor="correo">Correo:</label>
      <input type="text" id="correo" value={correo} onChange={event => setCorreo(event.target.value)} />

      <label htmlFor="boletos">Número de boletos:</label>
      <input type="number" id="boletos" value={boletos} min={1} max={5} step={1} onChange={event => setBoletos(event.target.value)} />

      <button type="submit">Hacer reserva</button>
    </form>
  );
}

export default ReservasFormulario;