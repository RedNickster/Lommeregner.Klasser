// Lav en lommeregner der ligner en normal lommeregner ved at bruge metoden vist af Rigo

// send parameter ned til TilføgTegn når man klikker på (x)klnap


//setup funtion til at sætte canvas op
function setup() {
    createCanvas(400, 400); // Opret canvas
    background(250); // Sæt baggrundsfarve
  }
  
  // Lommeregner-klassen, der styrer programmet
  class Lommeregner {
    constructor() {
      let n = "";
      this.CPU = new CPU(); // Opret instans af CPU-klassen
      this.Display = new Display(); // Opret instans af Display-klassen
  
      this._input = createInput("23+82*23/42"); // Opret inputfelt
        this._input.position(60, 60); // Opdateret position for inputfeltet
        this._input.size(180, 30); // Opdateret størrelse for inputfeltet
      this.start = createButton(" = "); // Opret knap
        this.start.mouseClicked(this.Beregn.bind(this)); // Kald Beregn metoden når knappen klikkes
        this.start.position(160, 305); // Opdateret position for knappen
        this.start.size(90, 40); // Opdateret størrelse for knappen
  
    /* Opret knapper fra 0-9 med createButton, og gør så kalder de på TilføjTegn metoden når de klikkes */
      let _7 = createButton("7");
        _7.position(60, 110); _7.size(40, 40);
        _7.mousePressed ( () => {this.TilføjTegn(n = "7");} );
      let _8 = createButton("8");
        _8.position(110, 110); _8.size(40, 40);
        _8.mousePressed ( () => {this.TilføjTegn(n = "8");});
      let _9 = createButton("9");
        _9.position(160, 110); _9.size(40, 40);
        _9.mousePressed ( () => {this.TilføjTegn(n = "9");});
      let _4 = createButton("4");
        _4.position(60, 160); _4.size(40, 40);
        _4.mousePressed ( () => {this.TilføjTegn(n = "4");});
      let _5 = createButton("5");
        _5.position(110, 160); _5.size(40, 40);
        _5.mousePressed ( () => {this.TilføjTegn(n = "5");});
      let _6 = createButton("6");
        _6.position(160, 160); _6.size(40, 40);
        _6.mousePressed ( () => {this.TilføjTegn(n = "6");});
      let _1 = createButton("1");
        _1.position(60, 210); _1.size(40, 40);
        _1.mousePressed ( () => {this.TilføjTegn(n = "1");});
      let _2 = createButton("2");
        _2.position(110, 210); _2.size(40, 40);
        _2.mousePressed ( () => {this.TilføjTegn(n = "2");});
      let _3 = createButton("3");
        _3.position(160, 210); _3.size(40, 40);
        _3.mousePressed ( () => {this.TilføjTegn(n = "3");});
      let _0 = createButton("0");
        _0.position(110, 260); _0.size(40, 40);
        _0.mousePressed ( () => {this.TilføjTegn(n = "0");});
  
    // Opret knapper for + - * / med createButton, og gør så de tilføjer tegnet til inputfeltet når de klikkes
      let plus = createButton("+");
        plus.position(210, 110); plus.size(40, 40);
        plus.mousePressed ( () => {this.TilføjTegn(n = "+");});
      let minus = createButton("-");
        minus.position(210, 160); minus.size(40, 40);
        minus.mousePressed ( () => {this.TilføjTegn(n = "-");});
      let gange = createButton("*");
        gange.position(210, 210); gange.size(40, 40);
        gange.mousePressed ( () => {this.TilføjTegn(n = "*");});
      let divider = createButton("/");
        divider.position(210, 260); divider.size(40, 40);
        divider.mousePressed ( () => {this.TilføjTegn(n = "/");});
  
    // Opret knap for at slette det sidste tal i inputfeltet
      let slet = createButton("<--");
        slet.position(60, 260); slet.size(40, 40);
        slet.mousePressed ( () => {this._input.value(this._input.value().slice(0, -1));});
    // Opret knap for at slette alt i inputfeltet
      let AC = createButton("AC");
        AC.position(160, 260); AC.size(40, 40);
        AC.mousePressed ( () => {this.ClearDisplay();});
    }
  
    Beregn() {
        let result = this.CPU.Beregn(this.Læsinput(this._input.value())); //Henter regnestykket som en streng fra inputfeltet, kalder Læsniput og sender til CPU.Beregn  
    
        console.log(`Resultatet er: ${result}`); // Udskriv resultatet i konsollen
        this.Display.showResult(result, this._input); // Vis resultatet på skærmen ved hjælp af Display-klassen
    }
  
    // Opdateret Læsinput metode, der tager en inputstreng og returnerer et objekt
    Læsinput(inputString) {
      // Tomme lister til at holde operatører og tal
      let inputList = { 
        operators: [], 
        numbers: [], 
      };
      let elements = inputString.split(/([\+\-\*\/])/); // Split strengen ved hjælp af regulære udtryk
      let currentNumber = ""; // Tom streng til at holde det nuværende tal
  
      for (let i = 0; i < elements.length; i++) {
        let element = elements[i].trim(); // Fjern whitespace fra elementet
  
        if (element === '+' || element === '-' || element === '*' || element === '/') {
          inputList.operators.push(element); // Tilføj operatoren til listen af operatører
        } else {
          currentNumber += element; // Tilføj elementet til currentNumber
          // Tjek om næste element er en operator eller slutningen af strengen
          let nextElement = elements[i + 1]; // Hent næste element
          if (nextElement === undefined || nextElement === '+' || nextElement === '-' || nextElement === '*' || nextElement === '/') {
            inputList.numbers.push(parseInt(currentNumber)); // Tilføj det nuværende tal til listen af tal
            currentNumber = ""; // Nulstil currentNumber
          }
        }
      }
      return inputList; // Returner inputList
    }
    TilføjTegn(n){
        console.log("Tilføj tegn blev kaldt");
        console.log(`Tallet du klikkede er: ${n}`);
        this._input.value(this._input.value() + n);
    }
    ClearDisplay(){
        this._input.value("");
    }
  }
  
  // CPU-klassen, der udfører beregningerne
  class CPU {
    Beregn(inputList) {
      let result = 0;
  
      if (inputList.numbers.length > 0) {
        result = inputList.numbers[0]; // Startresultatet er lig med det første tal
      }
  
      // Loop igennem operatorerne og tallene og udfør operationerne
      for (let i = 0; i < inputList.operators.length; i++) {
        let operator = inputList.operators[i]; // Hent operatoren
        let num = inputList.numbers[i + 1]; // Hent det næste tal
  
        if (operator === '+') {
          result += num; // Addition
        } else if (operator === '-') {
          result -= num; // Subtraktion
        } else if (operator === '*') {
            result *= num; // Multiplikation
        } else if (operator === '/') {
          if (num === 0) {
            throw new Error('Division by zero is not allowed');
          }
          result /= num;
        } else {
          throw new Error(`Invalid operator: ${operator}`);
        }   
      }
      return result; // Returner resultatet så Display kan hente det
    }
  }
  // Display-klassen, der viser resultatet på skærmen
  class Display {
    showResult(result, _input) {
      _input.value(result); // Set the value of the input field to the resultbackground(200); 
      /*background(200); // Opdater baggrundsfarven
      textSize(18); // Indstil tekststørrelsen for resultatet
      text(`Resultat: ${result}`, 30, 300); // Vis resultatet på skærmen*/
    }
  }
  
  const OpretLommeregner = new Lommeregner(); // Opret en instans af Lommeregner-klassen