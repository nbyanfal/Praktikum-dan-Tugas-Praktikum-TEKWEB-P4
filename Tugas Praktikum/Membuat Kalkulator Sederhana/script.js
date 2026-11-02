const firstNumberInput = document.getElementById("number-one");
const secondNumberInput = document.getElementById("number-two");
const resultElement = document.getElementById("result");

const operations = {
    add: (first, second) => first + second,
    subtract: (first, second) => first - second,
    multiply: (first, second) => first * second,
    divide: (first, second) => first / second,
};

document.querySelectorAll("[data-operation]").forEach((button) => {
    button.addEventListener("click", () => {
        const firstNumber = firstNumberInput.valueAsNumber;
        const secondNumber = secondNumberInput.valueAsNumber;

        if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
            resultElement.textContent = "Masukkan dua angka yang valid terlebih dahulu.";
            return;
        }

        const operation = button.dataset.operation;
        if (operation === "divide" && secondNumber === 0) {
            resultElement.textContent = "Tidak dapat membagi dengan nol.";
            return;
        }

        const calculate = operations[operation];
        if (!calculate) {
            resultElement.textContent = "Operasi tidak dikenali.";
            return;
        }

        const result = calculate(firstNumber, secondNumber);
        resultElement.textContent = Number.isFinite(result)
            ? `Hasil: ${result}`
            : "Hasil perhitungan berada di luar jangkauan angka.";
    });
});
