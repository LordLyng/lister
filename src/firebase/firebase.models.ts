export interface Entity {
  id: string;
}

export interface Item extends Entity {
  text: string;
}

export interface List extends Entity {
  name: string;
  collectionName: string;
  locked: boolean;
}
