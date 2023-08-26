import { ApplicationRef, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { end } from '@popperjs/core';
import { BehaviorSubject } from 'rxjs';
import { HistoVenteService } from 'src/services/histo-vente.service';

declare var $: any;
@Component({
  selector: 'app-histo-vente-page',
  templateUrl: './histo-vente-page.component.html',
  styleUrls: ['./histo-vente-page.component.css']
})
export class HistoVentePageComponent implements OnInit {

  timeRangeObs: BehaviorSubject<string> = new BehaviorSubject<string>("depuis le début");
  timeRange: string = "depuis le début";
  view: string = "transactions";
  constructor(public histoVenteService: HistoVenteService, private applicationRef: ApplicationRef) { 
    this.timeRangeObs.subscribe((res) => {
      this.timeRange = res;
    });
  }
  ngOnInit() {
    $(() => {
      $('input[name="daterange"]').daterangepicker({
        opens: 'left',
        maxDate: new Date()
      }, this.switchTimeRange.bind(this));
    });

    this.switchTimeRange(document.getElementById("radioAlways") as HTMLInputElement);
  }

  switchView(){
    this.view === "transactions" ? this.view = "catégorie" : this.view = "transactions";
  }
  switchEnabledDateInput(event: Event) {
    const target = event.target as HTMLInputElement
    const dateInput = document.getElementById("dateInput") as HTMLInputElement
    target.id === "radioPersonalised" ? dateInput.disabled = false : dateInput.disabled = true;
    this.switchTimeRange(target);
  }

  applyDateRange() {
    const startDate: Date = $('input[name="daterange"]').data('daterangepicker').startDate._d;
    const endDate: Date = $('input[name="daterange"]').data('daterangepicker').endDate._d;
    this.histoVenteService.getTransactionByDate(startDate, endDate);
    this.timeRangeObs.next("entre le " + startDate.toISOString().split("T")[0] + " et le " + endDate.toISOString().split("T")[0]);
  }

  switchTimeRange(input: HTMLInputElement) {
    switch (input.id) {
      case "radioAlways":
        this.timeRangeObs.next("depuis le début");
        this.histoVenteService.getTransactionByDate(new Date(0), new Date());
        break;
      case "radioAnnualy":
        this.timeRangeObs.next("depuis un an");
        console.log(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()));
        this.histoVenteService.getTransactionByDate(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()), new Date());
        break;
      case "radioMonthly":
        this.timeRangeObs.next("depuis un mois");
        this.histoVenteService.getTransactionByDate(new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()), new Date());
        break;
      case "radioWeekly":
        this.timeRangeObs.next("depuis une semaine");
        this.histoVenteService.getTransactionByDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7), new Date());
        break;
      case "radioDaily":
        this.timeRangeObs.next("dans les dernières 24h");
        this.histoVenteService.getTransactionByDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1), new Date());
        break;
      default:
      case "radioPersonalised":
        this.applyDateRange();
        break;
    }
  }

}

