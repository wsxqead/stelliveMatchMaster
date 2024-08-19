const characters = {
  cliché: ["stella_c1.jpg", "stella_c2.jpg", "stella_c3.jpg", "stella_c4.jpg"], // 클리셰 이미지 경로
  universe: [
    "stella_u1.jpg",
    "stella_u2.jpg",
    "stella_u3.jpg",
    "stella_u4.jpg",
  ], // 유니버스 이미지 경로
  mystic: ["stella_m1.jpg", "stella_m2.jpg", "stella_m3.jpg", "stella_m4.jpg"], // 미스틱 이미지 경로
  normal: [
    "stella_c1.jpg",
    "stella_c2.jpg",
    "stella_c3.jpg",
    "stella_c4.jpg",
    "stella_u1.jpg",
    "stella_u2.jpg",
    "stella_u3.jpg",
    "stella_u4.jpg",
    "stella_m1.jpg",
    "stella_m2.jpg",
  ], // 1, 2, 3기생 10명
  hard: [
    "stella_c1.jpg",
    "stella_c2.jpg",
    "stella_c3.jpg",
    "stella_c4.jpg",
    "stella_u1.jpg",
    "stella_u2.jpg",
    "stella_u3.jpg",
    "stella_u4.jpg",
    "stella_m1.jpg",
    "stella_m2.jpg",
    "stella_m3.jpg",
    "stella_m4.jpg",
  ], // 1, 2, 3기생 + 사장, 매니저 12명
};

let flippedCards = [];
let matchedCards = [];

function initializeGame(pairCount, type = "normal") {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  let selectedCharacters;
  if (pairCount === 4 && type !== "normal") {
    selectedCharacters = characters[type];
  } else if (pairCount === 10) {
    selectedCharacters = characters.normal;
  } else if (pairCount === 12) {
    selectedCharacters = characters.hard;
  }

  gameBoard.style.gridTemplateColumns = getGridTemplate(pairCount);

  const cardValues = shuffle([...selectedCharacters, ...selectedCharacters]);

  cardValues.forEach((value) => {
    const card = createCardElement(value, type);
    gameBoard.appendChild(card);
  });

  matchedCards = [];
  flippedCards = [];
}

function getGridTemplate(pairCount) {
  if (pairCount === 4) {
    return "repeat(4, 1fr)"; // 4x2 그리드
  } else if (pairCount === 10) {
    return "repeat(5, 1fr)"; // 5x4 그리드
  } else if (pairCount === 12) {
    return "repeat(6, 1fr)"; // 6x4 그리드
  }
}

function createCardElement(value, type) {
  const card = document.createElement("div");
  card.classList.add("card", type);

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  const imgFront = document.createElement("img");
  imgFront.src = value;
  imgFront.alt = "Character Image";
  cardFront.appendChild(imgFront);

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  const imgBack = document.createElement("img");
  imgBack.src = "img/favicon.png"; // 카드 뒷면에 표시할 로고 이미지 경로
  imgBack.alt = "Logo";
  cardBack.appendChild(imgBack);

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  card.addEventListener("click", () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (
    flippedCards.length < 2 &&
    !card.classList.contains("flipped") &&
    !card.classList.contains("matched")
  ) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (
    card1.querySelector(".card-front img").src ===
    card2.querySelector(".card-front img").src
  ) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }, 1000);
  }

  flippedCards = [];

  if (matchedCards.length === card1.closest(".game-board").children.length) {
    setTimeout(() => alert("축하합니다! 모든 카드를 맞추셨습니다!"), 500);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
