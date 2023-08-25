import { Item } from './item';
export interface transaction{
    id?: string;
    items: Item[];
    total: number;
    date: Date;

}