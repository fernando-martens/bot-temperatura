const puppeteer = require("puppeteer");

var readlineSync = require("readline-sync");

console.log("\nBem vindo ao Bot da temperatura ☁️\n");

async function robo() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  var cityname = readlineSync.question("Qual cidade deseja ver o clima? ");

  const urltosearch = `https://www.google.com/search?q=clima+em+${cityname}`;

  await page.goto(urltosearch);

  try {
    var content = await page.evaluate(() => {
      return {
        wob_loc: document.querySelector("#wob_loc").innerText,
        wob_tm: document.querySelector("#wob_tm").innerText,
        wob_pp: document.querySelector("#wob_pp").innerText,
        wob_hm: document.querySelector("#wob_hm").innerText,
        wob_ws: document.querySelector("#wob_ws").innerText,
      };
    });
  } catch (error) {
    var content = { wob_loc: null };
  }

  if (content.wob_loc == (null || undefined)) {
    console.log("\nCidade não encontrada 😞");
  } else {
    console.log("\nLocalização: 🗺️ ", content.wob_loc);
    console.log("Temperatura: 🌡️ ", content.wob_tm, "°C");
    console.log("Chuva: 🌧️ ", content.wob_pp);
    console.log("Umidade: ⛆ ", content.wob_hm);
    console.log("Vento: 💨", content.wob_ws);
  }

  await browser.close();
}

robo();
