const url = 'http://localhost:3000';

export const environment = {
  apiGetRoom: url + '/getRooms',
  apiPostRoom: url + '/newRoom',
  apiPutRoom: url + '/updateRoom',
  apiDeleteRoom: url + '/deleteRoom',
  production: false,
  apiGetBooking: url + '/room/66eed72eda24c3832a15b74c/getBooking',
  apiPostBooking: url + '/room/66eed72eda24c3832a15b74c/newBooking',
  apiPutBooking: url + '/room/66eed72eda24c3832a15b74c/updateBooking/:id',
  apiDeleteBooking: url + '/room/66eed72eda24c3832a15b74c/deleteBooking/:id',
};
