import { getSession } from 'next-auth/client'
const {MongoClient, ObjectId} = require('mongodb');

let cachedDb = null;

async function connectToDatabase (uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await MongoClient.connect(uri)
  cachedDb = db;
  return cachedDb;
}

export default async (req, res) => {
    const session = await getSession({ req })

    if (!session) {
        res.send({ error: 'You must be sign in to view the protected content on this page.' })
        return;
    }

    const client = await connectToDatabase(process.env.NEXTAUTH_DATABASE_URL)
    const db = client.db(client.s.options.dbName);
    const collection = db.collection('accounts');

    const docs = await collection.findOne({'userId': ObjectId(session.user.id)})

    if (!docs) {
        res.send({ errorCode: 'A4001' })
        return;
    }
   
    res.send({ 
        image: session.user.image,
        name: session.user.name,
        token: docs.accessToken
    });
}