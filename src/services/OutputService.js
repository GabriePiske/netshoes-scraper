// mantém os últimos 5 arquivos e salva os resultados em JSON

const fs = require("fs");
const path = require("path");


class OutputService {
  constructor(outputDir = "./output", maxFiles = 5) {
    this.outputDir = outputDir;
    this.maxFiles = maxFiles;
    this._ensureDir();
  }

  _ensureDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  _cleanup() {
    const files = fs
      .readdirSync(this.outputDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => ({
        name: f,
        time: fs.statSync(path.join(this.outputDir, f)).mtimeMs,
      }))
      .sort((a, b) => a.time - b.time);

    while (files.length >= this.maxFiles) {
      const oldest = files.shift();
      fs.unlinkSync(path.join(this.outputDir, oldest.name));
      console.log(`[Output] Arquivo antigo removido: ${oldest.name}`);
    }
  }

  saveAsJson(product) {
    this._cleanup();
    const filename = `resultado_${Date.now()}.json`;
    const filePath = path.join(this.outputDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(product.toJSON(), null, 2), "utf-8");
    console.log(`[Output] Resultado salvo em: ${filePath}`);
    return filePath;
  }
}

module.exports = OutputService;
