(function () {
    let mass = ['Каждый', 'охотник', 'желает', 'знать', 'где', 'сидит', 'фазан']
    function createDropDownList(container) {
        let downList = document.createElement('div');
        downList.classList.add('dropdown');
        let buttonDownList = document.createElement('button');
        buttonDownList.classList.add('btn');
        buttonDownList.classList.add('btn-secondary');
        buttonDownList.classList.add('dropdown-toggle');
        buttonDownList.type = 'button';
        buttonDownList.dataset.toggle = 'dropdown';
        buttonDownList.ariaExpanded = 'true';
        buttonDownList.textContent = 'Считалочка';
        let downListMenu = document.createElement('div');
        downListMenu.classList.add('dropdown-menu');

        for (i = 0; i < mass.length; i++) {
            let button = document.createElement('button');
            button.classList.add('dropdown-item');
            button.type = 'button';
            button.textContent = mass[i];
            downListMenu.append(button);
        }
        downList.append(buttonDownList, downListMenu);
        container.append(downList);

        document.addEventListener('click', function(e) {
            const data = e.composedPath().includes(downList);
            if (!data) {
                downListMenu.style.display = 'none';
                console.log('by');
            } else {
                downListMenu.style.display = 'block';
                console.log('Hello');
            }
        });
    }

    window.createDropDownList = createDropDownList;
})();