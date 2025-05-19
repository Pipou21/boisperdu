let data = {};

fetch("data.json")
  .then((response) => response.json())
  .then((json) => {
    data = json;
    displayUnlockedTexts();
  });

function checkCode() {
  const input = document.getElementById("codeInput");
  const code = input.value.trim().toUpperCase();
  const message = document.getElementById("message");

  if (data[code]) {
    if (!localStorage.getItem(code)) {
      localStorage.setItem(code, data[code]);
    }
    message.textContent = "";
    displayUnlockedTexts();
  } else {
    message.textContent = "Ce code n'existe pas ou n'est pas encore débloqué.";
  }

  input.value = "";
}

function displayUnlockedTexts() {
  const container = document.getElementById("unlockedTexts");
  container.innerHTML = "";

  Object.keys(localStorage).forEach((key) => {
    if (data[key]) {
      const div = document.createElement("div");
      div.innerHTML = `<h3>${key}</h3><p>${localStorage.getItem(key)}</p>`;
      container.appendChild(div);
    }
  });
}

function resetProgress() {
  localStorage.clear();
  displayUnlockedTexts();
}
