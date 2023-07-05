import { Component } from '@angular/core';
import { Category } from '@common/categorie';
import { HTTP_STATUS_CODES } from '@common/const';
import { CategoryService } from 'src/services/category.service';
import { CommunicationService } from 'src/services/communication.service';

@Component({
  selector: 'app-categorie-carroussel',
  templateUrl: './categorie-carroussel.component.html',
  styleUrls: ['./categorie-carroussel.component.css']
})
export class CategorieCarrousselComponent {
  
 
constructor(private communication: CommunicationService, public categoryService: CategoryService) { }
async ngOnInit() {
  await this.categoryService.getCategories();
  
}

}
