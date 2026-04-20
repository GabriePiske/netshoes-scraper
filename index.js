const NetshoesScraper = require("./src/scrapers/NetshoesScraper");
const OutputService = require("./src/services/OutputService");

const DEFAULT_URL =
  "https://www.netshoes.com.br/p/tenis-puma-flyer-flex-bdp-masculino-PI3-0499-375?sellerId=0";

async function main() {
  const url = process.argv[2] || DEFAULT_URL;

  console.log("==============================================");
  console.log("  Netshoes Web Scraper");
  console.log("==============================================");
  console.log(`  URL alvo: ${url}`);
  console.log("==============================================\n");

  const scraper = new NetshoesScraper({ headless: true, timeout: 30000 });
  const output = new OutputService("./output");

  try {
    const product = await scraper.scrapeProduct(url);

    console.log(product.toString());

    output.saveAsJson(product);
  } catch (err) {
    console.error("[ERRO] Falha ao executar o scraper:", err.message);
    process.exitCode = 1;
  } finally {
    await scraper.close();
  }
}

main();
