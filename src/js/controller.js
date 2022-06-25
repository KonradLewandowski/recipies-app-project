import {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
} from './model';
import RecipeView from './views/recipe-view';
import SearchView from './views/search-view';
import ResultsView from './views/results-view';
import PaginationView from './views/pagination-view';

import 'core-js/stable'; //polyfil everything
import 'regenerator-runtime/runtime'; //polyfil async await
import resultsView from './views/results-view';

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
    resultsView.update(getSearchResultsPage());

    // 1 loading recepi
    await loadRecipe(id);

    // 2 rendering recipe
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

const init = () => {
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
};
init();
