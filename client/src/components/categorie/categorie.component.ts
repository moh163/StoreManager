import { Component, Input } from '@angular/core';
import { Category } from '@common/categorie';
import { HTTP_STATUS_CODES } from '@common/const';
import { Item } from '@common/item';
import { CommunicationService } from 'src/services/communication.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {
    @Input() category: Category = {name: ''};
    items: Item[] = [];
    constructor(private communication: CommunicationService) { }
    async ngOnInit() {
      await this.getItemsByCat(this.category.name);
    }

    async getItemsByCat(catName: string) {
      this.communication.getItemsByCat(catName).subscribe((res) => {
        if (res.status === HTTP_STATUS_CODES.OK) {
          this.items=res.body as Item[];
        }
      });
    }
}
