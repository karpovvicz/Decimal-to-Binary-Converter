const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

const decimalToBinary = (input) => {
    if (input === 0 || input === 1) return String(input);
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
};

const createAnimationData = (input) => {
    let steps = [];
    let num = input;
    let delay = 2000;

    while (num > 1) {
        steps.push({
            inputVal: num,
            addElDelay: delay,
            msg: `decimalToBinary(${num}) returns "${Math.floor(num / 2)}" + ${num % 2}.`,
            showMsgDelay: delay + 3000,
            removeElDelay: delay + 6000
        });
        num = Math.floor(num / 2);
        delay += 2000;
    }

    steps.push({
        inputVal: num,
        addElDelay: delay,
        msg: `decimalToBinary(${num}) returns '1' (base case).`,
        showMsgDelay: delay + 3000,
        removeElDelay: delay + 6000
    });

    return steps.reverse();
};

const showAnimation = (input) => {
    result.innerText = "Call Stack Animation";
    animationContainer.innerHTML = "";

    const animationData = createAnimationData(input);

    animationData.forEach((obj) => {
        setTimeout(() => {
            animationContainer.innerHTML += `
                <p id="${obj.inputVal}" class="animation-frame">
                    decimalToBinary(${obj.inputVal})
                </p>
            `;
        }, obj.addElDelay);

        setTimeout(() => {
            document.getElementById(obj.inputVal).textContent = obj.msg;
        }, obj.showMsgDelay);

        setTimeout(() => {
            document.getElementById(obj.inputVal).remove();
        }, obj.removeElDelay);
    });

    setTimeout(() => {
        result.textContent = decimalToBinary(input);
    }, animationData.length * 2000 + 3000);
};

const checkUserInput = () => {
    let inputInt = Math.floor(Number(numberInput.value));

    if (isNaN(inputInt) || inputInt < 0) {
        alert("Please provide a decimal number greater than or equal to 0");
        return;
    }

    if (inputInt > 0) {
        showAnimation(inputInt);
    } else {
        result.textContent = "0";
    }

    numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkUserInput();
    }
});
