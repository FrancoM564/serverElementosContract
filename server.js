const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


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

// Ruta para recibir los valores y almacenarlos en el archivo CSV
app.post('/guardar', (req, res) => {
  // Obtener los valores enviados en la solicitud

  console.log(req.body)

  const { numeroIteracion, tiempoEjecucion } = req.body;

  // Validar los valores o realizar cualquier otra lógica necesaria

  // Crear una instancia del escritor CSV
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: 'datos.csv', // Nombre del archivo CSV donde se almacenarán los datos
    header: [
      { id: 'numeroIteracion', title: 'Numero de iteracion' },
      { id: 'tiempoEjecucion', title: 'Tiempo de ejecucion' }
    ],
    append: true
  });

  // Escribir los valores en el archivo CSV
  csvWriter.writeRecords([{ numeroIteracion, tiempoEjecucion }])
    .then(() => {
      res.send('Valores almacenados correctamente en el archivo CSV.');
    })
    .catch((error) => {
      console.error('Error al escribir en el archivo CSV:', error);
      res.status(500).send('Ocurrió un error al almacenar los valores.');
    });
});