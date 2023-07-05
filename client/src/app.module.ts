import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './module/app-routing.module';
import { AppComponent } from './pages/app/app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InventairePageComponent } from './pages/inventaire-page/inventaire-page.component';
import { HistoVentePageComponent } from './pages/histo-vente-page/histo-vente-page.component';
import { FinancePageComponent } from './pages/finance-page/finance-page.component';
import { TransactionPageComponent } from './pages/transaction-page/transaction-page.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { ItemComponent } from './components/item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { CategorieCarrousselComponent } from './components/categorie-carroussel/categorie-carroussel.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavBarComponent,
    InventairePageComponent,
    HistoVentePageComponent,
    FinancePageComponent,
    TransactionPageComponent,
    CategorieComponent,
    ItemComponent,
    CategorieCarrousselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
