export class User {
    'id'? : number;
  'username' : string;
  'password' : string;
  'email' : string;
  'role' : string;
  constructor(data?: any){
    Object.assign(this,data);
  }
}
