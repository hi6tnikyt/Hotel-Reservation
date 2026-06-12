let reservation = {
    startDate: null, endDate: null, guestsCount: 0,
    roomType: null, name: null, phone: null, email: null
};

document.addEventListener('DOMContentLoaded', () => {
    // Начално състояние
    changeContent('search-form-content');

    // Листъри
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