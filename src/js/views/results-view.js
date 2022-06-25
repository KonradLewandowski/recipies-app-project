import View from './view';

import icons from 'url:../../img/icons.svg'; //Parcel icons

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found!';
  _message = 'Success';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview({ id, image, title, publisher }) {
    const selectedElementId = window.location.hash.slice(1);

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

export default new ResultsView();
