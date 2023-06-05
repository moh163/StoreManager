import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-histo-vente-page',
  templateUrl: './histo-vente-page.component.html',
  styleUrls: ['./histo-vente-page.component.css']
})
export class HistoVentePageComponent implements OnInit {
  
  ngOnInit() {
    $(function() {
      $('input[name="daterange"]').daterangepicker({
        opens: 'left'
      }, function(start: any, end: any, label: any) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
      });
    });
  }
}
