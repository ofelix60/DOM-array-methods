const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillioniresBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = [];


getRandomUser();
getRandomUser();
getRandomUser();
// updateUI(data);


// FUNCTIONS

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1500000)
    };
    addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM()
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong>$${item.money.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`
        main.appendChild(element)
    })
}

function doubleMoney() {
    const newObj = [];
    Object.values(data).map(el => {
        const newUser = {
            name: el.name,
            money: el.money * 2
        };
        newObj.push(newUser)
    })
    data = newObj
    updateDOM(newObj)
}



function showOnlyMillionaires() {
    const newObj = []
    Object.values(data).filter(el => {
        if (el.money >= 1000000) {
            const newUser = {
                name: el.name,
                money: el.money
            }
            newObj.push(newUser)
        }
        data = newObj
        updateDOM(newObj)

    })
}


function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM()
}



function calcEntireWealth() {
    const initialValue = 0;
    let sum = data.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.money
    }, initialValue)
    const element = document.createElement('div');
    element.classList.add('person')
    element.innerHTML = `<strong>Total:</strong><strong>$${sum.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</strong>`
    main.appendChild(element)
}

// Listen for Add User/ wealth btn click
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
showMillioniresBtn.addEventListener('click', showOnlyMillionaires)
sortBtn.addEventListener('click', sortByRichest)
calculateWealthBtn.addEventListener('click', calcEntireWealth)
