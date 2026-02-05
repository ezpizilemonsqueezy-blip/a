"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 6;

let play = true;
let noCount = 0;
let yakimixAsked = false;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    let imageIndex;
    if (yakimixAsked) {
      
      imageIndex = Math.min(noCount, 6) + 6;
    } else {
      
      imageIndex = Math.min(noCount, MAX_IMAGES);
    }
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  if (!yakimixAsked) {
    titleElement.innerHTML = "Yakimix at SM Dasma?";
    yakimixAsked = true;
  } else {
    titleElement.innerHTML = "Yayyyy";
    buttonsContainer.classList.add("hidden");
    yakimixAsked = false;
  }
  
  changeImage("yes");
  noCount = 0;
  play = true;
  yesButton.style.fontSize = "1.6rem";
  yesButton.innerHTML = "Yes";
  noButton.innerHTML = "No";
  
  noButton.style.display = "inline-block";
  noButton.style.pointerEvents = "auto";
  buttonsContainer.style.pointerEvents = "auto";
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "Pookie please",
    "Don't do this to me :(",
    "You're breaking my heart",
    "I'm gonna cry...",
    "Pretty please?",
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  if (image === "yes") {
    if (yakimixAsked) {
      catImg.src = `img/nailongyes1.jpeg`;
    } else {
      catImg.src = `img/nailongyes.jpeg`;
    }
  } else {
    const jpgIndices = [3, 5, 10, 11, 12];
    const ext = jpgIndices.includes(image) ? "jpg" : "jpeg";
    catImg.src = `img/nai${image}.${ext}`;
  }
}
  

function updateNoButtonText() {
  const msg = generateMessage(noCount);
  
  if (msg === "Pretty please?") {
    noButton.innerHTML = "";
    noButton.style.display = "none";
    noButton.style.pointerEvents = "none";
    buttonsContainer.style.pointerEvents = "auto";
    return;
  }

  noButton.innerHTML = msg;
}