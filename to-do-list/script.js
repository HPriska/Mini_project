const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  const del = document.createElement("button");
  del.textContent = "X";
  del.className = "delete";
  del.onclick = () => li.remove();

  li.appendChild(del);
  list.appendChild(li);
  input.value = "";
}

addBtn.onclick = addTask;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

document.getElementById("toggleDark").onclick = () => {
  document.body.classList.toggle("dark");
};
