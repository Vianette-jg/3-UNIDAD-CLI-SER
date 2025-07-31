const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const puerto = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/subir', upload.single('archivo'), (req, res) => {
  const { nombre, clave, correo } = req.body;
  const archivo = req.file;

  if (!archivo) {
    return res.send(' No se recibió el archivo.');
  }

  console.log(' Datos recibidos:');
  console.log('Nombre:', nombre);
  console.log('Contraseña:', clave);
  console.log('Correo:', correo);
  console.log('Archivo:', archivo.path);

  res.send(' Usuario guardado correctamente y archivo subido.');
});

app.listen(puerto, () => {
  console.log(`Servidor activo en: http://localhost:${puerto}`);
});
