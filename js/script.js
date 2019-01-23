let mainScreen = document.querySelector(".main-screen"),
    subScreen = document.querySelector(".sub-screen"),
    showCalc = [],
    realCalc = [],
    currentValue = 0,
    number = 0,
    isPressed = false,
    isPow = false,
    isEdit = true,
    isDot = false,
    myPow;

subScreen.value = 0;

function keyboard() {
    let key = event.target;
    if (!key.classList.contains("btn")) return;

    if (key.classList.contains("number")) {

        if (!isDot) {
            if (subScreen.value == currentValue || subScreen.value == 0 || isPow) {
                subScreen.value = "";
            }
        }

        if (subScreen.value.length < 25) {
            subScreen.value += key.value;
        } else {
            subScreen.value = subScreen.value;
        }
        isPressed = true;
    }

    if (key.id == "dot") {
        if (!isDot) {
            subScreen.value += ".";
            if (!isEdit) subScreen.value = "0.";
        }
        if(!isPressed) subScreen.value = "0.";
        isDot = true;
    }

    if (key.id == "sign") subScreen.value *= (-1);

    if (key.id == "del") {
        if (isEdit) {
            if (subScreen.value[subScreen.value.length - 1] == ".") isDot = false;
            subScreen.value = subScreen.value.substring(0, subScreen.value.length - 1);
            if (subScreen.value == "") subScreen.value = 0;
        }
    }

    if (key.id == "ce") {
        subScreen.value = 0;
        isEdit = true;
        isDot = false;
    }

    if (key.id == "c") {
        mainScreen.value = "";
        subScreen.value = 0;
        currentValue = 0;
        isPow = false;
        isPressed = false;
        isDot = false;
        isEdit = true;
        showCalc = [];
        realCalc = [];
    }

    if (key.id == "sqr") {
        subScreen.value = Math.pow(+subScreen.value, 2);
        isEdit = false;
    }

    if (key.id == "sqrt") {
        subScreen.value = Math.sqrt(+subScreen.value);
        isEdit = false;
    }

    if (key.id == "plus") press(" + ", " + ");

    if (key.id == "minus") press(" - ", " - ");

    if (key.id == "multiple") press(" * ", " × ");

    if (key.id == "divide") press(" / ", " ÷\t ");
    
    if (key.id == "factorial") {
        subScreen.value = factorial(subScreen.value);

        function factorial(n) {
            if (n <= 1) return 1;
            return factorial(n - 1) * n;
        }

        isEdit = false;
    }

    if (key.id == "sqrn") {
        if (!isPow) {
            number = subScreen.value;
            showCalc.push(subScreen.value);
            showCalc.push(" ^ ");
            mainScreen.value = showCalc.join(" ");
            myPow = function (n) {
                return Math.pow(+number, n);
            }
        }
        if (isPow) {
            showCalc.push(subScreen.value);
            showCalc.push(" ^ ");
            mainScreen.value = showCalc.join(" ");
            number = myPow(+subScreen.value);
            subScreen.value = number;
            myPow = function (n) {
                return Math.pow(+number, n);
            }

        }
        isPow = true;
        isDot = false;
    }

    if (key.id == "equally") {
        if (isPressed && isPow) {
            showCalc = [];
            mainScreen.value = "";
            realCalc.push(myPow(+subScreen.value));
            currentValue = +eval(realCalc.join(" "));
            subScreen.value = currentValue;
            realCalc = [];
            realCalc.push(currentValue);
        }
        if (isPressed && !isPow) {
            showCalc = [];
            mainScreen.value = "";
            realCalc.push(subScreen.value);
            currentValue = +eval(realCalc.join(" "));
            subScreen.value = currentValue;
            realCalc = [];
        } else {
            showCalc = [];
            mainScreen.value = "";
            realCalc = [];
        }
        isPressed = true;
        isEdit = false;
        isPow = false;
        isDot = false;

    }

    function press(realOperand, showOperand) {
        if (isPressed && isPow) {
            showCalc.push(subScreen.value);
            showCalc.push(showOperand);
            mainScreen.value = showCalc.join(" ");
            realCalc.push(myPow(+subScreen.value));
            currentValue = +eval(realCalc.join(" "));
            subScreen.value = currentValue;
            realCalc = [];
            realCalc.push(currentValue);
            realCalc.push(realOperand);
        }
        if (isPressed && !isPow) {
            showCalc.push(subScreen.value);
            showCalc.push(showOperand);
            mainScreen.value = showCalc.join(" ");
            realCalc.push(subScreen.value);
            currentValue = +eval(realCalc.join(" "));
            realCalc = [];
            realCalc.push(currentValue);
            realCalc.push(realOperand);
            subScreen.value = currentValue;
        } else {
            realCalc[realCalc.length - 1] = realOperand;
            showCalc[showCalc.length - 1] = showOperand;
            mainScreen.value = showCalc.join(" ");
        }
        isPressed = false;
        isEdit = true;
        isPow = false;
        isDot = false;
    }
}

addEventListener("click", keyboard);


