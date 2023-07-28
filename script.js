let buffer; //define the buffer variable //определяем переменную "буфер"
let input = document.getElementById('input'); // get input //получаем инпут в переменную input
let numbers = document.querySelectorAll('.number'); //get numbers //получаем все элементы с классом numbers
let operators = document.querySelectorAll('.operator'); //get operators //получаем все элементы с классом operators
let clean = document.getElementById('clean'); //get clean //получаем кнопку удаления инпута
let del = document.getElementById('delete'); //get del //получаем кнопку для стирания 
let equals = document.getElementById('equals'); //get equals //получаем кнопку для получения ответа 
let result = false; // define the result as false

/* 
going through all the elements in numbers and 
create an event for clicking the button with a number
...
перебираем все элементы в numbers и 
создаем событие на клик по кнопкам с числами */
numbers.forEach(number => { 
	number.addEventListener('click', () => {
		//assign the contents of the button with the number to the buffer // определяем в buffer содержимое кликнутой кнопки 
		buffer = number.innerText; 
		/* if the input is empty, write a number into it. 
		Otherwise, if the input is not empty and 
		the result of calculations has not yet been obtained, 
		then add the value to the input. 
		...
		если инпут пустой, то записываем в него число. 
		В противном случае, если инпут не пустой и 
		еще не получен результат вычислений,
		 то прибавляем значение в инпут. */
		if (input.value === '0') { 
			input.value = buffer;
		} else if (result === false){
			input.value += buffer;
		} 
		/*
		if the input is not empty and the result is obtained, 
		then assign a new value to the input 
		and define the result as false.
		...
		в случае если инпут не пустой и результат получен, 
		то присваеваем инпуту новое значение и 
		определяем результат как false.
		*/
		else {
			input.value = buffer;
			result = false;
		}
		/*
		for the text we define the font italic and the color black.
		...
		для текста определяем шрифт италик и цвет черный
		 */
		input.style.fontStyle = 'italic';
		input.style.color = '#000';
	})
});
/*
create a set for all operators, and when clicking check the last character. 
if it is an operator, change the operator to a new one. 
otherwise add the operator to the number.
...
создаем set для всех операторов, и при клике проверяем последний символ. 
если это оператор, то меняем оператор на новый. 
в противном случае прибавляем оператор к числу
 */
let operators_set = new Set();
operators.forEach(operator => {
	operators_set.add(operator.innerText);
});
operators.forEach(operator => {
	operator.addEventListener('click', () => {
		if (input.value === '0' && operator.innerText == '−') {
			input.value = operator.innerText;
		} else if (operators_set.has(input.value[input.value.length - 1])) {
			buffer = input.value;;
			input.value = buffer.slice(0, -1);
			input.value += operator.innerText;
		}
		else {
			input.value += operator.innerText;;
			result = false;
		}
		input.style.fontStyle = 'italic';
		input.style.color = '#000';
	})
});
/*
clearing the field when clicking on "C"
...
очистка поля при клике на "C"
*/
clean.addEventListener('click', () => {
	input.value = '0';
	input.style.color = '#797979';
	input.style.transition = 'color 0s';
});
/*
item removal
...
удаление элемента
 */
del.addEventListener('click', () => {
	if (input.value === '0') {
		return
	} else {
		buffer = input.value;
		/**
		 * trim the string by the last element 
		 * ...
		 * обрезаем строку по последнему элементу
		 */
		input.value = buffer.slice(0, -1); 
	}
})
/**
calculation output
...
вывод вычислений
 */
equals.addEventListener('click', () => {
	if (input.value === '0') {
		return;
	} else {
		buffer = input.value;
		buffer = buffer.replace(/−/g, '-').replace(/×/g,'*').replace(/÷/g, '/');
		input.value = eval(buffer); //convert the string into code //преобразуем строку в код
		result = true; //set result variable to true //переменной result присваеваем занчение true
	}
})