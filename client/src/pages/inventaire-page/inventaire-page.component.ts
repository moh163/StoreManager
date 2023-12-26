import { Component, Input, OnInit } from '@angular/core';
import { HTTP_STATUS_CODES } from '@common/const';
import { Category } from '@common/categorie';
import { CommunicationService } from 'src/services/communication.service';
import { Item } from '@common/item';
import { CategorieComponent } from 'src/components/categorie/categorie.component';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-inventaire-page',
  templateUrl: './inventaire-page.component.html',
  styleUrls: ['./inventaire-page.component.css']
})
export class InventairePageComponent {
 
  constructor(private communication: CommunicationService, public categoryService: CategoryService) { }

  addCategory() {
    const input = document.getElementById('catName') as HTMLInputElement;
    const nameCat = input.value;
    if (nameCat) {
      this.categoryService.addCategory(nameCat).then(() => {
      input.value = '';
      }).catch((err) => {
        alert(err);
        console.log(err);
      });
    } else {
      alert('Aucun nom inscris');
    }
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
    console.log(categorieItem);
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
        reject(new Error('Informations manquantes'));
      }
    });

  }




}
