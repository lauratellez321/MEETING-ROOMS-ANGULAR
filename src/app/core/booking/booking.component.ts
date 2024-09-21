import { Component, OnInit } from '@angular/core';
import { format, addDays } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Booking,
  RequestService,
} from 'src/app/service/request/request-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  booking: Booking[] = [];
  form: FormGroup;

  tomorrow = new Date();
  tomorrowFormatted: any;
  tomorrowFormattedData: string = '';
  dayAfterTomorrow = new Date();
  dayAfterTomorrowFormatted: any;
  dayAfterTomorrowFormattedData: string = '';

  constructor(private fb: FormBuilder, private requestService: RequestService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      estado: [false, Validators.required],
    });
    this.getDays();
  }

  getDays() {
    this.tomorrow = addDays(new Date(), 1);
    this.tomorrowFormatted = format(
      this.tomorrow,
      'MMMM d, yyyy'
    ).toUpperCase();
    this.tomorrowFormattedData = format(this.tomorrow, 'dd/MM/yyyy');
    this.dayAfterTomorrow = addDays(new Date(), 2);
    this.dayAfterTomorrowFormatted = format(
      this.dayAfterTomorrow,
      'MMMM d, yyyy'
    ).toUpperCase();
    this.dayAfterTomorrowFormattedData = format(
      this.dayAfterTomorrow,
      'dd/MM/yyyy'
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const dataForm = this.form.value;
      console.log(dataForm.usuario);
    } else {
      console.log('Formulario no válido');
    }
  }

  ngOnInit(): void {
    this.requestService.getBooking().subscribe(
      (response: Booking[]) => {
        this.booking = response;
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }

  isSubmitDisable() {
    return (
      this.form.get('usuario')?.invalid ||
      this.form.get('fecha')?.invalid ||
      this.form.get('hora')?.invalid
    );
  }

  onSubmitCreateBooking() {
    console.log(this.form);

    if (this.form.valid) {
      const dataForm = this.form.value;

      const bookingData = {
        usuario: dataForm.usuario,
        fecha: dataForm.fecha,
        hora: dataForm.hora,
        estado: dataForm.estado,
        //datos_sala: dataForm.estado
      };

      this.requestService.newBooking(bookingData).subscribe((response) => {
        console.log(response);
        if (response) {
          Swal.fire({
            title: 'BUEN TRABAJO!',
            text: 'RESERVA CREADA EXITOSAMENTE.',
            icon: 'success',
            timer: 3000,
          });
        }
      });
    }
  }
}
