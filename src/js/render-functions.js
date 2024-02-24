import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

function createGallery(userSymbol) {
  return `<li class="gallery-item">
        <a href="${userSymbol.largeImageURL}"> <img class="gallery-image" src="${userSymbol.webformatURL}" alt="${userSymbol.tags}"></a>
        <div class='discription'><p><b>Likes </b>${userSymbol.likes}</p>
        <p><b>Views </b>${userSymbol.views}</p>
        <p><b>Comments </b>${userSymbol.comments}</p>
        <p><b>Downloads </b>${userSymbol.downloads}</p>
        </div>
      </li>`;
}

export function renderGallery(userSymbol) {
  const markup = userSymbol.hits.map(createGallery).join(``);
  gallery.insertAdjacentHTML('beforeend', markup);

  const myOptions = {
    captionsData: 'alt',
    captionDelay: 250,
  };

  const myGallery = new SimpleLightbox('.gallery a', myOptions);
  myGallery.on('show.simplelightbox');
  myGallery.refresh();
}
