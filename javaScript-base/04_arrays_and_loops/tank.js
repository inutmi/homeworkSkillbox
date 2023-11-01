// это функция, внутри которой нужно написать ваш код
// roadMines (массив ячеек поля) будет задаваться в момент вызова функции, как в примере кода под ней
function moveTank(roadMines) {
  let tankPosition = 0;
  let tankDamage = 0;
  while (tankPosition < roadMines.length && tankDamage < 2) {
      if (roadMines[tankPosition]) {
      tankDamage++;
      if (tankDamage === 1) {
        console.log(`Танк поврежден`);
        console.log(`Танк переместился на ${tankPosition + 1}`);
      } else {
        console.log(`Танк переместился на ${tankPosition + 1}`);
        console.log(`Танк уничтожен`);
        break;
        }
    } else {
        console.log(`Танк переместился на ${tankPosition + 1}`);
      } 
      tankPosition++;
  }
}

// вызов функции
moveTank([false, false, false, false, false, false, false, false, false, false]); // танк проедет по полю без мин
// можете вызывать функцию сколько угодно раз подряд с различными параметрами

// строка ниже необходима, чтобы работало автоматическое тестирование
// не изменяйте этот код!
export default moveTank;
