const url = 'http://localhost:4000/';

export const environment = {
  apiGetRoom: url + 'getRooms',
  apiPostRoom: url + 'newRoom',
  apiPutRoom: url + 'updateRoom',
  apiDeleteRoom: url + 'deleteRoom',
  production: false,
  apiGetBooking: url + '/room/66e7617520aeb33cf0405976/getBooking',
  apiPostBooking: url + '/room/66e7617520aeb33cf0405976/newBooking',
  apiPutBooking: url + '/room/:id/updateBooking/:id',
  apiDeleteBooking: url + '/room/:id/deleteBooking/:id',
};
