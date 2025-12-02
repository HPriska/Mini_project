function lbToKg(lb){ return lb * 0.45359237; }
function cmToM(cm){ return cm / 100; }
function inchToCm(i){ return i * 2.54; }
function ftToCm(ft){ return ft * 30.48; }

function getKg(w, unit){
  if (!w) return 0;
  const val = parseFloat(w);
  return unit === "lb" ? lbToKg(val) : val;
}

function getMeters(h, unit){
  if (!h) return 0;
  const v = parseFloat(h);
  if(unit === "m") return v;
  if(unit === "cm") return cmToM(v);
  if(unit === "in") return cmToM(inchToCm(v));
  if(unit === "ft") return cmToM(ftToCm(v));
  return v;
}

function calcBMI(kg, m){
  if (kg <= 0 || m <= 0) return null;
  return kg / (m * m);
}

function categorize(bmi){
  if(bmi < 18.5) return {cat:"Kurus (Underweight)", color:"#60a5fa"};
  if(bmi < 25) return {cat:"Normal", color:"var(--good)"};
  if(bmi < 30) return {cat:"Overweight", color:"#f59e0b"};
  return {cat:"Obesitas", color:"#fb7185"};
}

const weightEl = document.getElementById("weight");
const weightUnitEl = document.getElementById("weightUnit");
const heightEl = document.getElementById("height");
const heightUnitEl = document.getElementById("heightUnit");
const bmiValueEl = document.getElementById("bmiValue");
const bmiCatEl = document.getElementById("bmiCategory");
const historyList = document.getElementById("historyList");

function updateResult(){
  const kg = getKg(weightEl.value, weightUnitEl.value);
  const m  = getMeters(heightEl.value, heightUnitEl.value);
  const bmiVal = calcBMI(kg, m);

  if(!bmiVal){
    bmiValueEl.textContent = "—";
    bmiCatEl.textContent = "Masukkan nilai yang valid";
    bmiCatEl.style.color = "";
    return null;
  }

  const bmi = Math.round(bmiVal * 10) / 10;
  const cat = categorize(bmi);

  bmiValueEl.textContent = bmi;
  bmiCatEl.textContent = cat.cat;
  bmiCatEl.style.color = cat.color;

  return {bmi, category: cat.cat};
}

document.getElementById("calc").onclick = updateResult;

document.getElementById("reset").onclick = () => {
  weightEl.value = "";
  heightEl.value = "";
  bmiValueEl.textContent = "—";
  bmiCatEl.textContent = "Masukkan berat dan tinggi lalu tekan \"Hitung BMI\"";
  bmiCatEl.style.color = "";
};

const STORAGE_KEY = "bmi_history_v1";

function loadHistory(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveHistory(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function renderHistory(){
  const list = loadHistory();
  historyList.innerHTML = "";

  if(list.length === 0){
    historyList.textContent = "Belum ada riwayat.";
    return;
  }

  list.slice().reverse().forEach(item => {
    const row = document.createElement("div");
    row.style.padding = "8px";
    row.style.borderBottom = "1px solid rgba(0,0,0,0.05)";
    row.innerHTML = `
      <strong>${item.bmi}</strong> — ${item.category}
      <div style="color:var(--muted);font-size:13px;margin-top:6px">
        ${item.weight} ${item.weightUnit} • ${item.height} ${item.heightUnit} • ${item.time}
      </div>
    `;
    historyList.appendChild(row);
  });
}

document.getElementById("save").onclick = () => {
  const res = updateResult();
  if(!res) return alert("Tidak ada hasil untuk disimpan.");

  const list = loadHistory();
  const time = new Date().toLocaleString();

  list.push({
    bmi: res.bmi,
    category: res.category,
    weight: weightEl.value || "—",
    weightUnit: weightUnitEl.value,
    height: heightEl.value || "—",
    heightUnit: heightUnitEl.value,
    time
  });

  saveHistory(list);
  renderHistory();
};

document.getElementById("clearHistory").onclick = () => {
  if(confirm("Hapus seluruh riwayat?")){
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
  }
};

const darkBtn = document.getElementById("toggleDark");
darkBtn.onclick = () => {
  document.body.classList.toggle("dark");
  darkBtn.textContent = document.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
};

renderHistory();
