const decodeHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || doc.body.innerText;
};

export const DisplayContent = ({ content }) => {
  return <div>{decodeHtml(content)}</div>;
};

export const RichTextRenderer = ({ content }) => {
  // Decode HTML entities into actual HTML
  const parser = new DOMParser();
  const decodedContent = parser.parseFromString(content, "text/html").body
    .textContent;

  // Sanitize the decoded HTML
  const sanitizedContent = DOMPurify.sanitize(decodedContent);

  return (
    <div
      className="prose prose-lg max-w-full"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
