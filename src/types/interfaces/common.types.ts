export type ID = string;

export type ISODateString = string;

export interface ApiEntity {
    id: ID;
    createdAt: ISODateString;
    updatedAt: ISODateString;
  }