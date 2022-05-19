export interface Pokemon {
  id:         number;
  name:       string;
  image:      null;
  type?:       string;
  hp?:         number;
  attack:     number;
  defense:    number;
  idAuthor:   number;
  created_at?: Date;
  updated_at?: Date;
}
