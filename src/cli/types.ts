export type CreateData = {
  name: string;
  pascal: string;
  camel: string;
  kebab: string;
  [key: string]: string;
}

export type UpdateData = {
  manifest: string;
}