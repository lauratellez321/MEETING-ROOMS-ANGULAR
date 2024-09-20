import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './core/rooms/rooms.component';
import { BookingComponent } from './core/booking/booking.component';

const routes: Routes = [
  { path: '', component: RoomsComponent },
  { path: 'room', component: BookingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
