//setup funtion til at sætte canvas op
function setup() {
    createCanvas(400, 400); // Opret canvas
    background(250); // Sæt baggrundsfarve
  }

// Lommeregner-klassen, der styrer programmet
class Lommeregner {
    constructor() {
      this.CPU = new CPU(); // Opret instans af CPU-klassen
      this.Display = new Display(); // Opret instans af Display-klassen

      this._input = createInput("23+82*23/42"); // Opret inputfelt
        this._input.position(40, 40); // Opdateret position for inputfeltet
        this._input.size(200, 20); // Opdateret størrelse for inputfeltet
      this.start = createButton("Regn for satan"); // Opret knap
        this.start.mouseClicked(this.Beregn.bind(this)); // Kald Beregn metoden når knappen klikkes
        this.start.position(40, 75); // Opdateret position for knappen
    }

    Beregn() {
      let result = this.CPU.Beregn(this.Læsinput(this._input.value())); //Henter regnestykket som en streng fra inputfeltet, kalder Læsniput og sender til CPU.Beregn  
  
      console.log(`Resultatet er: ${result}`); // Udskriv resultatet i konsollen
      this.Display.showResult(result); // Vis resultatet på skærmen ved hjælp af Display-klassen
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
        }
        else if (operator === '/') {
        result /= num; // Multiplikation
        }
        
          
      }
  
      return result;
    }
  }
  // Display-klassen, der viser resultatet på skærmen
  class Display {
    showResult(result) {
      background(200); // Opdater baggrundsfarven
      textSize(18); // Indstil tekststørrelsen for resultatet
      text(`Resultat: ${result}`, 30, 160); // Vis resultatet på skærmen
    }
  }
  
  const OpretLommeregner = new Lommeregner(); // Opret en instans af Lommeregner-klassen