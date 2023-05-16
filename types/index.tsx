export interface NavLink {
  slug: string;
  name: string;
}

export type Variant = {
  id: string;
  name: string;
  values: string[];
};

export type Image = {
  bucket: string;
  file: string;
};

export type VariantImage = {
  image: Image;
  variants?: VariantImageOption[];
};

export type VariantImageOption = {
  name: string;
  value: string;
};
