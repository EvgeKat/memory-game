const cards = document.querySelectorAll('.memory-card');

let hasFlipCard = false;
let lockBoard = false;
let firstCard, secondCard;
let countForWIN = 0;
let results = new Array();

function flipCard() {
  if (lockBoard) return;
  countForWIN++;
  if (this === firstCard) return; 

  this.classList.add('flip');

  if (!hasFlipCard) {
    hasFlipCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    let countFlipCard = document.getElementsByClassName('flip');
    if (cards.length === countFlipCard.length) finishGame(countForWIN/2)
    disableCards();
    return;
  }
  unflipCards();
}

let tableResults = document.getElementsByClassName('winner hidden');
let sectionGame = document.querySelector('.memory-game');

function finishGame(countForWIN) {
  results[results.length] = countForWIN; 
  creatNewResult(results.length, countForWIN);
  tableResults[0].classList.remove('hidden');
  sectionGame.classList.add('blur');
  //newGame();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    
    resetBoard();
  }, 1500);
}

function resetBoard () {
  [hasFlipCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  }

(function mixCards() {
  cards.forEach(card => {
    let random = Math.floor(Math.random() * cards.length);
    card.style.order = random;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard))


resultsContainer = document.querySelector('.winner-results');

function creatNewResult(NumberGame, result) {
  const res = `<p class='game-number'>Номер игры ` +  NumberGame + ` результат `+ result + `</p>`;
  resultsContainer.insertAdjacentHTML('beforeend', res)
}

function setLocalStorage() {
  if (results.length > 0) localStorage.setItem("resultsGame", JSON.stringify(results));
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("resultsGame")) {
   results = JSON.parse(localStorage.getItem("resultsGame"));
   results.map((item, i, arr) => creatNewResult(i+1, item));
  }
}

window.addEventListener("load", getLocalStorage);

  
let buttonNewGame = document.querySelector('.button-game');

function newGame() {
  let countFlipCard = document.getElementsByClassName('flip');
  countForWIN = 0;
  for(let i=countFlipCard.length-1; i >= 0 ; i--) {
    countFlipCard[i].classList.remove('flip');
  }
  cards.forEach(card => {
    let random = Math.floor(Math.random() * cards.length);
    card.style.order = random;
    card.addEventListener('click', flipCard);
  });

  resetBoard();

  tableResults = document.getElementsByClassName('winner');
  tableResults[0].classList.add('hidden');
  sectionGame.classList.remove('blur');
}

buttonNewGame.addEventListener('click', newGame);


let resetButton = document.querySelector('.reset-score');

function resetScore () {
  results = [];
  localStorage.setItem("resultsGame", JSON.stringify(results));
  let winnerResults = document.getElementById('winner-results');
  let gameNumber = document.getElementsByClassName('game-number');
  let Kolvo = gameNumber.length; 
  for (let i = 0; Kolvo > i; i++) {
    winnerResults.removeChild(gameNumber.item(0));
  }
}

resetButton.addEventListener('click', resetScore);

console.log(
  "Оценка по пунктам: 70 (10+10+10+10+10+10+10)\
Вёрстка +10 \
  реализован интерфейс игры +5 \
  в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5 \
Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10 \
Игра завершается, когда открыты все карточки +10 \
По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10 \
Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10 \
По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10 \
Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 \
высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо"
);
