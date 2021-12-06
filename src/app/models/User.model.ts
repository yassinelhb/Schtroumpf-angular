export class User {
  constructor(
    public _id: string,
    public age: string,
    public nourriture: string,
    public famille: string,
    public race: string,
    public username: string,
    public friends?: [],
    public createdAt?: string
  ) {}
}
