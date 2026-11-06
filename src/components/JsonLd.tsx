export default function JsonLd({ dados }: { dados: object | object[] }) {
  const json = JSON.stringify(dados).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
