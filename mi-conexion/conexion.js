const express = require('express');
const mysql = require('mysql');

const app = express();
const puerto = 3000;

// Middleware para leer datos del formulario
app.use(express.urlencoded({ extended: true }));

// Conexión a MySQL (ajusta tu base si se llama diferente)
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventario-ropa'
});

conexion.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar:', err.message);
    return;
  }
  console.log('✅ Conectado a MySQL');
});

// Formulario con los campos correctos
app.get('/', (req, res) => {
  res.send(`
    <h2>Formulario</h2>
    <form action="/guardar" method="POST">
      <input type="text" name="usuario" placeholder="Usuario" required><br><br>
      <input type="password" name="contrasena" placeholder="Contraseña" required><br><br>
      <input type="email" name="correo" placeholder="Correo" required><br><br>
      <button type="submit">Enviar</button>
    </form>
  `);
});

// Guardar los datos en la base
app.post('/guardar', (req, res) => {
  const { usuario, contrasena, correo } = req.body;

  const sql = 'INSERT INTO usuarios (usuario, contraseña, correo) VALUES (?, ?, ?)';
  const valores = [usuario, contrasena, correo];

  conexion.query(sql, valores, (err, resultado) => {
    if (err) {
      console.error('❌ Error al guardar:', err.message);
      res.send('❌ Error al guardar');
      return;
    }
    res.send('✅ Usuario guardado correctamente');
  });
});

// Inicia el servidor
app.listen(puerto, () => {
  console.log(`Servidor activo en http://localhost:${puerto}`);
});
