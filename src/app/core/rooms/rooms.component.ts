import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  RequestService,
  Room,
} from 'src/app/service/request/request-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  inputNameRoom!: string;
  inputLocationRoom!: string;
  inputCapacityRoom!: number;
  inputResources!: string;
  inputState!: boolean;
  form: FormGroup;
  floors: number[] = [];

  constructor(private requestService: RequestService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidad: [0, [Validators.required, Validators.min(1)]],
      rcs_proyector: [false],
      rcs_pizarra: [false],
      rcs_computador: [false],
      rcs_tv: [false],
      estado: [false],
    });
    this.floors = [1, 2, 3, 4];
  }

  ngOnInit(): void {
    this.requestService.getRooms().subscribe(
      (response: Room[]) => {
        this.rooms = response;
      },
      (error) => {
        console.error('Error al obtener las salas:', error);
      }
    );
  }

  isSubmitDisable() {
    return (
      this.form.get('nombre')?.invalid ||
      this.form.get('ubicacion')?.invalid ||
      this.form.get('capacidad')?.invalid
    );
  }

  onSubmitCreateRoom() {
    if (this.form.valid) {
      const dataForm = this.form.value;

      const roomData = {
        nombre_sala: dataForm.nombre,
        ubicacion: 'piso ' + dataForm.ubicacion,
        capacidad: dataForm.capacidad,
        recursos_disponibles: [
          { proyector: dataForm.rcs_proyector },
          { pizarra: dataForm.rcs_pizarra },
          { computador: dataForm.rcs_computador },
          { tv: dataForm.rcs_tv },
        ],
        estado: dataForm.estado,
      };

      this.requestService.newRoom(roomData).subscribe((response) => {
        console.log(response);
        if (response) {
          Swal.fire({
            title: 'BUEN TRABAJO!',
            text: 'SALA CREADA EXITOSAMENTE.',
            icon: 'success',
            timer: 3000,
          });
        }
      });
    }
  }
}
