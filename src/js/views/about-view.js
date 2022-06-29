import View from './view';
import icons from 'url:../../img/icons.svg'; //Parcel icons

class AboutProjectView extends View {
  _aboutProjectLink = document.querySelector('#about-project');
  _aboutProjectWindow = document.querySelector('.about-project');

  constructor() {
    super();
    this._addHandlerShowAbout();
    this._addHandlerCloseAbout();
  }

  toggleAbout() {
    this._aboutProjectWindow.classList.toggle('hidden');
  }

  _addHandlerShowAbout() {
    this._aboutProjectLink.addEventListener(
      'click',
      this.toggleAbout.bind(this)
    );
  }

  _addHandlerCloseAbout() {
    this._aboutProjectWindow.addEventListener(
      'click',
      this.toggleAbout.bind(this)
    );
  }
}

export default new AboutProjectView();
