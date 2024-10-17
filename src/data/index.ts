const { MongoClient } = require("mongodb");

// URL de conexión a tu base de datos MongoDB
const mongoURI = "mongodb://localhost:27017";
const dbName = "testdb";

async function deleteDatabase() {
  const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Conectar al cliente de MongoDB
    await client.connect();
    console.log("Conectado a MongoDB");

    // Obtener la base de datos
    const db = client.db(dbName);

    // Eliminar la base de datos
    await db.dropDatabase();
    console.log(`Base de datos '${dbName}' eliminada`);
  } catch (err) {
    console.error("Error al eliminar la base de datos:", err);
  } finally {
    // Cerrar la conexión
    await client.close();
    console.log("Conexión cerrada");
  }
}

// Exportar la función para usarla en otros archivos
deleteDatabase();
