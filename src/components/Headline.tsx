type Props = {
  linhas: string[];
  className?: string;
};

export default function Headline({ linhas, className }: Props) {
  return (
    <h1 className={className}>
      {linhas.map((linha, i) => (
        <span className="mask" key={linha}>
          <span className="mask-in" style={{ ["--i" as string]: i }}>
            {linha}
            {i < linhas.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </h1>
  );
}
