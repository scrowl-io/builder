export type JsonArray = Array<any | JsonResult | JsonArray>;

export type JsonResult = {
  [key: string]: any | JsonResult | JsonArray;
};