// busca o HTML da página em um navegador em segundo plano

const puppeteer = require("puppeteer");
const ProductExtractor = require("../extractors/ProductExtractor");

class NetshoesScraper {
  constructor({ headless = true, timeout = 30000 } = {}) {
    this.headless = headless;
    this.timeout = timeout;
    this.browser = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: this.headless,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
        "--disable-infobars",
        "--window-size=1280,800",
      ],
    });
    console.log("[Scraper] Navegador iniciado.");
  }

  async fetchHtml(url) {
    if (!this.browser) await this.init();

    const page = await this.browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/123.0.0.0 Safari/537.36"
    );

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    });

    await page.setViewport({ width: 1280, height: 800 });

    console.log(`[Scraper] Acessando: ${url}`);
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: this.timeout,
    });

    try {
      await page.waitForSelector("h1", { timeout: 10000 });
    } catch {
      console.warn("[Scraper] h1 não encontrado dentro do tempo limite, prosseguindo mesmo assim.");
    }

    const html = await page.content();
    await page.close();
    return html;
  }

  async scrapeProduct(url) {
    const html = await this.fetchHtml(url);
    const extractor = new ProductExtractor(html, url);
    return extractor.extract();
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      console.log("[Scraper] Navegador encerrado.");
    }
  }
}

module.exports = NetshoesScraper;
