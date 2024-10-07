const dialogContainer = document.querySelector('.dialog-container')
const dialogBlock = document.querySelector('.dialog-block')
const container = document.querySelector('.container')

document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem('like')){
addLike()
    }
})

const addLike = () =>{
    container.innerHTML+=`
      <button class="button button-like" onclick="setLike()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      Падабайка
    </button>
      `
}


const openDialog= ((action)=> {
    dialogContainer.style.display = 'flex';
    dialogBlock.innerHTML = action
});

const addSentForm = ()=>{
    return `
          <h2>Дадаць рэкламу</h2>
               <p class="dialog-subtitle">Пакіньце дадзеныя каб мы маглі з вамі звязацца</p>
                <label for="name-input"></label><input type="text" placeholder="Iмя" class="input" id="name-input"/>
      <label for="email-input"></label><input type="email" placeholder="Ваш email" class="input" id="email-input"/>
      <button class="button ad-button" onclick="sentContactData()">
        <svg viewBox="0 0 495.003 495.003" xml:space="preserve">
<g>
\t<path d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616
\t\tl-67.6-32.22V456.687z"/>
  <path d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422
\t\tc-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414
\t\tl156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956
\t\tL494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"/>
</g>
</svg>
        Даслаць
      </button>
    `
}

const addDonationForm = ()=>{
    return `      <h2>Падтрымайце праект</h2>
      <p class="donation-subtitle">Выберыце суму для Даната:</p>
      <div class="donation-options">
        <button class="donation-button" data-amount="100">5€</button>
        <button class="donation-button" data-amount="200">10€</button>
        <button class="donation-button" data-amount="500">25€</button>
        <button class="donation-button" data-amount="1000">50€</button>
        <input type="number" id="custom-amount" placeholder="Іншая сума" min="1" />
      </div>
      <button class="button" id="support-button">Падтрымаць</button>`
}

const addSuccessMessage =()=>{
    return `
      <h3 class="dialog-message-title">Дзякуй!</h3>
      <h4 class="dialog-message-subtitle">Дадзеныя паспяхова адпраўлены</h4>
`
}


const closeDialog= ()=> {
    dialogContainer.style.display = 'none';
};

const sentContactData = ()=> {
    const email = document.querySelector('#email-input').value;
    const name = document.querySelector('#name-input').value;
    if (email) {
        openDialog(addSuccessMessage())
    } else {
        closeDialog()
    }
};

const setLike= ()=>{
    localStorage.setItem('like', 'true')
    container.lastElementChild.remove()
}
