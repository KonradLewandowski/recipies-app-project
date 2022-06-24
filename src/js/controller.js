import { state, loadRecipe, loadSearchResults } from './model';
import RecipeView from './views/recipe-view';
import SearchView from './views/search-view';
import ResultsView from './views/results-view';

import 'core-js/stable'; //polyfil everything
import 'regenerator-runtime/runtime'; //polyfil async await
import recipeView from './views/recipe-view';
import resultsView from './views/results-view';

//parcel module reload
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    RecipeView.renderSpinner();

    // 1 loading recepi
    await loadRecipe(id);

    // 2 rendering recipe
    RecipeView.render(state.recipe);
  } catch (error) {
    recipeView.renderError();
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

    resultsView.render(state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = () => {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
};
init();
