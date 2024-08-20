const characters = {
  cliché: [
    "stella/stella_c1.png",
    "stella/stella_c2.png",
    "stella/stella_c3.png",
    "stella/stella_c4.png",
  ],
  universe: [
    "stella/stella_u1.png",
    "stella/stella_u2.png",
    "stella/stella_u3.png",
    "stella/stella_u4.png",
  ],
  mystic: [
    "stella/stella_m1.png",
    "stella/stella_m2.png",
    "stella/stella_m3.png",
    "stella/stella_m4.png",
  ],
  normal: [
    "stella/stella_c1.png",
    "stella/stella_c2.png",
    "stella/stella_c3.png",
    "stella/stella_c4.png",
    "stella/stella_u1.png",
    "stella/stella_u2.png",
    "stella/stella_u3.png",
    "stella/stella_u4.png",
    "stella/stella_m1.png",
    "stella/stella_m2.png",
  ],
  hard: [
    "stella/stella_c1.png",
    "stella/stella_c2.png",
    "stella/stella_c3.png",
    "stella/stella_c4.png",
    "stella/stella_u1.png",
    "stella/stella_u2.png",
    "stella/stella_u3.png",
    "stella/stella_u4.png",
    "stella/stella_m1.png",
    "stella/stella_m2.png",
    "stella/stella_m3.png",
    "stella/stella_m4.png",
  ],
};

let flippedCards = [];
let matchedCards = [];

function initializeGame(pairCount, type = "normal") {
  const gameBoard = document.getElementById("game-board");
  const body = document.body; // body 요소를 가져옴
  gameBoard.innerHTML = "";

  if (pairCount === 4) {
    gameBoard.classList.add("easy");
    body.classList.add("easy-mode"); // 쉬운 난이도에서 easy-mode 클래스 추가
  } else {
    gameBoard.classList.remove("easy");
    body.classList.remove("easy-mode"); // 쉬운 난이도 이외의 경우 클래스 제거
  }

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

    // 매칭된 카드의 이벤트 리스너를 비활성화하여 더 이상 클릭되지 않도록 처리
    // card1.removeEventListener("click", flipCard);
    // card2.removeEventListener("click", flipCard);
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
