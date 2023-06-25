import { Component, OnInit } from '@angular/core';
import { HTTP_STATUS_CODES } from '@common/const';
import { Category } from '@common/categorie';
import { CommunicationService } from 'src/services/communication.service';
import { Item } from '@common/item';
import { CategorieComponent } from 'src/components/categorie/categorie.component';

@Component({
  selector: 'app-inventaire-page',
  templateUrl: './inventaire-page.component.html',
  styleUrls: ['./inventaire-page.component.css']
})
export class InventairePageComponent implements OnInit {
  categories: Category[] = [];
  constructor(private communication: CommunicationService) { }
  async ngOnInit() {
    await this.getCategories();

  }
  addCategory() {
    const input = document.getElementById('catName') as HTMLInputElement;
    const nameCat = input.value;
    return new Promise<void>((resolve, reject) => {
      if (nameCat) {
        const category: Category = { name: nameCat };
        this.communication.postNewCategory(category).subscribe((res) => {
          if (res.status === HTTP_STATUS_CODES.CREATED) {
            this.categories.push(category);
            input.value = '';

            this.getCategories();
            resolve();
          } else {
            if (res.status === HTTP_STATUS_CODES.CONFLICT) {
              console.log('La catégorie existe déjà');
              alert('La catégorie existe déjà');
              reject(new Error('La catégorie existe déjà'));
            } else {
              reject(new Error('Erreur lors de la création de la catégorie'));
            }
          }
        });
      } else {
        alert('Aucun nom inscris')
        reject(new Error('Aucun nom inscris'));
      }
    });
  }

  async getCategories() {
    this.communication.getAllCategories().subscribe((res) => {
      if (res.status === HTTP_STATUS_CODES.OK) {
        //console.log(res.body);
        this.categories = res.body as Category[];
      }
    });
  }

  async addItem() {
    const inputName = document.getElementById('itemName') as HTMLInputElement;
    const inputPrice = document.getElementById('itemPrice') as HTMLInputElement;
    const inputStock = document.getElementById('itemStock') as HTMLInputElement;
    const inputCategorie = document.getElementById('itemCat') as HTMLSelectElement;
    const nameItem = inputName.value;
    const priceItem = inputPrice.valueAsNumber;
    const stockItem = inputStock.valueAsNumber;
    const categorieItem = inputCategorie.value;
    return new Promise<void>((resolve, reject) => {
      if (nameItem && priceItem && stockItem && categorieItem) {
        const item: Item = { name: nameItem, price: priceItem, stock: stockItem, soldUnit: 0, categorie: categorieItem };
        this.communication.postNewItem(item).subscribe((res) => {
          console.log(res);
          if (res.status === HTTP_STATUS_CODES.CREATED) {
            inputName.value = '';
            inputPrice.value = '';
            inputStock.value = '';
            inputCategorie.value = '';
           // CategorieComponent.prototype.getItemsByCat(categorieItem); //preuve de mauvais code tt la gestion avec db a mettre dans un ou deux services
            window.location.reload();
           resolve();
          } else {
            if (res.status === HTTP_STATUS_CODES.CONFLICT) {
              console.log('L\'item existe déjà');
              alert('L\'item existe déjà');
              reject(new Error('L\'item existe déjà'));
            } else {
              reject(new Error('Erreur lors de la création de l\'item'));
            }
          }
        });
      } else {
        reject(new Error('Aucun nom inscris'));
      }
    });

  }




}
