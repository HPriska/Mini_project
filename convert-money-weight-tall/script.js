// --- Currency Rates ---
const rates = {
  USD: 1,
  IDR: 15000,
  EUR: 0.92,
  SGD: 1.35,
  JPY: 140
};

const moneyFrom = document.getElementById('moneyFrom');
const moneyTo = document.getElementById('moneyTo');

// Populate currency dropdowns
function populateCurrencies() {
  moneyFrom.innerHTML = '';
  moneyTo.innerHTML = '';

  Object.keys(rates).forEach(code => {
    const opt1 = document.createElement('option');
    opt1.value = code;
    opt1.textContent = code;

    const opt2 = opt1.cloneNode(true);

    moneyFrom.appendChild(opt1);
    moneyTo.appendChild(opt2);
  });

  moneyFrom.value = 'USD';
  moneyTo.value = 'IDR';
}

populateCurrencies();

// Set rate fields
document.getElementById('rateUSD').value = rates.USD;
document.getElementById('rateIDR').value = rates.IDR;

// Allow editing IDR rate
document.getElementById('rateIDR').addEventListener('change', e => {
  const v = parseFloat(e.target.value) || rates.IDR;
  rates.IDR = v;
});

// Convert currency
function convertCurrency(amount, from, to){
  const inUSD = amount / rates[from];
  return inUSD * rates[to];
}

document.getElementById('convertMoney').addEventListener('click', () => {
  const amt = parseFloat(document.getElementById('moneyAmount').value) || 0;
  const from = moneyFrom.value;
  const to = moneyTo.value;
  const out = convertCurrency(amt, from, to);

  document.getElementById('moneyResult').textContent =
    `${amt} ${from} = ${formatNumber(out)} ${to}`;
});

// Swap
document.getElementById('swapMoney').addEventListener('click', () => {
  const a = moneyFrom.value;
  moneyFrom.value = moneyTo.value;
  moneyTo.value = a;

  document.getElementById('convertMoney').click();
});

// Number formatting
function formatNumber(n){
  if (Math.abs(n) >= 1e6) return n.toFixed(2);
  if (Math.abs(n) >= 1) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return n.toPrecision(4);
}

// ---------- Weight Converter ----------
const weightFactors = { kg:1, g:0.001, lb:0.45359237, oz:0.0283495231 };

document.getElementById('convertWeight').addEventListener('click', () => {
  const val = parseFloat(document.getElementById('weightAmount').value) || 0;
  const from = document.getElementById('weightFrom').value;
  const to = document.getElementById('weightTo').value;

  const inKg = val * weightFactors[from];
  const out = inKg / weightFactors[to];

  document.getElementById('weightResult').textContent =
    `${val} ${from} = ${round(out)} ${to}`;
});

document.getElementById('swapWeight').addEventListener('click', () => {
  const wfrom = document.getElementById('weightFrom');
  const wto = document.getElementById('weightTo');

  const a = wfrom.value;
  wfrom.value = wto.value;
  wto.value = a;

  document.getElementById('convertWeight').click();
});

// ---------- Height Converter ----------
const heightFactors = { cm:1, m:100, inch:2.54, ft:30.48 };

document.getElementById('convertHeight').addEventListener('click', () => {
  const val = parseFloat(document.getElementById('heightAmount').value) || 0;
  const from = document.getElementById('heightFrom').value;
  const to = document.getElementById('heightTo').value;

  const inCm = val * heightFactors[from];
  const out = inCm / heightFactors[to];

  document.getElementById('heightResult').textContent =
    `${val} ${from} = ${round(out)} ${to}`;
});

document.getElementById('swapHeight').addEventListener('click', () => {
  const hfrom = document.getElementById('heightFrom');
  const hto = document.getElementById('heightTo');

  const a = hfrom.value;
  hfrom.value = hto.value;
  hto.value = a;

  document.getElementById('convertHeight').click();
});

function round(n){
  return Math.round(n * 1000) / 1000;
}

// ---------- Dark Mode ----------
document.getElementById('toggleDark').onclick = () => {
  document.body.classList.toggle('dark');
  document.getElementById('toggleDark').textContent =
    document.body.classList.contains('dark') ? 'Light' : 'Dark';
};

// ---------- Mode Switcher ----------
function showMode(mode){
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.style.display = 'none');

  if (mode === 'money') cards[0].style.display = 'block';
  if (mode === 'weight') cards[1].style.display = 'block';
  if (mode === 'height') cards[2].style.display = 'block';
}

showMode('money');
