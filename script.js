//dark mode

const toggle = document.getElementById ('toggledark');
const body = document.querySelector ('body');
const lightning = document.getElementById('lightning');

toggle.addEventListener ('click', function () {
    this.classList.toggle('bi-sun-fill');
    if(this.classList.toggle('moon-stars-fill')){
        body.style.transition = '.25s';
        body.style.background = 'black';
        body.style.color = 'white';
        body.style.fill = 'black';
        lightning.style.fill = 'white';
        cursor.style.background = 'white';
    } else {
        body.style.transition = '.25s';
        body.style.background = 'white';
        body.style.color = 'black'
        body.style.fill = 'white';
        lightning.style.fill = 'black';
        cursor.style.background = 'black';

    }
})

//game

const words = 'Broaden your perspective by approaching life with an open mind Gain the power to accept situations as they are Reap the joy that comes from progress You come to the realization that you have been sold'.split(' ');
const wordsCount = words.length;

function addClass(el, className) {
    el.className += ' ' + className;
}

function removeClass(el, className) {
    el.classList.remove(className);
}

function randomWord() {
    const randomIndex = Math.floor(Math.random() * wordsCount);
    return words[randomIndex - 1];
}

function formatWord(word) {
    if (typeof word !== 'undefined') {
        return `<div class="word">
            <span class="letter">${word.split('').join('</span><span class="letter">')}</span>
        </div>`;
    }
    return ''; // Return an empty string if the word is undefined
}

function newGame() {
    const wordsContainer = document.getElementById('words');
    wordsContainer.innerHTML = '';
    for (let i = 0; i < 200; i++) {
        wordsContainer.innerHTML += formatWord(randomWord());
    }

    // Add the "current" class to the first word and letter
    const firstWord = wordsContainer.querySelector('.word');
    const firstLetter = firstWord.querySelector('.letter');
    addClass(firstWord, 'current');
    addClass(firstLetter, 'current');
}

document.getElementById('game').addEventListener('keydown', ev => {
    const key = ev.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackspace = key === 'Backspace';
    const isFirstLetter = currentLetter

    console.log({ key, expected });

    if (isLetter) {
        if (currentLetter) {
            addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
            removeClass(currentLetter, 'current');
            if (currentLetter.nextSibling) {
                addClass(currentLetter.nextSibling, 'current');
            } }
            else {
                // If there are no more letters in the current word, move to the next word
                const incorrectLetter = document.createElement('span');
                incorrectLetter.innerHTML = key ;
                incorrectLetter.className = 'letter incorrect extra';
                currentWord.appendChild(incorrectLetter);
                }
            } 
        
    

    if (isSpace) {
        if (expected !== ' ') {
            const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            lettersToInvalidate.forEach(letter => {
                addClass(letter, 'incorrect');
            });
        }
        removeClass(currentWord, 'current');
        addClass(currentWord.nextSibling, 'current');
        if (currentLetter) {
            removeClass(currentLetter, 'current');
        }
        addClass(currentWord.nextSibling.querySelector('.letter'), 'current');
    }

    if (isBackspace) {
        if (currentLetter && isFirstLetter) {
          // Move to the previous word and its last letter
          const previousWord = currentWord.previousSibling;
          if (previousWord) {
            const lastLetter = previousWord.querySelector('.letter:last-child');
            removeClass(currentLetter, 'current');
            removeClass(currentWord, 'current');
            addClass(previousWord, 'current');
            addClass(lastLetter, 'current');
            removeClass(lastLetter, 'incorrect');
            removeClass(lastLetter, 'correct');
          } else {
            // Reset the current word and its first letter as current
            removeClass(currentLetter, 'current');
            removeClass(currentWord, 'current');
            addClass(currentWord, 'current');
            addClass(currentWord.querySelector('.letter'), 'current');
            removeClass(currentWord.querySelector('.letter'), 'incorrect');
            removeClass(currentWord.querySelector('.letter'), 'correct');
          }
        }
      
        if (currentLetter && !isFirstLetter) {
          // Move back one letter and invalidate it
          const previousLetter = currentLetter.previousSibling;
          if (previousLetter) {
            removeClass(currentLetter, 'current');
            addClass(previousLetter, 'current');
            removeClass(previousLetter, 'incorrect');
            removeClass(previousLetter, 'correct');
          }
        }
      }
      
      
      

    //move cursor
    const nextLetter = document.querySelector('.letter.current')
    const nextWord = document.querySelector('.word.current')
    const cursor = document.getElementById('cursor')
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top +'px';
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';
    
});

newGame();

