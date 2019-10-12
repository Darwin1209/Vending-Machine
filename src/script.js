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
    refresh() {
        this.syrop = 0;
        this.milk = 0;
        this.price = 0;
        this.checked = 0;
        this.weight = 0;
    },
    espresso() {
        this.weight += weightProduct.espresso;
    },
    latte() {
        this.weight += weightProduct.latte;
        this.milk -= expenseMilk.latte;
    },
    cappucino() {
        this.weight += weightProduct.cappucino;
        this.milk += expenseMilk.cappucino;
    },
    bananaLatte() {
        this.weight += weightProduct.bananaLatte;
        this.milk += expenseMilk.latte;
        this.countSyropBanana -= weightProduct.syrop;
    },
    vanilCappucino() {
        this.weight += weightProduct.vanilCappucino;
        this.milk += expenseMilk.cappucino;
        this.countSyropVanile -= weightProduct.syrop;
    },
    flatUait() {
        this.weight += weightProduct.flatUait;
        this.milk += expenseMilk.flatUait;
    },
    milked() {
        this.milk += weightProduct.milk;
        this.weight += weightProduct.milk;
    },
    syrop() {
        this.syrop -= weightProduct.syrop;
        this.weight += weightProduct.syrop;
    },
    payment(product) {
        if (this.weight <= this.cupSmall) {
            this.countCupSmall -= 1;
        } else {
            this.countCupBig -= 1;
        }
        if (product == "banana-latte") {
            this.countSyropBanana -= this.syrop;
        } else if (product == "banana-latte") {
            this.countSyropVanile -= this.syrop;
        } else {
            this.countSyropCherry -= this.syrop; 
        }
        this.countMilk -= this.milk;
        refresh();
    }
};

document.querySelector(".view").addEventListener("click", (event) => {
    if(event.target.dataset.info == "refresh"){
        console.log("Horay");
    }
})