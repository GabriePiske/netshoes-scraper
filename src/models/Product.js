// modelo que representa um produto extraído da Netshoes

class Product {
  constructor({ title, price, imageUrl, description, url, scrapedAt }) {
    this.title = title || "Não encontrado";
    this.price = price || "Não encontrado";
    this.imageUrl = imageUrl || "Não encontrado";
    this.description = description || "Não encontrado";
    this.url = url || "";
    this.scrapedAt = scrapedAt || new Date().toISOString();
  }

  toString() {
    return (
      `\n========================================\n` +
      `  PRODUTO EXTRAÍDO\n` +
      `========================================\n` +
      `  Título    : ${this.title}\n` +
      `  Preço     : ${this.price}\n` +
      `  Imagem    : ${this.imageUrl}\n` +
      `  Descrição : ${this.description}\n` +
      `  URL       : ${this.url}\n` +
      `  Extraído em: ${this.scrapedAt}\n` +
      `========================================\n`
    );
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      imageUrl: this.imageUrl,
      description: this.description,
      url: this.url,
      scrapedAt: this.scrapedAt,
    };
  }
}

module.exports = Product;
