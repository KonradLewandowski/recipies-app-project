import {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
  addBookmark,
  deleteBookmark,
  uploadRecipe,
} from './model';
import { MODAL_CLOSE_SEC } from './config';
import RecipeView from './views/recipe-view';
import SearchView from './views/search-view';
import ResultsView from './views/results-view';
import PaginationView from './views/pagination-view';
import BookmarksView from './views/bookmarks-view';
import AddrecipeView from './views/addrecipe-view';

import 'core-js/stable'; //polyfil everything
import 'regenerator-runtime/runtime'; //polyfil async await

//parcel module reload
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    RecipeView.renderSpinner();

    //0 Update results view to mark selected searhc result
    ResultsView.update(getSearchResultsPage());
    //1 updating bookmarks view
    BookmarksView.update(state.bookmarks);

    // 2 loading recepi
    await loadRecipe(id);

    // 3 rendering recipe
    RecipeView.render(state.recipe);
  } catch (error) {
    RecipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    ResultsView.renderSpinner();
    // 1 get search query
    const query = SearchView.getQuery();
    if (!query) return;

    //2 load search results
    await loadSearchResults(query);

    //3 render results
    ResultsView.render(getSearchResultsPage());

    //4 render pagination buttons
    PaginationView.render(state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = goToPage => {
  //1 render NEW results
  ResultsView.render(getSearchResultsPage(goToPage));

  //2 render NEW pagination buttons
  PaginationView.render(state.search);
};

const controlServings = newServings => {
  //Update the recipe servings (in state)
  updateServings(newServings);

  //Update the recipe view
  // rendering recipe
  // RecipeView.render(state.recipe);
  RecipeView.update(state.recipe);
};

const controlAddBookmark = () => {
  //1 add or remove bookmark
  if (!state.recipe.bookmarked) addBookmark(state.recipe);
  else deleteBookmark(state.recipe.id);

  //2 update recipe viuew
  RecipeView.update(state.recipe);

  //3 render bookmarks
  BookmarksView.render(state.bookmarks);
};

const controlBookmarks = () => {
  BookmarksView.render(state.bookmarks);
};

const controlAddRecipe = async newRecipe => {
  try {
    //show loading spinner
    AddrecipeView.renderSpinner();

    //upload the new recipe data
    await uploadRecipe(newRecipe);

    //render recipe
    RecipeView.render(state.recipe);

    //success message
    AddrecipeView.renderMessage();

    //render bookmark vier
    BookmarksView.render(state.bookmarks);

    //change id in the url
    //method adding new url without reloaded the whole page
    const urlID = state.recipe.id;

    window.history.pushState(null, '', `#${urlID}`);

    //close modal
    setTimeout(() => {
      AddrecipeView.toggleModal();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    AddrecipeView.renderError(error.message);
  }
};

const init = () => {
  BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  AddrecipeView.addHandlerUpload(controlAddRecipe);
};
init();
