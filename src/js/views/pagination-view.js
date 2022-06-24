import View from './view';

import icons from 'url:../../img/icons.svg'; //Parcel icons

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const button = e.target.closest('.btn--inline');
      if (!button) return;

      const goToPage = +button.dataset.goto; //to the number

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateButton(currentPage, 'right');
    }

    //Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateButton(currentPage, 'left', -1);
    }

    //Other page
    if (currentPage < numPages) {
      const x = ['right', 'left']
        .map(el => {
          return this._generateButton(currentPage, el);
        })
        .join('');
      return x;
    }

    //Page 1, and there are NO other pages
    if (numPages === 1) {
      return '';
    }
  }

  _generateButton(currentPage, direction, value = 1) {
    if (direction === 'left') value = -1;

    const markup = `<button data-goto="${
      currentPage + value
    }" class="btn--inline pagination__btn--${
      direction === 'right' ? 'next' : 'prev'
    }">
    <span>Page ${currentPage + value}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-${direction}"></use>
    </svg>
  </button>`;

    return markup;
  }
}

export default new PaginationView();
