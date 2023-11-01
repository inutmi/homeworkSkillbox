export function render(data, filmId) {
    let container = document.createElement('div');
    container.classList.add(
        'container', 'd-flex', 'justify-content-between', 'flex-wrap', 'py-4',
    );
    let cardId = 1;
    const title = document.createElement('h2');
    title.classList.add('mainTitle');
    title.textContent = 'Star Wars Universe';
    title.style.width = '100%';
    container.append(title);

    for (const film of data.results){
        const filmCart = document.createElement('div');
        const filmNumber = document.createElement('h5');
        const filmTitle = document.createElement('h6');
        const filmButton = document.createElement('a');

        filmCart.style.width = '30%';
        filmCart.classList.add('card-main');
        filmNumber.classList.add('midleTitle');
        filmTitle.classList.add('title');
        filmButton.classList.add('btn-main');

        filmCart.append(filmNumber, filmTitle, filmButton);

        filmNumber.textContent = "Episode " + film.episode_id;
        filmTitle.textContent = film.title;
        filmButton.textContent = "More";
        filmButton.href = `?film=${cardId}`;
        filmButton.id = cardId;
        cardId++;

        filmButton.addEventListener('click', function(e){
            e.preventDefault();
            history.pushState(filmButton.id, '', filmButton.href);
        });
        container.append(filmCart);
    }
    cardId = 1;
   return container;
}