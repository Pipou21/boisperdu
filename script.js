let data = {};

// ⚠️ Ligne modifiée pour forcer rechargement de data.json
fetch("data.json?" + new Date().getTime())
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
      localStorage.setItem(code, JSON.stringify(data[code]));
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
    const raw = localStorage.getItem(key);
    try {
      const entry = JSON.parse(raw);
      if (entry.titre && entry.texte) {
        const div = document.createElement("div");
        div.className = "entry";

        div.innerHTML = `
          <h3>${entry.titre}</h3>
          <div class="entry-content">
            ${entry.image ? `<img src="${entry.image}" alt="illustration" />` : ""}
            <p>${entry.texte}</p>
          </div>
          ${entry.categorie ? `<small style="color: gray;">Catégorie : ${entry.categorie}</small>` : ""}
        `;
        container.appendChild(div);
      }
    } catch (e) {
      console.error("Erreur lecture entrée locale :", raw);
    }
  });
}

function resetProgress() {
  localStorage.clear();
  displayUnlockedTexts();
}
