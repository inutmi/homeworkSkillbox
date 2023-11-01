(function () {
    let number = 0;
    function createRegistrationList(container) {
        let registrationForm = document.createElement('form');
        let inputSurname = document.createElement('input');
        let inputPatronymic = document.createElement('input');
        let inputName = document.createElement('input');
        let registrationButton = document.createElement('button');
        let table = document.createElement("tbody");
        inputSurname.placeholder = 'Фамилия';
        inputPatronymic.placeholder = 'Имя';
        inputName.placeholder = 'Отчество';
        registrationButton.textContent = 'Добавить';

        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addToList();
        });

        let pattern = /[А-Яа-яЁё\s]/;
        let elemenToDelit = ['_', '=', '+', '/', '?', '\\', '|', '§', '.', ','];


        [inputSurname, inputPatronymic, inputName].forEach(input=> {
            input.addEventListener('keydown', function (keydown) {
                if (keydown.code.search('Key') != -1 || keydown.code.search('Digit') != -1 || elemenToDelit.indexOf(keydown.key) != -1) {
                    if (keydown.key.search(pattern) == -1) {
                        keydown.preventDefault();
                    }
                }
            });
        })
        

        registrationForm.addEventListener('blur', function (event) {
            event.target.value = treatment(event.target.value);
        }, true);

        function addToList() {
            let head = table.insertRow(number);
            let cell = head.insertCell(0);
            cell.innerHTML = inputSurname.value;
            let cell1 = head.insertCell(1);
            cell1.style ='padding-left:10px';
            cell1.innerHTML = inputPatronymic.value;
            let cell2 = head.insertCell(2);
            cell2.style ='padding-left:10px';
            cell2.innerHTML = inputName.value;
            number++;
            inputSurname.value = '';
            inputPatronymic.value = '';
            inputName.value = '';
        }

        function treatment(value) {
            let result = value.trim();
            let treatmentResult = '';
            for (let symbol in result) {
                if (elemenToDelit.indexOf(result[symbol]) === -1) {
                    if (result[symbol] == '-' || result[symbol] == ' ') {
                        if (result[symbol] !== result[symbol - 1]) {
                            treatmentResult = treatmentResult + result[symbol];
                        } 
                    } else {
                        treatmentResult = treatmentResult + result[symbol];
                    }
                } 
            }

            let fn = treatmentResult.substring(0, 1);
            let ln = treatmentResult.substring(1);
            treatmentResult = fn.toUpperCase() + ln.toLowerCase();
            treatmentResult != 0 ? value = treatmentResult : value = '';
            return value;
        }
        registrationForm.append(inputSurname, inputPatronymic, inputName, registrationButton);
        container.append(registrationForm, table);
    }
    window.createRegistrationList = createRegistrationList;
})();