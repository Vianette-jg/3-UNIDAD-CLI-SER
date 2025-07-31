const express = require('express');
const mysql = require('mysql');

const app = express();
const puerto = 3000;

// Para leer formularios POST
app.use(express.urlencoded({ extended: true }));

// Conexión a MySQL
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventario-ropa' // cambia si tu base se llama diferente
});

conexion.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar:', err.message);
    return;
  }
  console.log('✅ Conectado a MySQL');
});

// Formulario con usuario, contraseña y correo
app.get('/', (req, res) => {
  res.send(`
    <h2>Formulario</h2>
    <form action="/guardar" method="POST">
      <label>Usuario:</label><br>
      <input type="text" name="usuario" placeholder="Usuario" required><br><br>

      <label>Contraseña:</label><br>
      <input type="password" name="contrasena" placeholder="Contraseña" required><br><br>

      <label>Correo:</label><br>
      <input type="email" name="correo" placeholder="Correo" required><br><br>

      <button type="submit">Enviar</button>
    </form>
  `);
});

// Ruta para guardar los datos
app.post('/guardar', (req, res) => {
  const { usuario, contrasena, correo } = req.body;

  conexion.query(
    'INSERT INTO usuarios (usuario, contraseña, correo) VALUES (?, ?, ?)',
    [usuario, contrasena, correo],
    (err, resultado) => {
      if (err) {
        console.error('❌ Error al guardar:', err.message);
        res.send('❌ Error al guardar en la base');
        return;
      }
      res.send('✅ Usuario guardado correctamente');
    }
  );
});

// Iniciar servidor
app.listen(puerto, () => {
  console.log(`Servidor activo en http://localhost:${puerto}`);
});
