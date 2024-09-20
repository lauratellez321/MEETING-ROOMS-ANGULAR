import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  RequestService,
  Room,
} from 'src/app/service/request/request-service.service';

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

  constructor(private requestService: RequestService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidad: [0, [Validators.required, Validators.min(1)]],
      rcs_proyector: [''],
      rcs_pizarra: [''],
      rcs_computador: [''],
      rcs_tv: [''],
      estado: [false],
    });

    this.clearInputs();
  }

  ngOnInit(): void {
    this.requestService.getRooms().subscribe(
      (response: Room[]) => {
        console.log(response);
        this.rooms = response;
      },
      (error) => {
        console.error('Error al obtener las salas:', error);
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const dataForm = this.form.value;
      console.log(dataForm);
    } else {
      console.log('Forulario no encontrado');
    }
  }

  isSubmitDisable() {
    return (
      this.form.get('nombre')?.invalid ||
      this.form.get('ubicacion')?.invalid ||
      this.form.get('capacidad')?.invalid
    );
  }

  clearInputs() {
    this.inputNameRoom = '';
    this.inputLocationRoom = '';
    this.inputCapacityRoom = 0;
    this.inputResources = '';
    this.inputState = true;
  }

  createRoom() {
    const roomData = {
      nombre_sala: this.inputNameRoom,
      ubicacion: this.inputLocationRoom,
      capacidad: this.inputCapacityRoom,
      recursos_disponibles: this.inputResources,
      estado: this.inputState,
    };

    this.requestService.newRoom(roomData).subscribe((response) => {
      console.log(response);
    });
  }
}
