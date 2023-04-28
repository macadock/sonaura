export interface NavLink {
  slug: string;
  name: string;
}

export type Variant = {
  id: string;
  name: string;
  values: string[];
};

export type VariantImage = {
  variants: VariantReference[];
  image: Image;
};

export type VariantReference = {
  id: string;
  option: string;
};

type Image = {
  bucket: string;
  file: string;
};
