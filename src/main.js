import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const formEl = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.btn-load-more');
const loader = document.querySelector('.loader');

formEl.addEventListener('submit', onBtnSearch);
btnLoadMore.addEventListener('click', onLoadMore);

let userSymbol;
let page;
let maxPage;

async function onBtnSearch(e) {
  e.preventDefault();
  loader.classList.add('is-open');
  page = 1;
  userSymbol = e.target.elements.search.value.trim();
  gallery.innerHTML = '';
  if (userSymbol === '') {
    loader.classList.remove('is-open');
    hideBtnLoad();
    gallery.innerHTML = '';
    showError('❌ Please enter a search tag');
  } else {
    const images = await searchImages(userSymbol, page);
    maxPage = Math.ceil(images.totalHits / 15);
    renderGallery(images);
    loader.classList.remove('is-open');
    visibilitySelection();
    e.target.reset();
  }
}

async function onLoadMore() {
  page += 1;
  loader.classList.add('is-open');
  if (userSymbol === '') {
    loader.classList.remove('is-open');
    gallery.innerHTML = '';
    showError('❌ Please enter a search tag');
  } else {
    const images = await searchImages(userSymbol, page);
    renderGallery(images);
    loader.classList.remove('is-open');
    visibilitySelection();

    const heightElem = gallery.firstElementChild.getBoundingClientRect().height;

    scrollBy({
      behavior: 'smooth',
      top: heightElem * 2,
    });
  }
}

function hideBtnLoad() {
  btnLoadMore.classList.add('hidden');
}
function showBtnLoad() {
  btnLoadMore.classList.remove('hidden');
}

function visibilitySelection() {
  if (page >= maxPage) {
    hideBtnLoad();
    showMessage(`We're sorry, but you've reached the end of search results`);
  } else {
    showBtnLoad();
  }
}

function showError(msg) {
  iziToast.show({
    title: '',
    message: `${msg}`,
    position: 'topRight',
    messageColor: 'white',
    closeOnClick: true,
    close: false,
    backgroundColor: 'red',
  });
}

function showMessage(msg) {
  iziToast.show({
    title: '',
    message: `${msg}`,
    position: 'topRight',
    messageColor: 'white',
    closeOnClick: true,
    close: false,
    backgroundColor: 'green',
  });
}
