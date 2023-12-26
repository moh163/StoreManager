import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@common/categorie';
import { HTTP_STATUS_CODES } from '@common/const';
import { Item } from '@common/item';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/services/category.service';
import { CommunicationService } from 'src/services/communication.service';
import { HistoVenteService } from 'src/services/histo-vente.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {
  @Input() category: Category = { name: '' };
  items: Item[] = [];
  venteTotaleCat: number = 0;
  subscription: Subscription = new Subscription();
  constructor(private communication: CommunicationService, private router: Router) {
  }
  async ngOnInit() {
    await this.getItemsByCat(this.category.id as string);
  }


  async getItemsByCat(catId: string) {
    this.subscription= this.communication.getItemsByCat(catId).subscribe((res) => {
      if (res.status === HTTP_STATUS_CODES.OK) {
        this.items = res.body as Item[];
        console.log(this.category.name);
        console.log(this.items);
      }
    });

  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log("subscription unsubscribed");
  }
}
