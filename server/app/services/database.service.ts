import 'dotenv/config';
import { Category } from '@common/categorie';
import { Item } from '@common/item';
import { Db, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { Service } from 'typedi';
@Service()
export class DatabaseService {
    private uri = process.env.DATABASE_URL + '';// `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.8qj2oy6.mongodb.net/?retryWrites=true&w=majority`;
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

    async getCategories(): Promise<Category[]> {
        const collection = this.database.collection(this.CATEGORIE_COLLECTION);
        const categorie = await collection.find({}).toArray();
        return categorie.map((cat) => ({
            id: cat._id,
            name: cat.name
        }));
    }

    async addCategorie(categorie: Category): Promise<void> {
        const collection = this.database.collection(this.CATEGORIE_COLLECTION);
        const isInCollection = await collection.findOne({ name: categorie.name });
        if (isInCollection) {
            throw new Error('La catégorie existe déjà');
        } else {
            await collection.insertOne(categorie);
        }
    }

    async addItem(item: Item): Promise<any> {
        const collection = this.database.collection(this.ITEM_COLLECTION);
        const isInCollection = await collection.findOne({ name: item.name });
        if (isInCollection) {
            throw new Error('L\'item existe déjà');

        } else {
            await collection.insertOne(item);
        }

    }

    async getItemByCat(catName: string): Promise<Item[]> {
        const collection = this.database.collection(this.ITEM_COLLECTION)
        const itemInCat = await collection.find({ categorie: catName }).toArray();
        return itemInCat.map((item) => ({
            id: item._id.toString(),
            name: item.name,
            stock: item.stock,
            price: item.price,
            soldUnit: item.soldUnit,
            categorie: item.categorie
        }));
    }

    async updateStock(stock: number, id: string): Promise<any> {
        
        const filter = { _id: new ObjectId(id) };
        const collection = this.database.collection(this.ITEM_COLLECTION);
        const isInCollection = collection.find(filter);
        console.log(stock);
        console.log(id);
        if (isInCollection) {

            const updateDoc = { $set: { stock: stock } };
            await collection.updateOne(filter, updateDoc);
        } else {
            throw new Error('L\'item n\'existe pas');
        }
    }
}