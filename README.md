# Netshoes Web Scraper

Web scraper desenvolvido em **Node.js** para extrair informações de produtos do site (https://www.netshoes.com.br)

---

## Função de cada classe

| Classe - Função |

| `ProductExtractor` - recebe o HTML da página e extrai os dados do produto usando seletores CSS |
| `Product` - modelo que representa um produto extraído da Netshoes |
| `NetshoesScraper` - busca o HTML da página em um navegador em segundo plano |
| `OutputService` - mantém os últimos 5 arquivos e salva os resultados em JSON |

---

## Pré-requisitos

- **Node.js** v20 ou superior — (https://nodejs.org/)
- **npm**

---

## Como executar

1. Clonar o repositório

git clone https://github.com/usuario/netshoes-scraper.git
cd netshoes-scraper

2. Instalar dependências

npm install

3. Executar o scraper 

npm start

node index.js (com a URL padrão)

node index.js "https://www.netshoes.com.br/p/camisa-botafogo-i-2526-sn-torcedor-reebok-masculina-D19-809O-028"  (com a URL de qualquer produto escolhido na netshoes)

---

## Resultado no console
```
==============================================
  Netshoes Web Scraper
==============================================
  URL alvo: https://www.netshoes.com.br/p/tenis-puma-flyer-flex-bdp-masculino-PI3-0499-375?sellerId=0
==============================================

[Scraper] Navegador iniciado.
[Scraper] Acessando: https://www.netshoes.com.br/p/tenis-puma-flyer-flex-bdp-masculino-PI3-0499-375?sellerId=0

========================================
  PRODUTO EXTRAÍDO
========================================
  Título    : Tênis Puma Flyer Flex Bdp Masculino - Chumbo+Cinza
  Preço     : R$ 279,99
  Imagem    : https://static.netshoes.com.br/produtos/tenis-puma-flyer-flex-bdp-masculino/75/PI3-0499-375/PI3-0499-375_zoom1.jpg?ts=1776592277&ims=544x
  Descrição : Supere os seus desafios! O Tênis Puma Flyer Flex Bdp é uma opção versátil de tênis esportivo para te acompanhar na corrida, na academia e no dia a dia. Com um cabedal em mesh, esse Tênis running oferece maciez e respirabilidade, enquanto a entressola traz conforto extra para os pés. O artigo também oferece amortecimento suave a cada passada. Vista uma regata esportiva e um short de corrida para dar o seu melhor nos treinos. Mantenha-se em movimento com o tênis masculino Puma!
  URL       : https://www.netshoes.com.br/p/tenis-puma-flyer-flex-bdp-masculino-PI3-0499-375?sellerId=0
  Extraído em: 2026-04-20T00:33:32.974Z
========================================

[Output] Resultado salvo em: output\resultado_1776647651921.json
[Scraper] Navegador encerrado.
```

> Os últimos 5 resultados são salvos automaticamente na pasta `output/`.

---