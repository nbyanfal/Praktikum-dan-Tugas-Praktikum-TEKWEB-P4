const form = document.createElement("form");
form.noValidate = true;

const labelNama = document.createElement("label");
labelNama.textContent = "Nama";
labelNama.htmlFor = "nama";

const inputNama = document.createElement("input");
inputNama.type = "text";
inputNama.id = "nama";
inputNama.name = "nama";
inputNama.autocomplete = "name";

const labelEmail = document.createElement("label");
labelEmail.textContent = "Email";
labelEmail.htmlFor = "email";

const inputEmail = document.createElement("input");
inputEmail.type = "email";
inputEmail.id = "email";
inputEmail.name = "email";
inputEmail.autocomplete = "email";

const btnSubmit = document.createElement("button");
btnSubmit.type = "submit";
btnSubmit.textContent = "Submit";

const errorDiv = document.createElement("div");
errorDiv.id = "error-message";
errorDiv.setAttribute("role", "status");
errorDiv.setAttribute("aria-live", "polite");
errorDiv.style.color = "#b91c1c";

form.appendChild(labelNama);
form.appendChild(inputNama);
form.appendChild(labelEmail);
form.appendChild(inputEmail);
form.appendChild(btnSubmit);
form.appendChild(errorDiv);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = inputNama.value.trim();
  const email = inputEmail.value.trim();
  const errorMessages = [];

  if (nama === "") {
    errorMessages.push("Nama tidak boleh kosong.");
  }

  if (!email.includes("@")) {
    errorMessages.push("Email harus mengandung @.");
  }

  if (errorMessages.length > 0) {
    errorDiv.textContent = errorMessages.join(" ");
    errorDiv.style.color = "#b91c1c";
    return;
  }

  errorDiv.textContent = "Form valid! Data berhasil dikirim.";
  errorDiv.style.color = "#15803d";
});

const outputDiv = document.getElementById("output4");
if (!outputDiv) {
  throw new Error('Elemen dengan id "output4" tidak ditemukan.');
}

outputDiv.appendChild(form);