class CalculatorControler {
  constructor() {
    this.display = document.querySelector('output');
    this.date = document.querySelector('span');
    this.buttons = document.querySelectorAll('button');
    this.value = [];
    this.initialize();
  }

  initialize() {
    this.handleButtons();
    this.handleDisplay();
    this.handleDate();
    setInterval(() => {
      this.handleDate();
    }, 1000);
  }

  handleDate() {
    const currentDate = new Date();
    const hours = currentDate.toLocaleTimeString('pt-BR');
    this.date.innerHTML = hours;
    return this.date;
  }

  handleDisplay(value) {
    this.display.innerHTML = value === undefined ? 0 : value;
    return this.display;
  }

  handleButtons() {
    this.buttons.forEach(button =>
      button.addEventListener('click', event => {
        const data = event.target.value;
        this.handleSwitch(data);
      }),
    );
  }

  handleSwitch(data) {
    switch (data) {
      case '0':
        this.handleNumbers(data);
        break;
      case '1':
        this.handleNumbers(data);
        break;
      case '2':
        this.handleNumbers(data);
        break;
      case '3':
        this.handleNumbers(data);
        break;
      case '4':
        this.handleNumbers(data);
        break;
      case '5':
        this.handleNumbers(data);
        break;
      case '6':
        this.handleNumbers(data);
        break;
      case '7':
        this.handleNumbers(data);
        break;
      case '8':
        this.handleNumbers(data);
        break;
      case '9':
        this.handleNumbers(data);
        break;
      case '+':
        this.handleOperations(data);
        break;
      case '-':
        this.handleOperations(data);
        break;
      case '*':
        this.handleOperations(data);
        break;
      case '/':
        this.handleOperations(data);
        break;
      case '%':
        this.handlePercentual(data);
        break;
      case 'ac':
        this.handleClearAll(data);
        break;
      case '.':
        this.handleOperations(data);
        break;
      case '=':
        this.resolve(data);
        break;
    }
  }

  lastPosition() {
    return this.value[this.value.length - 1];
  }

  handleOperations(operations) {
    if (this.value.length === 0) {
      return;
    } else if (typeof this.lastPosition() !== 'string') {
      this.value.push(operations);
      this.display.innerHTML = this.replacePercentage();
    } else if (typeof this.lastPosition() === 'string') {
      this.lastPosition = operations;
      this.display.innerHTML = this.replacePercentage();
    }
  }

  handleNumbers(numbers) {
    const num = parseInt(numbers);
    if (num === 0 && this.value.length === 0) {
      return;
    }
    if (typeof num === 'number') {
      this.value.push(num);
      this.display.innerHTML = this.replacePercentage();
    } else {
      return;
    }
  }

  handleClearAll() {
    this.display.innerHTML = 0;
    this.value = [];
  }

  replacePercentage() {
    return this.value.join().toString().replace(/,/g, '');
  }

  handlePercentual() {
    if (typeof this.lastPosition() === 'number') {
      const formula = '%';
      this.value.push(formula);
      this.display.innerHTML = this.replacePercentage();
    }
  }

  resolve() {
    if (this.value.length < 2) {
      return;
    }
    try {
      if (this.value[this.value.indexOf('%')] && this.value.length !== 0) {
        const findOcorrence = this.value.findIndex(item => item === '%');
        this.value[findOcorrence] = '/100*';
        let results = eval(this.value.join(''));
        this.display.innerHTML = results;
        this.value = [results];
      } else {
        let results = eval(this.value.join(''));
        this.display.innerHTML = results;
        this.value = [results];
      }
    } catch (err) {
      alert('Operação não permitida');
      this.value = [];
    }
  }
}
export default CalculatorControler;
