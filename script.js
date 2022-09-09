"use strict";

function pos() {
   let form = document.forms.form;//форма ввода
   let wrap = document.getElementById('clock_dom');
   let error = document.getElementById('error');
   let input = document.getElementById('diametr');
   let diametr = parseFloat(form.elements.Diametr.value);//диаметр циферблата

   let container = document.getElementById('container');//контейнер!
   container.style.height = diametr + "px";
   container.style.width = diametr + "px";

   let angleValue = 0; // угол
   let hourDigits = 12; //цифры часов
   let distanceOfDigits = 360 / 12; // 30 расстояние(в градусах) между цифрами на часах
   let spanDigital = document.getElementById("spanDigital");//электронные часы 
   let hours = document.getElementById("hours");//часовая стрелка
   let minutes = document.getElementById("minutes");//минутная стрелка
   let second = document.getElementById("seconds");//секундная стрелка 


   //работа с формой ввода
   if (diametr < 200 || diametr > 800) {
      error.textContent = 'Введите диаметр верно';
      input.style.border = "2px solid red";
   } else {
      wrap.style.width = diametr + "px";
      wrap.style.height = diametr + "px";
      clock_dom.classList.add('show');
   }

   //функция по расположению кружочков циферблата
   for (let i = 1; i <= hourDigits; i++) {
      let wrapNumbers = document.createElement("div"); //  div оболочка для номеров 
      container.prepend(wrapNumbers);
      wrapNumbers.classList.add('wrapNumbers');
      wrapNumbers.style.height = diametr;
      let wrapChildElem = document.createElement("div"); // div для цифры часов

      let clockNumbDiametr = 15 / 100 * diametr; //диаметр div цифры циферблата 
      let clockNumbRadius = clockNumbDiametr / 2; //раадиус div цифры циферблата 
      let radius = diametr / 2 - clockNumbRadius - 2; //отступ от границы контейнера на 2px

      angleValue += distanceOfDigits;
      let angle = angleValue / 180 * Math.PI;

      let wrapCenterX = diametr / 2; // узнаем центр контейнера по X
      let wrapCenterY = diametr / 2; // узнаем центр контейнера по Y

      let wrapChildElemCenterX = wrapCenterX + radius * Math.sin(angle); // узнаем центр дочерного элемента по X
      let wrapChildElemCenterY = wrapCenterY - radius * Math.cos(angle); // узнаем центр дочерного элемента по Y

      wrapChildElem = wrapNumbers.appendChild(wrapChildElem); //div для номеров часов делаем дочерным элементом wrap
      wrapChildElem.classList.add('childElem'); //устанавливаем готовый CSS класс для дочерных элементов
      wrapChildElem.innerHTML = i;
      wrapChildElem.style.borderRadius = "50%";
      wrapChildElem.style.width = clockNumbDiametr + "px";
      wrapChildElem.style.height = clockNumbDiametr + "px";
      wrapChildElem.style.lineHeight = clockNumbDiametr + "px";
      wrapChildElem.style.fontSize = Math.round(0.05 * diametr) + "px";


      wrapChildElem.style.left = (wrapChildElemCenterX - clockNumbRadius) + "px"; //позиционируем
      wrapChildElem.style.top = (wrapChildElemCenterY - clockNumbRadius) + "px";
   };


   function moved() {

      // добавляем электронные часы
      let time = new Date();
      spanDigital.innerHTML = time.toLocaleTimeString();
      let milisecond = time.getMilliseconds();
      spanDigital.style.fontSize = Math.round(0.05 * diametr) + "px";

      // определяем точку трансформации стрелок часов, минут, секунд по оси X и Y
      hours.style.transformOrigin = "button";
      minutes.style.transformOrigin = "button";
      second.style.transformOrigin = "button";

      //секундная стрелка
      let secondsDeg = 6 * time.getSeconds() - 6; //определяем по настоящему времени где должна быть стрелка секунд
      secondsDeg += 6;
      second.style.transform = "rotate(" + secondsDeg + "deg)";
      // минутныеные стрелки
      let minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds()); //определяем по времени где должна быть стрелка минут
      minutesDeg += 6 * (1 / 60);
      minutes.style.transform = "rotate(" + minutesDeg + "deg)";
      // часовые стрелки
      let hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes()); //определяем по времени где должна быть стрелка часов
      hoursDeg += 6 * (1 / 360);
      hours.style.transform = "rotate(" + hoursDeg + "deg)";
      console.log(time.toLocaleTimeString());

      setTimeout(moved, 1020 - milisecond);
   }

   moved();

};