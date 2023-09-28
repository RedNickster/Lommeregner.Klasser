function setup() {
  createCanvas(400, 400);
  background(200);

  textSize(13);
  text("Operation", 191, 95);

  // Create the "Beregn" button and set its click event handler to call the Beregn function
  let start = createButton("Beregn");
  start.position(30, 130);
  start.mousePressed(lommeregner.Beregn.bind(lommeregner)); // Bind the click event to the Beregn function
}

function draw() {}

class Lommeregner {
  constructor() {
    this._a = createInput();
    this._a.position(30, 40);

    this._b = createInput();
    this._b.position(30, 70);

    this._operation = createInput();
    this._operation.position(30, 100);

    this.CPU = new CPU();
    this.Display = new Display();
  }

  Beregn() {
    let input = this.LæsInput();
    let result = this.CPU.compute(input);
    console.log(result);
    this.Display.showResult(result); // Vis resultatet på skærmen ved hjælp af Display-klassen
  }

  LæsInput() {
    return {
      a: parseFloat(this._a.value()),
      b: parseFloat(this._b.value()),
      operation: this._operation.value(),
    };
  }
}

class CPU {
  constructor() {}
  compute({ a, b, operation }) {
    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b === 0) {
          return "Kan ikke dividere med 0";
        }
        return a / b;
      default:
        return "Invalid operation";
    }
  }
}

class Display {
  showResult(result) {
    background(200);
    textSize(18); // Indstil tekststørrelsen for resultatet
    text(`Resultat: ${result}`, 30, 160); // Vis resultatet på skærmen
  }
}

const lommeregner = new Lommeregner();
