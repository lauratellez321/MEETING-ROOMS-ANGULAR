import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      estado: ['', Validators.required],
      opciones: ['', Validators.required],
      aceptar: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const dataForm = this.form.value;
      console.log(dataForm.usuario);
    } else {
      console.log('Formulario no válido');
    }
  }

  ngOnInit(): void {}
}
