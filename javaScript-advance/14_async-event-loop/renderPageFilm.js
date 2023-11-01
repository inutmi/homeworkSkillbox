export function render(data, massPlanets, massSpecies) {
    let container = document.createElement('div');

    const filmName = document.createElement('h1');
    const filmDescription = document.createElement('div');
    const filmPlanet = document.createElement('h2');
    const filmPlanetList = document.createElement('ul');
    const filmSpesies = document.createElement('h2');
    const filmSpesiesList = document.createElement('ul');
    const filmButton = document.createElement('a');

    container.append(filmButton, filmName, filmDescription, filmPlanet, filmPlanetList, filmSpesies, filmSpesiesList);

    filmName.textContent = 'Episode ' + data.episode_id + '   ' + data.title;
    filmName.classList.add('midleTitle');

    filmDescription.classList.add('text');
    filmDescription.textContent = data.opening_crawl;

    filmPlanet.classList.add('title');
    filmPlanet.textContent = 'Planets';
    foundEndCreate(massPlanets, filmPlanetList);

    filmSpesies.classList.add('title');
    filmSpesies.textContent = 'Species';
    foundEndCreate(massSpecies, filmSpesiesList);

    filmButton.textContent = 'Back to episodes';
    filmButton.href = ``;
    filmButton.classList.add('btn-main');

    filmButton.addEventListener('click', function(e){
        e.preventDefault();
        history.pushState(null, '', '/');
    });

    function foundEndCreate(data, container) {
        for (let m of data) {
            let li = document.createElement('li');
            li.textContent = m;
            li.classList.add('text');
            container.append(li);
        }
    }

    return container;
}