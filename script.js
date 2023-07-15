let menu = [];
let randomItems = [];
const menuContainer = document.querySelector(".menu-container");

function makeMenuItem(ob) {
  let item = `
          <div class="menu-item">
            <div class="menu-img">
              <img src=${ob.imgSrc} alt="item" />
            </div>
            <div class="menu-details">
              <div class="details">
                <p class="menu-name">${ob.name}</p>
                <p class="menu-price">$${ob.price}/-</p>
              </div>
              <div class="menu-btn">
                <input type="button" value="+" />
              </div>
            </div>
          </div>`;
  return item;
}

function renderMenu(arr) {
  menuContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    menuContainer.innerHTML += makeMenuItem(arr[i]);
  }
}

function thankyouFun() {
  return new Promise((resolve) => {
    resolve("Thank you for eating with us");
  });
}

function payOrder() {
  return new Promise((resolve, reject) => {
    if (menu === []) {
      reject(new Error("Payment Failed"));
    } else {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1500);
    }
  });
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    if (menu === []) {
      reject(new Error("Preparation Failed"));
    } else {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    }
  });
}

function TakeOrder() {
  return new Promise((resolve, reject) => {
    if (menu === []) {
      reject(new Error("Empty Menu List"));
    } else {
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * menu.length);
          randomItems.push(menu[randomIndex].name);
        }
        resolve(randomItems);
      }, 2500);
    }
  });
}

async function getMenu() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json",
    );
    menu = await response.json();
    renderMenu(menu);
  } catch (error) {
    return console.error("Error fetching menu:", error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    await getMenu();

    let threeRandomItems = await TakeOrder();
    console.log(threeRandomItems);

    let preparationStatus = await orderPrep();
    console.log(preparationStatus);

    let payOrderStatus = await payOrder();
    console.log(payOrderStatus);

    let thankyouMessage = await thankyouFun();
    console.log(thankyouMessage);
  } catch (error) {
    console.log(error);
  }
});
