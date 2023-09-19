import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';
  
  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  // Configura los encabezados en la solicitud POST
  private options = { headers: this.headers };

  nuevoUsuario(user: any) {
    return this.http.post(`${this.baseUrl}/new`, user, this.options);
  }

  actualizarUsuario(user: any) {
    return this.http.put(`${this.baseUrl}/update`, user, this.options);
  }

  eliminarUsuario(id: number) {
    return this.http.delete(`${this.baseUrl}/delete`, { params: { id: id.toString() } });
  }

  buscarUsuario(id: number) {
    return this.http.get(`${this.baseUrl}/list/${id}`);
  }  
}
