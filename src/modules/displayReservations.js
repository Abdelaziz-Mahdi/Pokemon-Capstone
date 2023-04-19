import ReservationsCounter from './reservationsCounter.js';

/* Involvement Api */
const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/tngK8NfXluNWvAs7EHbF/reservations';

/* Getting reservations list from the Involvement API */
const DisplayReservations = async () => {
  const cardContainers = document.querySelectorAll('.card');
  cardContainers.forEach((card) => {
    const reservationsTitle = card.querySelector('.reservation-title');
    const openModalBtn = card.querySelectorAll('[data-modal-target]');
    openModalBtn.forEach((btn) => {
      btn.addEventListener('click', async () => {
        try {
          const res = await fetch(`${BASE_URL}?item_id=${btn.id}`);
          const data = await res.json();
          const reservationsCounter = data.length;
          const div = card.querySelector('.reservations-list');
          div.innerHTML = '';
          data.forEach((reservation) => {
            const li = document.createElement('li');
            li.innerHTML = `${reservation.date_start} - ${reservation.date_end} por ${reservation.username}`;
            div.appendChild(li);
          });
          if (reservationsCounter > 0) {
            ReservationsCounter(reservationsCounter, reservationsTitle);
          } else {
            reservationsTitle.innerHTML = 'Reservations (0)';
          }
        } catch (error) {
          const errorMessage = 'Error, try again later.';
          const errorElement = document.createElement('div');
          errorElement.innerText = errorMessage;
          document.body.appendChild(errorElement);
        }
      });
    });
  });
};

export default DisplayReservations;