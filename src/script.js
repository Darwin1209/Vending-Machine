const weightProduct = {
    espresso : 100,
    latte : 250,
    cappucino : 250,
    bananaLatte : 300,
    vanilCappucino : 300,
    flatUait : 280,
    milk : 50,
    syrop : 50,
};

const expenseMilk = {
    latte : 100,
    cappucino : 80,
    flatUait : 120,
}

const price = {
    espresso: 90,
    latte: 130,
    cappucino: 110,
    bananaLatte: 150,
    vanilCappucino: 150,
    flatUait: 100,
    milk: 25,
    syrop: 35
}

const coffeeMachine = {
    countCupSmall : 5,
    countCupBig : 6,
    cupSmall : 250,
    cupBig : 380,
    countSyropBanana : 500,
    countSyropVanile : 500,
    countSyropCherry : 500,
    countMilk : 1000,
    syrop: 0,
    milk: 0,
    weight : 0,
    price: 0,
    checked: 0,
    cooked: 0,
    product: undefined,
    refresh() {
        this.syrop = 0;
        this.milk = 0;
        this.price = 0;
        this.checked = 0;
        this.weight = 0;
        this.product = undefined;
    },
    espresso() {
        this.weight += weightProduct.espresso;
        this.price += price.espresso
    },
    latte() {
        this.weight += weightProduct.latte;
        this.milk += expenseMilk.latte;
        this.price += price.latte
    },
    cappucino() {
        this.weight += weightProduct.cappucino;
        this.milk += expenseMilk.cappucino;
        this.price += price.cappucino
    },
    bananaLatte() {
        this.weight += weightProduct.bananaLatte;
        this.milk += expenseMilk.latte;
        this.syrop += weightProduct.syrop;
        this.price += price.bananaLatte
    },
    vanilCappucino() {
        this.weight += weightProduct.vanilCappucino;
        this.milk += expenseMilk.cappucino;
        this.syrop += weightProduct.syrop;
        this.price += price.vanilCappucino
    },
    flatUait() {
        this.weight += weightProduct.flatUait;
        this.milk += expenseMilk.flatUait;
        this.price += price.flatUait
    },
    milked() {
        this.milk += weightProduct.milk;
        this.weight += weightProduct.milk;
        this.price += price.milk
    },
    syroped() {
        this.syrop += weightProduct.syrop;
        this.weight += weightProduct.syrop;
        this.price += price.syrop
    },
    payment() {
        if (this.weight <= this.cupSmall) {
            this.countCupSmall -= 1;
        } else {
            this.countCupBig -= 1;
        }
        if (coffeeMachine.product == "Банановый латте") {
            this.countSyropBanana -= this.syrop;
        } else if (coffeeMachine.product == "Ванильный капучино") {
            this.countSyropVanile -= this.syrop;
        } else {
            this.countSyropCherry -= this.syrop; 
        }
        this.countMilk -= this.milk;
        this.refresh();
    }
};

function blured(collections){
    for (let i = 0; i < collections.length; i++){
        collections[i].classList.add("blured");
    }
}

function removeBlured(collections){
    for (let i = 0; i < collections.length; i++){
        collections[i].classList.remove("blured");
    }
}


const blocksClassic = document.querySelectorAll(".classic-drinks");
const blocksCustom = document.querySelectorAll(".custom-drinks");
const blocksOption = document.querySelectorAll(".options");
const headInfo = document.querySelector(".infoProduct");
const machineInfo = document.querySelector(".infoCoffeeMachine");
machineInfo.textContent = `Количество стаканчиков:Больших: ${coffeeMachine.countCupBig}, \t Маленьких: ${coffeeMachine.countCupSmall}
\nКоличество сиропа: Вишнёвый: ${coffeeMachine.countSyropCherry}, \t Банановый: ${coffeeMachine.countSyropBanana}, \t Ванильный: ${coffeeMachine.countSyropVanile}
\nКоличество молока:${coffeeMachine.countMilk}`;

document.querySelector(".view").addEventListener("click", (event) => {
    const choice = event.target.dataset.info;
    const category = event.target.className;
    switch (category) {
        case "classic-drinks":
            if(coffeeMachine.checked != 0 || coffeeMachine.cooked == 1){
                return;
            }
            coffeeMachine.checked = 1;
            blured(blocksCustom);
            coffeeMachine[choice]();
            coffeeMachine.product = event.target.dataset.alt;
            headInfo.textContent = `Ваш заказ: ${coffeeMachine.product}, цена ${coffeeMachine.price}`;
            break;
        case "custom-drinks":
            if(coffeeMachine.checked != 0 || coffeeMachine.cooked == 1){
                return;
            }
            coffeeMachine.checked = 2;
            blured(blocksClassic);
            blured(blocksOption);
            coffeeMachine[choice]();
            coffeeMachine.product = event.target.dataset.alt;
            headInfo.textContent = `Ваш заказ: ${coffeeMachine.product}, цена ${coffeeMachine.price}`;
            break;
        case "options":
            if(coffeeMachine.checked == 2 || coffeeMachine.cooked == 1){
                return;
            } else if(coffeeMachine.weight + 50 > 380){
                return;
            } else if(coffeeMachine.syrop >= 100 && choice == "syroped") {
                return;
            }
            //coffeeMachine.product = coffeeMachine.product || event.target.dataset.alt
            coffeeMachine[choice]();
            headInfo.textContent = `Ваш заказ: ${coffeeMachine.product}, цена ${coffeeMachine.price}`;
            break;
        case "payment":
            if(coffeeMachine.weight < 100 && coffeeMachine.syrop <= 100){
                return
            }
            coffeeMachine.cooked = 1;
            coffeeMachine[choice]();
            headInfo.textContent = "Напиток начал готовиться";
            machineInfo.textContent = `Количество стаканчиков:Больших: ${coffeeMachine.countCupBig}, \t Маленьких: ${coffeeMachine.countCupSmall}
            \nКоличество сиропа: Вишнёвый: ${coffeeMachine.countSyropCherry}, \t Банановый: ${coffeeMachine.countSyropBanana}, \t Ванильный: ${coffeeMachine.countSyropVanile}
            \nКоличество молока:${coffeeMachine.countMilk}`;
            setTimeout(()=>{
                headInfo.textContent = "Напиток готов, пожалуйста заберите!";
                coffeeMachine.cooked = 0;
                removeBlured(blocksOption);
                removeBlured(blocksCustom);
                removeBlured(blocksClassic);
            }, 4000)
            break
        case "refresh":
            coffeeMachine.cooked = 0;
            removeBlured(blocksOption);
            removeBlured(blocksCustom);
            removeBlured(blocksClassic);
            coffeeMachine[choice]();
            headInfo.textContent = "";
            break
    }
})