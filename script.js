
// Event listener yo kugenzura niba section ibonetse kuri screen
const sections = document.querySelectorAll('.fade-in');

const showSection = () => {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const boxTop = section.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      section.classList.add('show');
    } else {
      section.classList.remove('show');
    }
  });
};

window.addEventListener('scroll', showSection);
showSection();



const learnBtn = document.getElementById("learnMore");
const modal = document.getElementById("infoModal");
const closeBtn = document.querySelector(".close");

learnBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Iyo ukande hanze ya modal, irafunga
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
// ===== Typing Animation Effect =====
const textArray = [ 
  " Aldo Serge NTWARI,",
  " DJ & Web Developer,",
  " Technology Enthusiast,",
  " Creative Thinker 🎧,"
];

let typingDelay = 150;   // Igihe hagati y’inyuguti n’indi (ms)
let erasingDelay = 80;   // Igihe cyo gusiba inyuguti imwe (ms)
let newTextDelay = 1500; // Pause mbere yo gutangira andi magambo
let textIndex = 0;
let charIndex = 0;

const typedTextSpan = document.getElementById("typedText");

function type() {
  if (charIndex < textArray[textIndex].length) {
    typedTextSpan.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textIndex++;
    if (textIndex >= textArray.length) textIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

// Tangira animation iyo page ifungutse
document.addEventListener("DOMContentLoaded", () => {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});
