declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.svg" {
  const content: Icon;
  export const ReactComponent;
  export default content;
}

declare module "*.png" {
  const content: Icon;
  export const ReactComponent;
  export default content;
}
