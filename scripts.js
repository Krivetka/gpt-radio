const dialogContainer = document.querySelector('.dialog-container')
const dialogBlock = document.querySelector('.dialog-block')
const container = document.querySelector('.container')
const audioPlayer = document.querySelector('.audioPlayer');
const spikes = document.querySelectorAll('.spike')


const audioControl = ()=> {
    if (audioPlayer.paused) {
        audioPlayer.play();
        spikes.forEach(spike => spike.classList.add('spike-active'));
    } else {
        audioPlayer.pause();
        spikes.forEach(spike => spike.classList.remove('spike-active'));
    }
};

document.addEventListener("DOMContentLoaded",()=>{

})



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
        Даслаць
      </button>
    `
}

const addDonationForm = ()=>{
    return `      <h2>Падтрымайце праект</h2>
      <p class="dialog-subtitle">Выберыце суму для Даната:</p>
      <div class="donation-options">
        <button class="donation-button" data-amount="100">5€</button>
        <button class="donation-button" data-amount="200">10€</button>
        <button class="donation-button" data-amount="500">25€</button>
        <button class="donation-button" data-amount="1000">50€</button>
        <div class="input-wrapper">
  <input type="number" id="custom-amount" placeholder="Іншая сума" min="1">
  <span class="currency">€</span>
</div>
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
    if (email && name) {
        openDialog(addSuccessMessage())
    } else {
        closeDialog()
    }
};

const setLike= ()=>{
    localStorage.setItem('like', 'true')
    container.lastElementChild.remove()
}
