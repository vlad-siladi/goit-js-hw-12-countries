import fetchCountries from './fetchCountries';
import refs from './refs';
import template from './templates/template.hbs';
import templateList from './templates/countriesList.hbs';
import { debounce } from 'debounce';
import { alert, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import './styles.css';


import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

refs.input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange() {
  refs.container.innerHTML = '';
  const inputValue = refs.input.value;
  if (inputValue) {
    fetchCountries(inputValue.trim())
      .then(data => createMarkup(data))
      .catch(error => console.log('error'));
  }
}
function createMarkup(data) {
  if (data.status === 404) {
    error({
      text: `No country has been found. Please enter a more specific query!`,
      styling: 'brighttheme',
      delay: 1500,
    });
    return;
  }
  if (data.length > 1 && data.length < 10) {
    const markup = templateList(data);
    console.log(markup);
    refs.container.innerHTML = markup;
    return;
  }

  if (data.length > 10) {
    error({
      text: `To many countries founded.Please enter a more specific query !`,
      styling: 'brighttheme',
      delay: 1500,
    });
  }
  if (data.length === 1) {
    const markup = template(data);
    refs.container.innerHTML = '';
    refs.container.insertAdjacentHTML('beforeend', markup);
  }
}
