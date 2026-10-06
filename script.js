const expressionEl = document.getElementById('expression');
const currentEl = document.getElementById('current');

let currentOperand = '0';
let previousOperand = '';
let operation = null;
let shouldResetCurrent = false;

const OPERATOR_SYMBOLS = {
  add: '+',
  subtract: '\u2212',
  multiply: '\u00d7',
  divide: '\u00f7'
};

function formatNumber(value) {
  if (value === 'Error') return value;
  const [intPart, decimalPart] = value.toString().split('.');
  const negative = intPart.charAt(0) === '-';
  const digits = negative ? intPart.slice(1) : intPart;
  const withCommas = digits === '' ? '' : Number(digits).toLocaleString('en-US');
  const sign = negative ? '-' : '';
  return decimalPart !== undefined
    ? `${sign}${withCommas}.${decimalPart}`
    : `${sign}${withCommas}`;
}

function updateDisplay() {
  currentEl.textContent = formatNumber(currentOperand);
  if (operation != null) {
    expressionEl.textContent = `${formatNumber(previousOperand)} ${OPERATOR_SYMBOLS[operation]}`;
  } else {
    expressionEl.textContent = '';
  }
}

function appendNumber(number) {
  if (currentOperand === 'Error' || shouldResetCurrent) {
    currentOperand = '';
    shouldResetCurrent = false;
  }
  if (number === '.' && currentOperand.includes('.')) return;
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
}

function chooseOperation(op) {
  if (currentOperand === 'Error') return;
  if (operation !== null && !shouldResetCurrent) {
    compute();
  }
  previousOperand = currentOperand;
  operation = op;
  shouldResetCurrent = true;
}

function trimFloatingPoint(value) {
  const rounded = parseFloat(value.toPrecision(12));
  return rounded.toString();
}

function compute() {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return;

  let result;
  switch (operation) {
    case 'add':
      result = prev + curr;
      break;
    case 'subtract':
      result = prev - curr;
      break;
    case 'multiply':
      result = prev * curr;
      break;
    case 'divide':
      if (curr === 0) {
        currentOperand = 'Error';
        operation = null;
        previousOperand = '';
        shouldResetCurrent = true;
        return;
      }
      result = prev / curr;
      break;
    default:
      return;
  }

  currentOperand = trimFloatingPoint(result);
  operation = null;
  previousOperand = '';
  shouldResetCurrent = true;
}

function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = null;
  shouldResetCurrent = false;
}

function deleteLast() {
  if (currentOperand === 'Error') {
    clearAll();
    return;
  }
  currentOperand = currentOperand.length > 1 ? currentOperand.slice(0, -1) : '0';
}

function toggleSign() {
  if (currentOperand === 'Error' || currentOperand === '0') return;
  currentOperand = currentOperand.startsWith('-')
    ? currentOperand.slice(1)
    : `-${currentOperand}`;
}

function applyPercent() {
  if (currentOperand === 'Error') return;
  currentOperand = trimFloatingPoint(parseFloat(currentOperand) / 100);
}

function handleAction(action) {
  switch (action) {
    case 'clear':
      clearAll();
      break;
    case 'delete':
      deleteLast();
      break;
    case 'percent':
      applyPercent();
      break;
    case 'sign':
      toggleSign();
      break;
    case 'equals':
      if (operation !== null) compute();
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      chooseOperation(action);
      break;
  }
  updateDisplay();
}

document.querySelectorAll('[data-number]').forEach((button) => {
  button.addEventListener('click', () => {
    appendNumber(button.dataset.number);
    updateDisplay();
  });
});

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => handleAction(button.dataset.action));
});

const KEY_MAP = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
  Enter: 'equals',
  '=': 'equals',
  Backspace: 'delete',
  Escape: 'clear',
  '%': 'percent'
};

window.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    appendNumber(e.key);
    updateDisplay();
    return;
  }
  if (e.key === '.') {
    appendNumber('.');
    updateDisplay();
    return;
  }
  if (KEY_MAP[e.key]) {
    e.preventDefault();
    handleAction(KEY_MAP[e.key]);
  }
});

updateDisplay();
