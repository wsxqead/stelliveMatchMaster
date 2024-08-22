const characters = {
  cliché: ["stella_c1", "stella_c2", "stella_c3", "stella_c4"],
  universe: ["stella_u1", "stella_u2", "stella_u3", "stella_u4"],
  mystic: ["stella_m1", "stella_m2", "stella_m3", "stella_m4"],
  normal: [
    "stella_c1",
    "stella_c2",
    "stella_c3",
    "stella_c4",
    "stella_u1",
    "stella_u2",
    "stella_u3",
    "stella_u4",
    "stella_m1",
    "stella_m2",
  ],
  hard: [
    "stella_c1",
    "stella_c2",
    "stella_c3",
    "stella_c4",
    "stella_u1",
    "stella_u2",
    "stella_u3",
    "stella_u4",
    "stella_m1",
    "stella_m2",
    "stella_m3",
    "stella_m4",
  ],
};

let flippedCards = [];
let matchedCards = [];

function showDifficultyMenu(menuType) {
  const normalMenu = document.getElementById("difficulty-selector-normal");
  const premiumMenu = document.getElementById("difficulty-selector-premium");

  if (menuType === "normal") {
    normalMenu.classList.remove("hidden");
    premiumMenu.classList.add("hidden");
  } else if (menuType === "premium") {
    normalMenu.classList.add("hidden");
    premiumMenu.classList.remove("hidden");
  }

  // 기존 게임 보드를 숨기고 새로운 게임 시작 전 intro 이미지를 다시 보여줌
  const gameBoard = document.getElementById("game-board");
  const introImage = document.getElementById("intro-image");
  gameBoard.classList.add("hidden");
  introImage.classList.remove("hidden");
}

function initializeGame(pairCount, type, difficulty) {
  const gameBoard = document.getElementById("game-board");
  const introImage = document.getElementById("intro-image");

  // 이미지 숨기고 게임 보드 보이기
  introImage.classList.add("hidden");
  gameBoard.classList.remove("hidden");

  gameBoard.innerHTML = "";

  let selectedCharacters = [];
  let extension = ".png"; // 기본 확장자 (일반)

  if (difficulty === "premium") {
    extension = ".jpg";
  }

  if (type === "normal") {
    if (pairCount === 10) {
      selectedCharacters = characters.normal;
    } else if (pairCount === 12) {
      selectedCharacters = characters.hard;
    }
  } else {
    selectedCharacters = characters[type];
  }

  // 이미지 경로에 확장자를 추가하여 카드 쌍을 생성
  const cardValues = shuffle(
    [...selectedCharacters, ...selectedCharacters].map(
      (char) => `stella/${char}${extension}`
    )
  );

  gameBoard.style.gridTemplateColumns = getGridTemplate(pairCount);

  cardValues.forEach((value) => {
    const card = createCardElement(value, type);
    gameBoard.appendChild(card);
  });

  matchedCards = [];
  flippedCards = [];
}

function getGridTemplate(pairCount) {
  if (pairCount === 4) {
    return "repeat(4, 1fr)";
  } else if (pairCount === 10) {
    return "repeat(5, 1fr)";
  } else if (pairCount === 12) {
    return "repeat(6, 1fr)";
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
  imgBack.src = "stella/favicon.png"; // 카드 뒷면에 표시할 로고 이미지 경로
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
      setTimeout(checkForMatch, 1000); // 매칭 여부를 확인하기 전에 1초 딜레이
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

    // 매칭된 카드에 대해 flipped 상태를 유지
    card1.classList.add("flipped");
    card2.classList.add("flipped");
  } else {
    // 매칭되지 않은 경우 다시 뒤집기
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];

  // 모든 카드가 매칭되었을 때 축하 메시지 출력
  if (matchedCards.length === document.querySelectorAll(".card").length) {
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
