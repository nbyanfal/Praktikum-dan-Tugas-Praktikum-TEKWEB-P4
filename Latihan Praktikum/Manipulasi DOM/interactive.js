const outputDiv = document.getElementById("output3");

if (!outputDiv) {
    throw new Error('Elemen dengan id "output3" tidak ditemukan.');
}

const btnBackground = document.createElement("button");
btnBackground.textContent = "Ubah Latar Belakang";
btnBackground.addEventListener("click", () => {
    document.body.style.backgroundColor = "#10496f";
});

const btnTextColor = document.createElement("button");
btnTextColor.textContent = "Ubah Warna Teks";
btnTextColor.addEventListener("click", () => {
    document.body.style.color = "#d52181";
});

const btnIncreaseFont = document.createElement("button");
btnIncreaseFont.textContent = "Perbesar Font";
btnIncreaseFont.addEventListener("click", () => {
    const currentSize = Number.parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = `${currentSize + 1}px`;
});

outputDiv.append(btnBackground, btnTextColor, btnIncreaseFont);