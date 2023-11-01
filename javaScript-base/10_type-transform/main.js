(function () {
    let massStudents = [];
    let massFiltered = [];
    let year = new Date().getFullYear();
    let month = new Date().getMonth()+1;
    let day = new Date().getDate();
    let now = (year + '-' + month + '-' + day);
    function createStudentsControlDesk(container) {
        createFormToAddStudent(container);
        createFilterStudents(container);
        createDeskStudents(container);
    }
    function createFormToAddStudent(container) {
        let formToAddStudents = document.createElement('form');
        let name = document.createElement('input');
        let surname = document.createElement('input');
        let patronymic = document.createElement('input');
        let dateOfBirth = document.createElement('input');
        let yearOfStudy = document.createElement('select');
        let faculty = document.createElement('input');
        let add = document.createElement('button');
        let notification = document.createElement('div');

        formToAddStudents.style.backgroundColor = "rgb(205,229,255)";
        add.textContent = 'Добавить студента';
        add.type = 'button';
        surname.placeholder = 'Фамилия';
        surname.id = 0;
        name.placeholder = 'Имя';
        name.id = 1;
        patronymic.placeholder = 'Отчество';
        patronymic.id = 2;
        dateOfBirth.id = 3;
        dateOfBirth.placeholder = 'Дата рождения';
        dateOfBirth.type = 'date';
        dateOfBirth.min = '1990-01-01';
        dateOfBirth.max = now;
        faculty.placeholder = 'Факультет';
        faculty.id = 4;
        yearOfStudy.id = 5;
        yearOfStudy.name = 'Год началa обучения';
        yearOfStudy.classList.add('select');
        yearOfStudy.style.width = '7%';

        for (i = 2000; i <= year; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.label = i;
            option.classList.add('option');
            yearOfStudy.append(option);
        }

        add.addEventListener('click', function (e) {
            e.preventDefault();

            for (let i = 0; i < 5; i++) {
                if (!document.getElementById(i).value.trim()) {
                    notification.textContent = ('Поле ' + document.getElementById(i).placeholder + ' пустое');
                    return;
                }
            }
            if (dateOfBirth.value < '1900-01-01' || dateOfBirth.value > now){
                notification.textContent = 'Дата рождения может быть в диапозоне от 01.01.1900 до сегодня';
                return;
            }

            let student = ({ surname: surname.value.trim(), name: name.value.trim(), patronymic: patronymic.value.trim(), dateOfBirth: dateOfBirth.value, yearOfStudy: yearOfStudy.value, faculty: faculty.value.trim() });
            massStudents.push(student);
            let a = massStudents.lastIndexOf(student);
            addNewStudent(student, a);
            for (let i = 0; i < 6; i++) {
                document.getElementById(i).value = '';
                notification.textContent = ' ';
            }
        });

        formToAddStudents.append(surname);
        formToAddStudents.append(name);
        formToAddStudents.append(patronymic);
        formToAddStudents.append(dateOfBirth);
        formToAddStudents.append(yearOfStudy);
        formToAddStudents.append(faculty);
        formToAddStudents.append(add);
        formToAddStudents.append(notification);
        container.append(formToAddStudents);
    }

    function createDeskStudents(container) {
        let deskStudents = document.createElement('table');
        let deskStudentsForm = document.createElement('thead');
        let tableStudents = document.createElement('tbody');
        let headers = document.createElement('tr');
        let header1 = document.createElement('th');
        let header2 = document.createElement('th');
        let header3 = document.createElement('th');
        let header4 = document.createElement('th');

        deskStudents.classList.add('table');
        tableStudents.id = 'tbody';
        deskStudents.id = 'sortable';
        deskStudentsForm.classList.add("table-primary");
        deskStudents.title = 'Таблица студентов';
        header1.textContent = 'ФИО';
        header2.textContent = 'Факультет';
        header3.textContent = 'Дата рождения и возраст';
        header3.type = 'number';
        header4.textContent = 'Годы обучения, курс';

        headers.append(header1);
        headers.append(header2);
        headers.append(header3);
        headers.append(header4);
        deskStudentsForm.append(headers);
        deskStudents.append(deskStudentsForm);
        deskStudents.append(tableStudents);
        container.append(deskStudents);

        let headers1 = deskStudents.querySelectorAll('th');
        [].forEach.call(headers1, function (header, index) {
            header.addEventListener('click', function () {
                sortColumn(index);
            });
        });
        function sortColumn(index) {
            let tableBody = deskStudents.querySelector('tbody');
            let rows = tableBody.querySelectorAll('tr');
            let newRows = Array.from(rows);

            function transform(index, content) {
                const type = headers1[index].type;
                switch (type) {
                    case 'number':
                        return new Date(content.split(' ', 1));
                    case 'string':
                    default:
                        return content;
                }
            };
            newRows.sort(function (rowA, rowB) {
                const cellA = rowA.querySelectorAll('td')[index].innerHTML;
                const cellB = rowB.querySelectorAll('td')[index].innerHTML;
                const a = transform(index, cellA);
                const b = transform(index, cellB);
                switch (true) {
                    case a > b: return 1;
                    case a < b: return -1;
                    case a === b: return 0;
                }
            });
            [].forEach.call(rows, function (row) {
                tableBody.removeChild(row);
            });

            newRows.forEach(function (newRow) {
                tableBody.appendChild(newRow);
            });
        };
    }

    function createFilterStudents(container) {
        let formToFilterStudents = document.createElement('form');
        let surname = document.createElement('input');
        let name = document.createElement('input');
        let patronymic = document.createElement('input');
        let faculty = document.createElement('input');
        let yearOfStudy = document.createElement('input');
        let yearOfEndStudy = document.createElement('input');
        let filter = document.createElement('button');
        let notification2 = document.createElement('div');

        formToFilterStudents.style.backgroundColor = "rgb(205,229,255)";
        filter.type = 'button';
        filter.textContent = 'Применить фильтр';
        name.placeholder = 'Имя';
        name.id = 6;
        surname.placeholder = 'Фамилия';
        surname.id = 7;
        patronymic.placeholder = 'Отчество';
        patronymic.id = 8;
        yearOfEndStudy.placeholder = 'Год окончания обучения';
        yearOfEndStudy.id = 9;
        yearOfStudy.placeholder = 'Год начала обучения';
        yearOfStudy.id = 10;
        faculty.placeholder = 'Факультет';
        faculty.id = 11;

        filter.addEventListener('click', function (a) {
            a.preventDefault();
            if (!name.value.trim() && !surname.value.trim() && !patronymic.value.trim() && !yearOfEndStudy.value.trim() && !yearOfStudy.value.trim() && !faculty.value.trim()) {
                notification2.textContent = 'Вы не ввели параметры для фильтрации';
                let table = document.getElementById('tbody');
                table.innerHTML = '';
                createTableOfStudent(massStudents);
                return;
            }
            let table = document.getElementById('tbody');
            table.innerHTML = '';

            let massFilter = ({ surname: surname.value.trim(), name: name.value.trim(), patronymic: patronymic.value.trim(), yearOfEndStudy: yearOfEndStudy.value.trim(), yearOfStudy: yearOfStudy.value.trim(), faculty: faculty.value.trim() })
            massFiltered = filtration(massFilter, massStudents);
            createTableOfStudent(massFiltered);
            for (let i = 6; i < 12; i++) {
                document.getElementById(i).value = '';
                notification2.textContent = '';
            }
        });

        formToFilterStudents.append(surname);
        formToFilterStudents.append(name);
        formToFilterStudents.append(patronymic);
        formToFilterStudents.append(faculty);
        formToFilterStudents.append(yearOfStudy);
        formToFilterStudents.append(yearOfEndStudy);
        formToFilterStudents.append(filter);
        formToFilterStudents.append(notification2);
        container.append(formToFilterStudents);
    }

    function addNewStudent(n, number) {
        let dateOfBirth = n.dateOfBirth.split('-');
        let table = document.getElementById("tbody");
        let head = table.insertRow(number);
        let cell = head.insertCell(0);
        cell.innerHTML = (n.surname + ' ' + n.name + ' ' + n.patronymic);
        let cell1 = head.insertCell(1);
        cell1.innerHTML = n.faculty;
        let cell2 = head.insertCell(2);
        cell2.innerHTML = (dateOfBirth[2] + '.' + dateOfBirth[1] + '.' + dateOfBirth[0] + ' (' + calculationAge(n.dateOfBirth) + 'лет)');
        let cell3 = head.insertCell(3);
        cell3.innerHTML = (n.yearOfStudy + '-' + calculationCourse(n.yearOfStudy));
    }

    function createTableOfStudent(massStudents) {
        for (let i in massStudents) {
            addNewStudent(massStudents[i], i);
        }
    }

    function calculationAge(dateOfBirth) {
        let data = dateOfBirth.split('-');
        let age = year - data[0];

        if (month - data[1] > 0) {
            age--;
        } else if (month == data[1] && day - data[2] < 0) {
            age--;
        }
        return age;
    }

    function calculationCourse(yearOfStudy) {
        let a = 4;
        let course = year - Number(yearOfStudy);
        let yearOfEndStudy = Number(yearOfStudy) + a;
        if (course >= 4) {
            if (course == 4 && month > 8) {
                result = (yearOfEndStudy + ' (закончил)');
            } else {
                result = (yearOfEndStudy + ' (' + course + 'курс)');
            }
            result = (yearOfEndStudy + ' (закончил)');
        } else {
            result = (yearOfEndStudy + ' (' + course + 'курс)');
        }
        return result;
    }

    function filtration(massFilter, massStudents) {
        massFiltered = massStudents;
        return massFiltered
            .filter(value => massFilter.surname == '' || value.surname === massFilter.surname)
            .filter(value => massFilter.name == '' || value.name === massFilter.name)
            .filter(value => massFilter.patronymic == '' || value.patronymic === massFilter.patronymic)
            .filter(value => massFilter.faculty == '' || value.faculty === massFilter.faculty)
            .filter(value => massFilter.yearOfStudy == '' || value.yearOfStudy === massFilter.yearOfStudy)
            .filter(value => massFilter.yearOfEndStudy == '' || Number(value.yearOfStudy) === Number(massFilter.yearOfEndStudy) - 4)
    }

    window.createStudentsControlDesk = createStudentsControlDesk;
})();