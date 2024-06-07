const API_KEY =
  'live_gNTTZRTU8sYEZ7zbId5Dwq32yg2NX9D3PSae4ZpSKoRhw48h42u9HoF1xzR3yozR;';

const breedSelect = document.querySelector('.js-breed-select');
const catsInfoEl = document.querySelector('.js-cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

breedSelect.addEventListener('input', onSelectCat);

// loaderIsHiddenClassAdd();
error.classList.add('is_hidden');

let catCards = [];

fetchBreeds()
  .then(data => {
    catCards.push(...data);
    breedSelect.insertAdjacentHTML('beforeend', onAddSelect(data));
    loaderIsHiddenClassAdd();
  })
  .catch(err => {
    loaderIsHiddenClassAdd();
    error.classList.remove('is_hidden');
  });

function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(`${resp.statusText}`);
      }
      loader.classList.remove('is_hidden');
      return resp.json();
    }
  );
}

function onAddSelect(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function onSelectCat(evt) {
  const catId = evt.target.value;
  const catInfo = catCards.filter(({ id }) => id === catId);
  console.log(catInfo);
  loaderIsHiddenClassRemove();
  fetchCatByBreed(catId).then(
    data => (catsInfoEl.innerHTML = createMarkup(data, catInfo))
  );
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function createMarkup(arr, [info]) {
  loaderIsHiddenClassAdd();
  console.log(info.description);
  console.log('arr', arr);
  return arr
    .map(
      ({ url }) => ` <img src="${url}" alt="${info.name}" width ="300">
    <h1>${info.name}</h1>
    <p>Description: ${info.description}</p>
    <p>Temperament: ${info.temperament}</p>`
    )
    .join('');
}

function loaderIsHiddenClassAdd() {
  loader.classList.add('is_hidden');
}

function loaderIsHiddenClassRemove() {
  loader.classList.remove('is_hidden');
}
