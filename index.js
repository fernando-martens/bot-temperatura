const puppeteer = require("puppeteer");
var readlineSync = require("readline-sync");

console.log("\nBem-vindo ao Bot da temperatura ☁️\n");

async function robo() {

  var cityname = readlineSync.question("Qual cidade deseja ver o clima? ");
  const urltosearch = `https://www.google.com/search?q=clima+em+${cityname}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const timerStart = Date.now();
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
    console.log("\nCidade não encontrada 😞");
  }

  await browser.close();

  const timerEnd = Date.now();
  const timer = (timerEnd - timerStart) / 1000
  console.log(`\nBusca realizada em ${timer}s`)

  if (!content) return

  console.log("\nLocalização: 🗺️ ", content.wob_loc);
  console.log("Temperatura: 🌡️ ", content.wob_tm, "°C");
  console.log("Chuva: 🌧️ ", content.wob_pp);
  console.log("Umidade: ⛆ ", content.wob_hm);
  console.log("Vento: 💨", content.wob_ws);

  return;
}


async function Main() {

  controller = true
  do {
    await robo();
    var responseQuestion = ''
    do {
      responseQuestion = readlineSync.question("\n\nDeseja realizar outra pesquisa ?\n1 - sim\n2 - nao\n");
      if (responseQuestion != '1' && responseQuestion != '2') {
        console.log("\nResposta inválida, REDIGITE: ⚠️");
      }
    } while (responseQuestion != '1' && responseQuestion != '2');

    if (responseQuestion == '2') {
      controller = false;
    }
  } while (controller)

}

Main();