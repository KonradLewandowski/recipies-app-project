import View from './view';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const selectedElementId = window.location.hash.slice(1);
    const { id, image, title, publisher } = this._data;

    return `
    <li class="preview">
        <a class="preview__link ${
          id === selectedElementId ? 'preview__link--active' : ''
        }" href="#${id}">
            <figure class="preview__fig">
                <img src="${image}" alt="${title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${title}</h4>
                <p class="preview__publisher">${publisher}</p>
            </div>
        </a>
    </li>`;
  }
}

export default new PreviewView();
