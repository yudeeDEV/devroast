import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export async function CodeBlock({
  code,
  language = "typescript",
  className,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "vesper",
  });

  return (
    <div
      className={`rounded-lg border border-border bg-bg-page p-4 overflow-x-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
