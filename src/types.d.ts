declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

type SetOrderData = (val: object) => void;
