import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private datosSeleccionadosSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setData(datos: any) {
    this.datosSeleccionadosSubject.next(datos);
  }

  getData(): Observable<any> {
    return this.datosSeleccionadosSubject.asObservable();
  }
}
