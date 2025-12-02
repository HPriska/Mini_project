/* script tetap sama (logika tidak diubah) */

const RATES_PER_HOUR = {
  motor: 2000,
  car: 5000,
  truck: 15000
};

const form = document.getElementById("calcForm");
const resultBox = document.getElementById("result");
const summaryEl = document.getElementById("summary");
const breakdownEl = document.getElementById("breakdown");
const resetBtn = document.getElementById("resetBtn");

function formatRupiah(x) {
  return "Rp " + Number(x).toLocaleString("id-ID");
}

function minutesBetween(start, end) {
  return Math.ceil((end - start) / 60000);
}

function applyRounding(mins, method) {
  if (method === "per_minute") return mins;
  if (method === "ceil_15") return 15 * Math.ceil(mins / 15);
  if (method === "ceil_hour") return 60 * Math.ceil(mins / 60);
  return mins;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const vehicle = document.getElementById("vehicle").value;
  const rounding = document.getElementById("rounding").value;
  const entry = document.getElementById("entry").value;
  const exit = document.getElementById("exit").value;

  if (!entry || !exit) return alert("Isi waktu masuk dan keluar dulu ya.");

  const start = new Date(entry);
  const end = new Date(exit);

  if (isNaN(start) || isNaN(end)) return alert("Format waktu tidak valid.");
  if (end <= start) return alert("Waktu keluar harus setelah waktu masuk.");

  const realMins = minutesBetween(start, end);
  const roundedMins = applyRounding(realMins, rounding);

  const rateHour = RATES_PER_HOUR[vehicle] ?? 0;
  const rateMinute = rateHour / 60;

  const costReal = realMins * rateMinute;
  const costRounded = roundedMins * rateMinute;

  const hReal = Math.floor(realMins / 60);
  const mReal = realMins % 60;

  const hRounded = Math.floor(roundedMins / 60);
  const mRounded = roundedMins % 60;

  summaryEl.innerHTML =
    `Durasi: <strong>${hReal} jam ${mReal} menit</strong> — ` +
    `(pembulatan: ${hRounded} jam ${mRounded} menit)`;

  let text = "";
  text += `Jenis kendaraan: ${vehicle}\n`;
  text += `Tarif per jam: ${formatRupiah(rateHour)}\n`;
  text += `Tarif per menit: ${formatRupiah(rateMinute.toFixed(2))}\n\n`;
  text += `Waktu masuk: ${start.toLocaleString()}\n`;
  text += `Waktu keluar: ${end.toLocaleString()}\n`;
  text += `Durasi sebenarnya: ${realMins} menit\n`;
  text += `Durasi setelah pembulatan: ${roundedMins} menit\n\n`;
  text += `Biaya tanpa pembulatan: ${formatRupiah(Math.round(costReal))}\n`;

  if (roundedMins !== realMins) {
    text += `Biaya setelah pembulatan: ${formatRupiah(Math.round(costRounded))}\n`;
  } else {
    text += `Total: ${formatRupiah(Math.round(costReal))}\n`;
  }

  breakdownEl.textContent = text;
  resultBox.style.display = "block";
});

resetBtn.addEventListener("click", () => {
  form.reset();
  resultBox.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  document.getElementById("exit").value = local;
});
