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


const  addContactForm = ()=>{
    return `
          <h2>Далучыцца да нас</h2>
               <p class="dialog-subtitle">Пакіньце дадзеныя каб мы маглі з вамі звязацца</p>
                <label for="name-input"></label><input type="text" placeholder="Імя або псеўданім" class="input" id="contact-name-input"/>
      <label for="contact-text-input"></label><textarea placeholder="Чым вы хочаце дапамагчы праекту" class="input" id="contact-text-input"></textarea>
      <button class="button ad-button" onclick="sentContactFormData()">
        Даслаць
      </button>
    `
}

const  addFeedbackForm = ()=>{
    return `
          <h2>Водгук</h2>
               <p class="dialog-subtitle">Пакіньце дадзеныя каб мы маглі з вамі звязацца</p>
                <label for="name-input"></label><input type="text" placeholder="Кантакты для сувязі" class="input" id="feedback-name-input"/>
      <label for="contact-text-input"></label><textarea placeholder="Каментар" class="input" id="feedback-text-input"></textarea>
      <button class="button ad-button" onclick="sentFeedbackFormData()">
        Даслаць
      </button>
    `
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

const sentContactFormData = ()=> {
    const text = document.querySelector('#contact-text-input').value;
    const name = document.querySelector('#contact-name-input').value;
    if (text && name) {
        openDialog(addSuccessMessage())
    } else {
        closeDialog()
    }
};



const sentFeedbackFormData = async () => {
    const text = document.querySelector('#feedback-text-input').value;
    const name = document.querySelector('#feedback-name-input').value;
    if (text && name) {
        await sendFeedback(name, text)
        openDialog(addSuccessMessage())
    } else {
        closeDialog()
    }
};


const setLike= ()=>{
    localStorage.setItem('like', 'true')
    container.lastElementChild.remove()
}

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwNGNlWYLLUzeqsfKFNAtQo0BgH0j0gioLb6l3XSaffgH4m6nd7OC3FjwfzIwzACC-w/exec'
const sendFeedback = async (name, feedback) => {
    const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            feedback: feedback
        }),
    });

    const result = await response.json();
    if (result.status !== 'success') {
        throw Error(result.status);
    }
};