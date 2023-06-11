import { Category } from "./categorie";

export class Item{
    name: string;
    stock: number;
    price: number;
    soldUnit: number=0;
    categorie: Category
}