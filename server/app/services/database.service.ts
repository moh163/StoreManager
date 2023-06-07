import 'dotenv/config'
import {  Db, MongoClient, ServerApiVersion } from 'mongodb';
import { Service } from 'typedi';
@Service()
export class DatabaseService {
    private uri  =process.env.DATABASE_URL + '' ;// `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.8qj2oy6.mongodb.net/?retryWrites=true&w=majority`;
    private client = new MongoClient(this.uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    private DB_NAME = process.env.DATABASE_NAME + '';
    private CATEGORIE_COLLECTION = process.env.DATABASE_COLLECTION_CAT + '';
    private ITEM_COLLECTION = process.env.DATABASE_COLLECTION_IT + '';    
    private database: Db = this.client.db(this.DB_NAME);

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
   
    constructor() { }
    async connect() {
        try {// Connect the client to the server	(optional starting in v4.7)
            await this.client.connect();
            // Send a ping to confirm a successful connection
            await this.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } catch (err) {
            console.error(err);
        }
    }

    async closeConnection(): Promise<void> {
        return this.client.close();
    }

    //a changer
    async getCategorie(): Promise<any> {
        return this.database.collection(this.CATEGORIE_COLLECTION).find().toArray();
    }

    //a changer
    async getItem(): Promise<any> {
        return this.database.collection(this.ITEM_COLLECTION).find().toArray();
    }



}