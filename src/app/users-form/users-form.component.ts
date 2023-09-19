import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { UserService } from '../user-service.service';
import Swal from 'sweetalert2';
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
      this.selectedID = this.formData.id;
    });
  }
  nuevoUsuario() {
    var formDataSend = {};
    var sexo = "";
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
            Swal.fire({
              icon: 'success',
              title: '¡Perfecto!',
              text: `Has registrado un usuario nuevo.`
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops, ha ocurrido un error :(',
              text: 'No se pudo registrar al usuario.'
            });
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
          Swal.fire({
            icon: 'success',
            title: '¡Perfecto!',
            text: `El usuario se ha actualizado correctamente.`
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops, ha ocurrido un error :(',
            text: 'No se pudo actualizar al usuario.'
          });
        }
      );
    }
  }
  eliminarUsuario(){
    if(this.selectedID){
      this.formData = { "id": this.selectedID };

      this.userService.eliminarUsuario(this.formData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: '¡Perfecto!',
            text: `Has eliminado un usuario nuevo.`
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops, ha ocurrido un error :(',
            text: 'No se pudo eliminar al usuario.'
          });
        }
      );
    }else{
      console.log("Nada que eliminar");
    }
  }
}
