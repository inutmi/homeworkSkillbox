(function () {

    function createListWithScroll(container) {

        let form = document.createElement('form');
        let title = document.createElement('h2');
        let list = document.createElement('ul');
        let button = document.createElement('button');
        button.style = 'bottom: 10pt; right: 10pt; position: fixed;'
        button.textContent = 'Наверх'
        button.style.visibility = 'hidden';
        title.textContent = "101 случайное число";


        for (i = 0; i < 101; i++) {
            let listElement = document.createElement('li');
            listElement.textContent = ((i + 1) + '. ' + Math.round(Math.random() * 1000));
            list.append(listElement);
        }

        button.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', function(e) {
            let point = window.pageYOffset;
            if (point >= 100) {
                button.style.visibility = 'visible';
            } else {
            button.style.visibility = 'hidden';
            }
        }, { passive: true });

        form.append(title, list, button);
        container.append(form);
    }

    window.createListWithScroll = createListWithScroll;
})();