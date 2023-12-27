// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb"

if (!process.env.MONGO_URL) {
  throw new Error('Variavel de ambiente inválida/não encontrada: "MONGO_URL"')
}

const uri = process.env.MONGO_URL
const options = {}


// In production mode, it's best to not use a global variable.
const client = new MongoClient(uri, options)
const clientPromise: Promise<MongoClient> = client.connect()


// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise