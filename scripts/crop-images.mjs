import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (name) => path.join(root, "imagens", name);
const out = (name) => path.join(root, "public", "images", name);
const app = (name) => path.join(root, "src", "app", name);

fs.mkdirSync(path.join(root, "public", "images"), { recursive: true });

const treat = (img) =>
  img.modulate({ brightness: 1.3, saturation: 1.1 });

const jpeg = { quality: 78, mozjpeg: true };

async function carrossel(index, slug, partes) {
  const file = src(`carrossel-atendimento-${index}.jpg`);
  const meta = await sharp(file).metadata();
  const h = meta.height;
  const faixa = Math.round(h * 0.44);
  const aparaBase = 50;
  const aparaTopo = slug === "condominios" ? 100 : 0;
  const regioes = {
    topo: {
      left: 0,
      top: aparaTopo,
      width: meta.width,
      height: faixa - aparaTopo,
    },
    base: {
      left: 0,
      top: h - faixa - aparaBase,
      width: meta.width,
      height: faixa,
    },
  };
  for (const parte of partes) {
    const regiao = { ...regioes[parte] };
    if (slug === "empresas" && parte === "base") {
      regiao.width = 690;
    }
    await treat(sharp(file).extract(regiao))
      .jpeg(jpeg)
      .toFile(out(`${slug}-${parte}.jpg`));
  }
}

async function simples(origem, destino, largura) {
  await treat(sharp(src(origem)).resize({ width: largura, withoutEnlargement: true }))
    .jpeg(jpeg)
    .toFile(out(destino));
}

await carrossel(1, "condominios", ["topo", "base"]);
await carrossel(2, "empresas", ["topo", "base"]);
await carrossel(3, "casas", ["topo", "base"]);
await carrossel(4, "galpoes", ["topo", "base"]);
await carrossel(5, "hospitais", ["base"]);
await carrossel(6, "escolas", ["topo", "base"]);
await carrossel(7, "industrias", ["topo", "base"]);

await simples("cameras-na-cidade.jpg", "cameras-cidade.jpg", 1200);
await simples("servico-cameras.jpg", "cameras-celular.jpg", 1200);
await simples("servico-interfone-1.jpg", "limpeza.jpg", 1200);
await simples("servico-seguranca-1.jpg", "recepcao.jpg", 612);
await simples("stock-aeroporto-fila-seguranca.jpg", "controle-acesso.jpg", 1200);

const candidata = (origem) => path.join(root, "imagens-candidatas", origem);

const servicos = [
  ["unsplash/controle-acesso-1", "acesso-catracas"],
  ["pixabay/controle-acesso-2", "acesso-lobby"],
  ["unsplash/cameras-2", "cameras-parede"],
  ["pexels/manobrista-2", "manobrista-chave"],
  ["unsplash/limpeza-1", "limpeza-aspirador"],
  ["pixabay/limpeza-1", "limpeza-corredor"],
  ["pexels/limpeza-pos-obra-2", "posobra-aspirador"],
  ["unsplash/limpeza-pos-obra-2", "posobra-salao"],
  ["pexels/zeladoria-2", "zeladoria-reparo"],
  ["pixabay/manutencao-1", "manutencao-quadro"],
  ["pexels/manutencao-1", "manutencao-multimetro"],
  ["pexels/jardinagem-1", "jardinagem-cerca"],
  ["unsplash/jardinagem-2", "jardinagem-arbusto"],
  ["pixabay/recepcionista-1", "recepcao-balcao"],
  ["pixabay/recepcionista-2", "recepcao-lobby"],
  ["pexels/interinos-2", "interinos-equipe"],
];

for (const [origem, destino] of servicos) {
  await treat(sharp(candidata(origem + ".jpg")).resize({ width: 1200, withoutEnlargement: true }))
    .jpeg(jpeg)
    .toFile(out(destino + ".jpg"));
}

await sharp(src("logo-fort-protection.png"))
  .resize(512, 512)
  .png()
  .toFile(app("icon.png"));

await sharp(src("logo-fort-protection.png"))
  .resize(180, 180)
  .flatten({ background: "#0b0d10" })
  .png()
  .toFile(app("apple-icon.png"));

await sharp(src("banner-home.jpg"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(app("opengraph-image.jpg"));

await sharp(src("logo-fort-protection.png"))
  .resize(176, 176)
  .png()
  .toFile(out("logo-fort-protection.png"));

console.log("ok");
