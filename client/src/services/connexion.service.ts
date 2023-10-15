import { Injectable } from '@angular/core';
import { connect } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  connected:boolean = false;
  constructor() { }
}
