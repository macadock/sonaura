export enum Categories {
  TV = 'Téléviseurs',
  HIFI = 'Enceintes HiFi',
  PORTABLE_SPEAKER = 'Enceintes Portables',
  HEADPHONE = 'Casques et Ecouteurs',
  OCCASION = 'Occasion',
}

export interface NavLink {
  slug: string;
  name: string;
}
