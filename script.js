
let listOfEvents = JSON.parse(localStorage.getItem('mySavedLifeEvents')) || [];
const showEventsOnScreen = () => {
    const displayArea = document.getElementById('displayArea');
    displayArea.innerHTML = '';

    
    listOfEvents.sort((first, second) => {
        return new Date(`${first.eventDate} ${first.eventTime}`) - new Date(`${second.eventDate} ${second.eventTime}`);
    });

    listOfEvents.forEach((item) => {
        const eventWrapper = document.createElement('div');
        eventWrapper.className = 'single-event';
        
        eventWrapper.innerHTML = `
            <div class="event-box">
                <div class="event-details">
                    <span>${item.eventDate} <b class="time-display">at ${item.eventTime}</b></span>
                    <h3>${item.eventTitle}</h3>
                </div>
                <button class="remove-button" onclick="deleteItem(${item.id})">Delete</button>
            </div>
        `;
        displayArea.appendChild(eventWrapper);
    });

    localStorage.setItem('mySavedLifeEvents', JSON.stringify(listOfEvents));
};

const addNewItem = () => {
    const titleInput = document.getElementById('userInputTitle');
    const dateInput = document.getElementById('userInputDate');
    const timeInput = document.getElementById('userInputTime'); // New input

    if (titleInput.value === "" || dateInput.value === "" || timeInput.value === "") {
        alert("Please fill in the title, date, and time! ⏰");
        return;
    }

    const newEventObject = {
        id: Date.now(),
        eventTitle: titleInput.value,
        eventDate: dateInput.value,
        eventTime: timeInput.value
    };

    listOfEvents.push(newEventObject);
    showEventsOnScreen();

    // Reset inputs
    titleInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
};


const deleteItem = (uniqueId) => {
    listOfEvents = listOfEvents.filter(item => item.id !== uniqueId);
    showEventsOnScreen();
};
document.getElementById('saveButton').addEventListener('click', addNewItem);
showEventsOnScreen();