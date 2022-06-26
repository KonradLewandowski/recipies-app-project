import View from './view';
import icons from 'url:../../img/icons.svg'; //Parcel icons

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe added';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonOpen = document.querySelector('.nav__btn--add-recipe');
  _buttonClose = document.querySelector('.btn--close-modal');
  _hintContainer = document.querySelector('.hint-container');

  constructor() {
    super();
    this._addHandlerShowModal();
    this._addHandlerCloseModal();
  }

  toggleModal() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  toggleHint() {
    this._parentElement = this._hintContainer;
    this._hintContainer.classList.toggle('hidden');
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
      console.log(this._parentElement);

      //this method takes all imputs from the form and creating human friendly array and object, which we can manipulate
      const dataArray = [...new FormData(this._parentElement)]; // all fields from the form
      const data = Object.fromEntries(dataArray); //creating object from the array
      handler(data);
    });
  }
  triggerParentElement() {
    this._parentElement = document.querySelector('.upload');
  }
}

export default new AddRecipeView();
