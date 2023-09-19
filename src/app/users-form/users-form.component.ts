import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { UserService } from '../user-service.service';
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  formData: any = {
    nombre: '', // Inicializa los campos con valores por defecto
    email: '',
    edad: null,
    sexo: null
  };
  selectedID : number = 0;
  constructor(private dataService: DataService, private userService: UserService) { }
  isUpdating : boolean = false;
  ngOnInit() {
    this.dataService.getData().subscribe((data: any) => { 
      this.formData = data || {};
      switch(this.formData.sexo){
        case 'Male':
          this.formData.sexo = 0;
          break;
        case 'Female':
          this.formData.sexo = 1;
          break;
        default:
          this.formData.sexo = 2;
      }
      this.selectedID = this.formData.id;
    });
  }
  nuevoUsuario() {
    var formDataSend = {};
    this.selectedID = this.formData.id;
    if(this.selectedID == undefined){
      // Registrar nuevo usuario
      if(this.formData.nombre && this.formData.edad && this.formData.email && this.formData.sexo){
        // Aquí se registra si se validó el form
        formDataSend = {
          "nombre" : this.formData.nombre,
          "email" : this.formData.email,
          "edad" : this.formData.edad,
          "sexo" : this.formData.sexo
        };
        this.userService.nuevoUsuario(formDataSend).subscribe(
          (response) => {
            console.log("yea");
          },
          (error) => {
            console.error(error);
          }
        );
      }else{
        console.log('Form invalido');
      }
    }else{
      // Actualizar usuario
      formDataSend = {
        "id": this.formData.id,
        "nombre" : this.formData.nombre,
        "email" : this.formData.email,
        "edad" : this.formData.edad,
        "sexo" : this.formData.sexo.toString()
      };
      console.log(formDataSend);
      this.userService.actualizarUsuario(formDataSend).subscribe(
        (response) => {
          console.log("yea, actualizado");
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  eliminarUsuario(){
    if(this.selectedID){
      this.formData = { "id": this.selectedID };

      this.userService.eliminarUsuario(this.formData).subscribe(
        (response) => {
          console.log("yea, borrado");
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      console.log("Nada que eliminar");
    }
  }
}
