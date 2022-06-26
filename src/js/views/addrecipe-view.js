import View from './view';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe added';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonOpen = document.querySelector('.nav__btn--add-recipe');
  _buttonClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowModal();
    this._addHandlerCloseModal();
  }

  toggleModal() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowModal() {
    this._buttonOpen.addEventListener('click', this.toggleModal.bind(this));
  }

  _addHandlerCloseModal() {
    this._buttonClose.addEventListener('click', this.toggleModal.bind(this));
    this._overlay.addEventListener('click', this.toggleModal.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();

      //this method takes all imputs from the form and creating human friendly array and object, which we can manipulate
      const dataArray = [...new FormData(this._parentElement)]; // all fields from the form
      const data = Object.fromEntries(dataArray); //creating object from the array
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
