const dialogContainer = document.querySelector('.dialog-container');
const dialogBlock = document.querySelector('.dialog-block');
const container = document.querySelector('.container');
const audioPlayer = document.querySelector('.audioPlayer');
const spikeBlock = document.querySelector('.spike-block');

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyZAlYqM__CCq17rNnnhHQrejlkdWuVb0tLlGEVDFtWGMJIBC_6MJ36GQASxuel5eLl/exec';

let spikes

const audioControl = () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        toggleSpikes(true);
    } else {
        audioPlayer.pause();
        toggleSpikes(false);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    createSpikes(127);
    spikes = document.querySelectorAll('.spike');
    let isLiked = localStorage.getItem("liked") === "true";
    toggleHeart(isLiked);
});

const createSpikes = (count) => {
    for (let i = count; i >= 0; i--) {
        const spike = document.createElement("div");
        spike.classList.add("spike");
        spike.style.setProperty("--i", i);
        spikeBlock.appendChild(spike);
    }
};

const setLike = () => {
    let isLiked = localStorage.getItem("liked") === "true";
    let newLikedState = !isLiked;
    localStorage.setItem("liked", newLikedState);
    toggleHeart(newLikedState);
}

const toggleHeart = (isLiked) => {
    let likeIcon = document.querySelectorAll(".like-icon");
    if (isLiked) {
        likeIcon.forEach(el=>el.classList.add("liked"));
    } else {
        likeIcon.forEach(el=>el.classList.remove("liked"));
    }
}

const goToLink = (link) => {
    window.location.href = link
}

const openDialog = (action) => {
    dialogContainer.style.display = 'flex';
    dialogBlock.innerHTML = action;
};

const closeDialog = () => {
    dialogContainer.style.display = 'none';
};

const toggleSpikes = (isActive) => {
    spikes.forEach(spike => spike.classList.toggle('spike-active', isActive));
};

const sendData = async (data) => {
    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.status === 'success') {
            openDialog(addSuccessMessage());
        } else {
            openDialog(addErrorMessage());
        }
    } catch (error) {
        console.error(error);
    }
};

const sendIdeaData = async () => {
    let button = event.currentTarget
    button.disabled = !button.disabled;
    const contact = document.querySelector('#idea-contact').value;
    const idea = document.querySelector('#idea-text').value;
    if (contact && idea) {
        await sendData({ type: 'idea', contact, idea });
    } else {
        closeDialog();
    }
    button.disabled = !button.disabled;
};

const sendContactData = async () => {
    let button = event.currentTarget
    button.disabled = !button.disabled;
    const name = document.querySelector('#contact-name').value;
    const contact = document.querySelector('#contact-contact').value;
    const helpText = document.querySelector('#contact-text').value;
    if (name && contact && helpText) {
        await sendData({ type: 'contact', name, contact, helpText });
    } else {
        closeDialog();
    }
    button.disabled = !button.disabled;
};

const sendVacancyData = async () => {
    let button = event.currentTarget
    button.disabled = !button.disabled;
    const name = document.querySelector('#vacancy-name').value;
    const contact = document.querySelector('#vacancy-contact').value;
    const offer = document.querySelector('#vacancy-text').value;
    if (name && contact && offer) {
        await sendData({ type: 'vacancy', name, contact, offer });
    } else {
        closeDialog();
    }
    button.disabled = !button.disabled;
};

const sendFeedbackData = async () => {
    let button = event.currentTarget
    button.disabled = !button.disabled;
    const feedback = document.querySelector('#feedback-text-input').value;
    if (feedback) {
        await sendData({ type: 'feedback', feedback });
    } else {
        closeDialog();
    }
    button.disabled = !button.disabled;
};

const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 2000);
};

const addSuccessMessage = () => `
    <h3 class="dialog-message-title">Дзякуй!</h3>
    <h4 class="dialog-message-subtitle">Дадзеныя паспяхова адпраўлены</h4>
`;

const addErrorMessage = () => `
    <h4 class="dialog-message-subtitle">Дадзеныя былі адпраўленыя няўдалая, калі ласка паспрабуйце пазней</h4>
`;

const addIdeaForm = () => `
    <h2>Прапанаваць ідэю</h2>
    <p class="dialog-subtitle">Пакіньце дадзеныя каб мы маглі з вамі звязацца</p>
    <input type="text" placeholder="Кантактныя дадзеныя" class="input" id="idea-contact"/>
    <textarea placeholder="Апісанне ідэі" class="input" id="idea-text"></textarea>
    <button class="button ad-button" onclick="sendIdeaData()"> Даслаць</button>
`;

const addContactForm = () => `
    <h2>Супрацоўніцтва</h2>
    <p class="dialog-subtitle">Пакіньце дадзеныя каб мы маглі з вамі звязацца</p>
    <input type="text" placeholder="Імя" class="input" id="contact-name"/>
    <input type="text" placeholder="Кантакты для сувязі" class="input" id="contact-contact"/>
    <textarea placeholder="Апісанне прапановы" class="input" id="contact-text"></textarea>
    <button class="button ad-button" onclick="sendContactData()">Даслаць</button>
`;

const addVacancyForm = () => `
    <h2>Далучыцца да нас</h2>
    <p class="dialog-subtitle">Пакіньце дадзеныя каб мы маглі з вамі звязацца</p>
    <input type="text" placeholder="Імя або псеўданім" class="input" id="vacancy-name"/>
    <input type="text" placeholder="Кантактныя дадзеныя" class="input" id="vacancy-contact"/>
    <textarea placeholder="Чым вы хочаце дапамагчы праекту" class="input" id="vacancy-text"></textarea>
    <button class="button ad-button" onclick="sendVacancyData()"> Даслаць</button>
`;

const addFeedbackForm = () => `
    <h2>Водгук</h2>
    <p class="dialog-subtitle">Гэта дапаможа нам палепшыць праект</p>
    <textarea placeholder="Каментар" class="input" id="feedback-text-input"></textarea>
    <button class="button ad-button" onclick="sendFeedbackData()">Даслаць</button>
`;

const addShare = () => `
    <h2>Падзяліцца</h2>
    <div class="share-section">
      <button class="button share-button" onclick="shareOnFacebook()">Facebook</button>
      <button class="button share-button" onclick="shareOnX()">X</button>
      <button class="button share-button" onclick="shareOnLinkedIn()">LinkedIn</button>
      <button class="button share-button" onclick="shareOnWhatsApp()">WhatsApp</button>
      <button class="button copy-button" onclick="copyLinkToClipboard()">Copy Link</button>
    </div>
`;

const sharePage = () => {
    if (navigator.share) {
        navigator.share({title: document.title, url: window.location.href})
            .catch(console.error);
    } else {
        openDialog(addShare());
    }
};

const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
};

const shareOnX = () => {
    window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`, '_blank');
};

const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}`, '_blank');
};

const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(document.title)}%20${encodeURIComponent(window.location.href)}`, '_blank');
};

const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
        .then(() => showToast('Спасылка, скапіявана ў буфер абмену!'))
        .catch(console.error);
};
