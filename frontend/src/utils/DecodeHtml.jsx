const decodeHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || doc.body.innerText;
  };
  
 export const DisplayContent = ({ content }) => {
    return <div>{decodeHtml(content)}</div>;
  };