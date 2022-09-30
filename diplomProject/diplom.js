"use strict"

//создаем таблицу
function buildTable() {
   let rowsNumber = document.getElementById("rows").value; //16
   let columnsNumber = document.getElementById("columns").value;  //9
   var sumCells = Number(rowsNumber) * Number(columnsNumber); //16*9=144
   let table = document.getElementById("table");
   table.classList.add('show');
   table.style.cssText = "display:table; \ width:1000px; \height:200px; \ border-collapse:collapse; \ box-sizing: border-box";

   for (let i = 0; i < columnsNumber; i++) {
      let row = document.createElement("tr");
      row.style.cssText = "display:table-row; \ width:100%;";
      table.appendChild(row);
      for (let j = 0; j < rowsNumber; j++) {
         let cell = document.createElement("td");
         cell.style.cssText = "display:table-cell; \ height:20px; \ border:1px solid black;";
         row.appendChild(cell)
      }
   }
};


//аудиовизуализация

window.onload = function () {
   var audio,
      analyser,
      audioContext,
      sourceNode,
      stream;

   var audioInput = document.getElementById('audiofile');


   // choose file
   audioInput.addEventListener('change', function (event) {
      stream = URL.createObjectURL(event.target.files[0]);
      audio = new Audio();
      audio.src = stream;
      audio.controls = true;
      audio.autoplay = true;
      setup();
   });

   //создаем анализатор
   function setup() {
      audio.addEventListener('canplay', function () {
         document.body.className += 'loaded';
         document.getElementById('audio_box').appendChild(audio);
         var AudioContext = window.AudioContext || window.webkitAudioContext;
         audioContext = new AudioContext();
         analyser = (analyser || audioContext.createAnalyser());

         //громкость!!
         sourceNode = audioContext.createMediaElementSource(audio);
         sourceNode.connect(analyser);
         sourceNode.connect(audioContext.destination);

         audio.play();
         update();
      });
   }


   function update() {
      window.requestAnimationFrame(update);

      analyser.fftSize = 256;

      //создаем массив для хранения данных
      var freqArray = new Uint8Array(analyser.frequencyBinCount);
      //получаем данные о частоте из массива
      analyser.getByteFrequencyData(freqArray);
      console.log(freqArray);

      //создаем новый массив!!!!!!!!!!
      let numberCells = 144;
      let newArray = {};
      function arrCreate() {

         for (let i = 0; i <= freqArray.length; i++) {  //128 freqArray.length

            let value = freqArray[i];
            newArray[i] = value;  //значения до 127 
         };
         if (numberCells > freqArray.length) {
            let diff = numberCells - freqArray.length; //16 элементов разницы
            for (let u = 0; u <= diff; u++) {
               let value1 = freqArray[u];
               newArray[u + freqArray.length] = value1;
            }
         }
         console.log(newArray);
      }
      arrCreate(freqArray, numberCells);

      //перебираем цвет
      let cell = document.getElementsByTagName('td');
      let newArrayLength = Object.keys(newArray).length;

      function colorCreate(newArray, cell) {
         for (let i = 0; i <= newArrayLength; i++) {
            let valueColor = newArray[i];
            cell[i].style.backgroundColor = `rgb(${valueColor},0,0)`;
         }
      }
      colorCreate(newArray, cell);
   }


};