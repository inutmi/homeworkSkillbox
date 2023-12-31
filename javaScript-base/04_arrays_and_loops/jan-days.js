// это функция, внутри которой нужно написать ваш код
// firstWeekDay будет задаваться в момент вызова функции, как в примере кода под ней
function januaryDays(firstWeekDay) {
  let days = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
  let startIndex = days.indexOf(firstWeekDay);
  for (let i = 1; i <= 31; i++) {
    let day = days[(startIndex + i - 1) % 7];
  console.log(`${i} января, ${day}`);
  }
}
// выполнение кода внутри функции
januaryDays('понедельник'); // вывести все дни недели января, если 1-я января - понедельник
januaryDays('среда'); // вывести все дни недели января, если 1-я января - среда
januaryDays('воскресенье'); // вывести все дни недели января, если 1-я января - воскресенье
// можете вызывать функцию сколько угодно раз подряд с различными параметрами

// строка ниже необходима, чтобы работало автоматическое тестирование
// не изменяйте этот код!
export default januaryDays;
