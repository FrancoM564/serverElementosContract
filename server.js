const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Ruta para obtener la metadata, cambiar los valores en base al pc
app.get('/metadata.json', (req, res) => {
  res.sendFile('/home/franco/Documentos/develop/sem1/dsApp/serverElementosContract/contracts/publish/metadata.json');
});

// Ruta para obtener el código, cambiar los valores en base al pc
app.get('/code.wasm', (req, res) => {
  res.sendFile('/home/franco/Documentos/develop/sem1/dsApp/serverElementosContract/contracts/publish/contract_publish.wasm');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Ruta para obtener la metadata, cambiar los valores en base al pc
app.get('/metadataReport.json', (req, res) => {
  res.sendFile('/home/franco/Documentos/develop/sem1/dsApp/serverElementosContract/contracts/report/metadata.json');
});

// Ruta para obtener el código, cambiar los valores en base al pc
app.get('/codeReport.wasm', (req, res) => {
  res.sendFile('/home/franco/Documentos/develop/sem1/dsApp/serverElementosContract/contracts/report/contract_report.wasm');
});

