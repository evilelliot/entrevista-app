import { Component, EventEmitter, Output } from '@angular/core';
import { NgxPaginationModule, PaginationControlsDirective } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

const apiUrl = 'http://localhost:3000/users/list';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
  objetos: any[] = [];
  p: number = 1;
  
  constructor(private http: HttpClient, private dataService: DataService) { }
  
  ngOnInit() {
    this.http.get(apiUrl).subscribe((data: any) => {
      this.objetos = data.data.raw;
      console.log(this.objetos);
    });
  }

  cargarDatos(item: any) {
    this.dataService.setData(item); // Envía los datos al servicio
    // console.log("From UsersTableComponent", item);
  }
}
