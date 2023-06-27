const domainName = (url: string) => {
  const domain = url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .split("/")[0];

  return domain;
};

export { domainName };
