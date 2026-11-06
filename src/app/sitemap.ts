import type { MetadataRoute } from "next";
import { paginas } from "@/lib/seo";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(paginas).map((caminho) => ({
    url: caminho === "/" ? site.url : `${site.url}${caminho}`,
    changeFrequency: caminho === "/" ? "weekly" : "monthly",
    priority: caminho === "/" ? 1 : caminho.startsWith("/servicos/") ? 0.7 : 0.8,
  }));
}
