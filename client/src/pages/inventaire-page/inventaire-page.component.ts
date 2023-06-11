import { Component, OnInit } from '@angular/core';
import { HTTP_STATUS_CODES } from '@common/const';
import { Category } from '@common/categorie';
import { CommunicationService } from 'src/services/communication.service';

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


}
