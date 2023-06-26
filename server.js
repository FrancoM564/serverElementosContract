const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Ruta para obtener la metadata, cambiar los valores en base al pc
app.get("/metadata.json", (req, res) => {
  res.sendFile(
    "/home/franco/Documentos/develop/sem1/dsApp/serverElementosContract/contracts/publish/metadata.json"
  );
});

// Ruta para obtener el código, cambiar los valores en base al pc
app.get("/code.wasm", (req, res) => {
  res.sendFile(
    "/home/franco/Documentos/develop/sem1/dsApp/serverElementosContract/contracts/publish/contract_publish.wasm"
  );
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Ruta para obtener la metadata, cambiar los valores en base al pc
app.get("/metadataReport.json", (req, res) => {
  res.sendFile(
    "/home/franco/Documentos/develop/sem1/dsApp/serverElementosContract/contracts/report/metadata.json"
  );
});

// Ruta para obtener el código, cambiar los valores en base al pc
app.get("/codeReport.wasm", (req, res) => {
  res.sendFile(
    "/home/franco/Documentos/develop/sem1/dsApp/serverElementosContract/contracts/report/contract_report.wasm"
  );
});

// Ruta para recibir los valores y almacenarlos en el archivo CSV
app.post("/guardarCarga", (req, res) => {
  // Obtener los valores enviados en la solicitud
  console.log(req.body);

  const {
    nombreArchivo,
    tiempoEncriptacion,
    tiempoMarcaAgua,
    tiempoContratos,
    memoriaEncriptacion,
    memoriaMarcaAgua,
  } = req.body;

  // Validar los valores o realizar cualquier otra lógica necesaria

  // Crear una instancia del escritor CSV
  const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: "datosCarga.csv", // Nombre del archivo CSV donde se almacenarán los datos
    header: [
      { id: "nombreArchivo", title: "Nombre_del_archivo" },
      { id: "tiempoMarcaAgua", title: "Tiempo_de_marcaje_agua" },
      { id: "memoriaMarcaAgua", title: "Memoria_consumida_marcaje_agua" },
      { id: "tiempoEncriptacion", title: "Tiempo_encriptacion" },
      { id: "memoriaEncriptacion", title: "Memoria_consumida_marcaje_agua" },
      { id: "tiempoContratos", title: "Tiempo_creación_contratos" },
    ],
    append: true,
  });

  // Escribir los valores en el archivo CSV
  csvWriter
    .writeRecords([
      {
        nombreArchivo,
        tiempoEncriptacion,
        tiempoMarcaAgua,
        tiempoContratos,
        memoriaEncriptacion,
        memoriaMarcaAgua,
      },
    ])
    .then(() => {
      res.send("Valores almacenados correctamente en el archivo CSV.");
    })
    .catch((error) => {
      console.error("Error al escribir en el archivo CSV:", error);
    });
});

app.post("/guardarDescarga", (req, res) => {
  // Obtener los valores enviados en la solicitud
  console.log(req.body);

  const {
    nombreArchivo,
    tiempoCompra,
    tiempoObtenerInformacion,
    tiempoDesencriptacion,
    memoriaDesencriptacion,
  } = req.body;

  // Validar los valores o realizar cualquier otra lógica necesaria

  // Crear una instancia del escritor CSV
  const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: "datosDescarga.csv", // Nombre del archivo CSV donde se almacenarán los datos
    header: [
      { id: "nombreArchivo", title: "Nombre_del_archivo" },
      { id: "tiempoCompra", title: "Tiempo_de_marcaje_agua" },
      {
        id: "tiempoObtenerInformacion",
        title: "Memoria_consumida_marcaje_agua",
      },
      { id: "tiempoDesencriptacion", title: "Tiempo_encriptacion" },
      { id: "memoriaDesencriptacion", title: "Memoria_consumida_marcaje_agua" },
    ],
    append: true,
  });

  // Escribir los valores en el archivo CSV
  csvWriter
    .writeRecords([
      {
        nombreArchivo,
        tiempoCompra,
        tiempoObtenerInformacion,
        tiempoDesencriptacion,
        memoriaDesencriptacion,
      },
    ])
    .then(() => {
      res.send("Valores almacenados correctamente en el archivo CSV.");
    })
    .catch((error) => {
      console.error("Error al escribir en el archivo CSV:", error);
    });
});
