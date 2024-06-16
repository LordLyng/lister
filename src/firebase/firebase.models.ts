export interface Entity {
  id: string;
}

export interface Item extends Entity {
  text: string;
  checked: boolean;
}

export interface List extends Entity {
  name: string;
  collectionName: string;
  locked: boolean;
  deleteOnChecked: boolean;
}
