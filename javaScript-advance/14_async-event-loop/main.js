const cssPromise = {};

function loadResource(src) {
    //js
    if (src.endsWith('.js')) {
        return import(src);
    }
    //css
    if (src.endsWith('.css')) {
        if (!cssPromise[src]) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
            cssPromise[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve());
            });
            document.head.appendChild(link);
        }
        return cssPromise[src];
    }
    //data
    return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(location.search);

let filmId = searchParams.get('film');

function renderPageFunction(modulName, apiUrl, css, css2) {
    Promise.all([modulName, apiUrl, css, css2].map(src => loadResource(src))).then(([pageModule, data]) => {
        appContainer.innerHTML = '';
        appContainer.append(pageModule.render(data));
    });
}
function renderPageFilmFunction(modulName, apiUrl, css, css2) {
    Promise.all([modulName, apiUrl, css, css2].map(src => loadResource(src))).then(async ([pageModule, data]) => {
        appContainer.innerHTML = '';
        let massPlanets = await found(data.planets);
        let massSpecies = await found(data.species);
        appContainer.append(pageModule.render(data, massPlanets, massSpecies));
    });
}
async function found(data) {
    let mass = [];
    for (let a of data) {
        const responce = await fetch(`${a}?format=json`);
        let m = await responce.json();
        mass.push(m.name);
    }
    return mass;
}
    change(filmId);
    document.body.addEventListener('click', function(){
        const a = window.history.state;
        if(a!=filmId){
            change(a);
            filmId = a;
        } 
    });

    function change(filmId){
    if (filmId) {
        renderPageFilmFunction(
            './renderPageFilm.js',
            `https://swapi.dev/api/films/${filmId}/?format=json`,
            "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css",
            './styles.css'
        );
    } else {
        renderPageFunction(
            './renderPage.js',
            'https://swapi.dev/api/films/?format=json',
            "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css",
            './styles.css'
        );
    }
    }
    window.addEventListener('popstate', function(){
       change(this.window.history.state);
    });