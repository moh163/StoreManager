import 'dotenv/config';
import { Category } from '@common/categorie';
import { Item } from '@common/item';
import { Db, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { Service } from 'typedi';
// import { toolKit } from 'utils/toolKit';
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
    private TRANSACTION_COLLECTION = process.env.DATABASE_COLLECTION_TRA + '';
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

    async confirmTransaction(itemSold: Item[]): Promise<any> {
        const collectionItem = this.database.collection(this.ITEM_COLLECTION);
        const collectionTransaction = this.database.collection(this.TRANSACTION_COLLECTION);
        const totalArgent: number = itemSold.reduce((acc, item) => acc + item.soldUnit * item.price, 0);
        const newTransaction = {
            items: itemSold,
            total: totalArgent,
            date: new Date()
        };
        await collectionTransaction.insertOne(newTransaction);
        //toolKit.sortArrayByProperty(itemSold, 'id');
        // collection.find({}).sort({ _id: 1 }).toArray();

        for (let i = 0; i < itemSold.length; i++) {
            const filter = { _id: new ObjectId(itemSold[i].id) };
            const isInCollection = collectionItem.find(filter); //peut etre ne pas utiliser le find et faire sois meme la recherche avec les arrays sorted
            if (isInCollection) {
                const newStock = itemSold[i].stock-itemSold[i].soldUnit > 0 ? itemSold[i].stock-itemSold[i].soldUnit : 0;
                const updateDoc = { $set: { stock: newStock , soldUnit: itemSold[i].soldUnit } };
                await collectionItem.updateOne(filter, updateDoc);
            } else {
                throw new Error('L\'item n\'existe pas');
            }
        }
    }

    async getTransactionByDate(startDate: Date, endDate: Date): Promise<any> {
        const collection = this.database.collection(this.TRANSACTION_COLLECTION);
        const transactionArray= await collection.find({ date: { $gte: startDate, $lte: endDate } }).toArray()
        return transactionArray.map((transaction) => ({
            id: transaction._id.toString(),
            items: transaction.items,
            total: transaction.total,
            date: transaction.date
            }));

    }
}
