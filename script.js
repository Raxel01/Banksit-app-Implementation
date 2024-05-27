'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements){

  containerMovements.innerHTML = '';
  movements.forEach(function(elem, i){
    const type = elem > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type} </div>
    <div class="movements__value">${elem}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const user = 'Steven Thomas Williams';

const createUsernames = function (global_accounts){
  global_accounts.forEach(function(account){
    account.username = account.owner.toLowerCase().split(' ').map(function(entity){
      return entity.slice(0, 1);
    }).join('');
  })
};

createUsernames(accounts);

const calcDisplayBalance = function (acc){
const balance = acc.movements.reduce((acc , current) => acc += current, 0);
acc.balance = balance;
labelBalance.textContent = `${balance} EUR`;
}

const calcDisplaySummary = function (acco){

    const incomes = acco.movements.filter(mov=> mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}€`;
  
    const deposits = acco.movements.filter(function(current){
      return current < 0;
    }).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(deposits)}€`;

  const interest = acco.movements.filter(mov=> mov > 0).map( deposit => 
    (deposit * acco.interestRate) / 100).filter((int, i , arr)=> int >= 1).reduce((acc, mov) => acc + mov, 0);
    labelSumInterest.textContent = `${Math.abs(interest)}€`;
}

let currentAccount = 0;
btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username  === inputLoginUsername.value)
  if (currentAccount?.pin === Number(inputLoginPin.value)){  
      // console.log('TruE Pin')
      labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ').at(0)}`;
      containerApp.style.opacity = 100;
      inputLoginPin.value = '';
      inputLoginUsername.value = '';
      displayMovements(currentAccount.movements)   ;
      calcDisplayBalance(currentAccount) ;
      calcDisplaySummary(currentAccount);

  }
});


btnTransfer.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find( acc=> acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (receiver && amount > 0 && currentAccount.balance >= amount && receiver.owner !== currentAccount.owner){
    currentAccount.movements.push(amount * -1);
    receiver.movements.push(amount);
    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount);
    calcDisplaySummary(currentAccount);
  }
})

btnLoan.addEventListener('click', function(e){

  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){

    currentAccount.movements.push(amount);
    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount);
    calcDisplaySummary(currentAccount);
  }

});

btnClose.addEventListener('click', function(e){
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
  }

})
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(function(obj){ obj.recommendedFood = obj.weight ** 0.75 * 28; });

// 2.

let containSara = dogs.map(function(Dogobj, index){
  if (Dogobj.owners.includes('Sarah')){
    return Dogobj;
  }
}).filter(function(current){
  if (current)
    return current;
}).map(function(current){
  if (current.curFood > current.recommendedFood)
      console.log(`The Sara Dogs at To-Mush`);
  else
    console.log(`The Sara Dogs at To-Little`);
});

// 3.

let ownersEatTooMuch = [];
let ownersEatTooLittle = [];

dogs.map(function(currentOBJ){
  if (currentOBJ.curFood > currentOBJ.recommendedFood)
    ownersEatTooMuch.push(...currentOBJ.owners);
  else
    ownersEatTooLittle.push(...currentOBJ.owners);
  });

  const Dogownerseatmush = ownersEatTooMuch.join(' and ')+ '\'s Eat to mush' ;
  const DogownersitLittle = ownersEatTooLittle.join(' and ') +'\'s Eat to Little';
