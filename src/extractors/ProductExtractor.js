// recebe o HTML da página e extrai os dados do produto usando seletores CSS

const cheerio = require("cheerio");
const Product = require("../models/Product");


class ProductExtractor {

  constructor(html, url) {
    this.$ = cheerio.load(html);
    this.url = url;
  }

  _trySelectors(selectors) {
    for (const selector of selectors) {
      const text = this.$(selector).first().text().trim();
      if (text) return text;
    }
    return "";
  }

  _tryAttr(selectors, attr) {
    for (const selector of selectors) {
      const value = this.$(selector).first().attr(attr);
      if (value) return value.trim();
    }
    return "";
  }

  extractTitle() {
    return this._trySelectors(["h1"]);
  }

  extractPrice() {
    return this._trySelectors([".saleInCents-value"]);
  }

  extractImageUrl() {
    return this._tryAttr([".carousel-item-figure__image"], "src");
  }

  extractDescription() {
    return this._trySelectors([
      ".features--description",
      "meta[name='description']"
    ]);
  }

  extract() {
    return new Product({
      title: this.extractTitle(),
      price: this.extractPrice(),
      imageUrl: this.extractImageUrl(),
      description: this.extractDescription(),
      url: this.url,
      scrapedAt: new Date().toISOString(),
    });
  }
}

module.exports = ProductExtractor;
