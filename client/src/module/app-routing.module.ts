import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancePageComponent } from 'src/pages/finance-page/finance-page.component';
import { HistoVentePageComponent } from 'src/pages/histo-vente-page/histo-vente-page.component';
import { InventairePageComponent } from 'src/pages/inventaire-page/inventaire-page.component';
import { MainPageComponent } from 'src/pages/main-page/main-page.component';
import { TransactionPageComponent } from 'src/pages/transaction-page/transaction-page.component';

const routes: Routes = [ 
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: MainPageComponent },
{ path: 'inventaire', component: InventairePageComponent },
{ path: 'histoVente', component: HistoVentePageComponent },
{ path: 'finance', component: FinancePageComponent },
{ path: 'transaction', component: TransactionPageComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
