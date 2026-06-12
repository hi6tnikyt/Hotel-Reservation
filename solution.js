let reservation = {
    startDate: null, endDate: null, guestsCount: 0,
    roomType: null, name: null, phone: null, email: null
};

document.addEventListener('DOMContentLoaded', () => {
    changeContent('search-form-content');

    document.querySelector('#search-form-button').addEventListener('click', searchFormData);
    document.querySelector('#search-back-btn').addEventListener('click', fillSearchForm);
    document.querySelector('#search-next-btn').addEventListener('click', findRoom);
    
    document.querySelectorAll('.room-type').forEach(room => {
        room.addEventListener("click", selectRoomType);
    });
});

function changeContent(className) {
    document.querySelectorAll('.custom-form').forEach(div => div.classList.add('hidden'));
    let el = document.querySelector(`.${className}`);
    if (el) el.classList.remove('hidden');
}

function searchFormData(e) {
    e.preventDefault();
    const data = e.target.parentElement;
    const checkIn = data.querySelector('#check-in').value;
    const checkOut = data.querySelector('#check-out').value;
    const people = data.querySelector('#people').value;

    if (checkIn && checkOut && people && new Date(checkIn) <= new Date(checkOut)) {
        reservation.startDate = checkIn;
        reservation.endDate = checkOut;
        reservation.guestsCount = people;
        changeContent('search-result-form-content');
    }
}

function fillSearchForm(e) {
    e.preventDefault();
    changeContent('search-form-content');
    document.querySelector('#check-in').value = reservation.startDate;
    document.querySelector('#check-out').value = reservation.endDate;
    document.querySelector('#people').value = reservation.guestsCount;
}

function selectRoomType(e) {
    let myTarget = e.currentTarget;
    document.querySelectorAll('.room-type').forEach(room => room.classList.remove('selected-room'));
    myTarget.classList.add('selected-room');
}

function findRoom(e) {
    e.preventDefault();
    const selected = document.querySelector('.selected-room');
    if (selected) {
        reservation.roomType = selected.querySelector('h4').textContent;
        changeContent('guest-details-form-content');
    }
}

document.querySelector('#guest-details-back-btn').addEventListener('click', (e) => fillRoomForm(e));

function fillRoomForm(e) {
    e.preventDefault();
    changeContent('search-result-form-content');
}

document.querySelector('#guest-details-next-btn').addEventListener('click', (e) => getPersonalData(e));

function getPersonalData(e) {
    e.preventDefault();
    const data = e.target.parentElement.parentElement;

    const name = data.querySelector('#name').value;
    const phone = data.querySelector('#phone-number').value;
    const email = data.querySelector('#email').value;

    if (name != '' && phone != '' && email != '') {
        reservation.name = name;
        reservation.phone = phone;
        reservation.email = email;
        console.log(reservation);
        changeContent('confirm-reservation-content');
        fillConfirmReservationData(reservation);
    }
}

function fillConfirmReservationData(customReservation) {
    document.querySelector('.confirm-reservation #guest-name').textContent = `Name: ${customReservation.name}`;
    document.querySelector('.confirm-reservation #guest-phone').textContent = `Phone Number: ${customReservation.phone}`;
    document.querySelector('.confirm-reservation #guest-email').textContent = `Email: ${customReservation.email}`;
    document.querySelector('.confirm-reservation #guest-room-type').textContent = `Room Type: ${customReservation.roomType}`;
    document.querySelector('.confirm-reservation #guest-data-in').textContent = `Date-in: ${customReservation.startDate}`;
    document.querySelector('.confirm-reservation #guest-data-out').textContent = `Date-out: ${customReservation.endDate}`;
}

document.querySelector('#confirm-back-btn').addEventListener('click', (e) => getBackToPersonalData(e));

function getBackToPersonalData(e) {
    e.preventDefault();
    changeContent('guest-details-form-content');
}


document.querySelector('#confirm-reservation').addEventListener('click', (e) => showThanksPage(e));

function showThanksPage(e) {
    e.preventDefault();
    changeContent('thank-you-content');
}