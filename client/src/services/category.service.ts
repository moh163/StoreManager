import { Injectable } from '@angular/core';
import { HTTP_STATUS_CODES } from '@common/const';
import { CommunicationService } from './communication.service';
import { Category } from '@common/categorie';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = [];
  venteTotal:number=0;

  constructor(private communication: CommunicationService) { 
    
   
  }
  async getCategories() {
    this.communication.getAllCategories().subscribe((res) => {
      if (res.status === HTTP_STATUS_CODES.OK) {
      this.categories= res.body as Category[];
      }
    });
  }

  async addCategory(name: string) {
    const category: Category = { name: name };
    this.communication.postNewCategory(category).subscribe((res) => {
      if (res.status === HTTP_STATUS_CODES.CREATED) {
        this.categories.push(category);
      } else {
        if (res.status === HTTP_STATUS_CODES.CONFLICT) {
          throw new Error('La catégorie existe déjà');
        } else {
          throw new Error('Erreur lors de la création de la catégorie');
        }
      }
    });
  }
  
}


