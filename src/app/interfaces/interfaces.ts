
  export  class  UserObject {

    user_id: number;
    username : string;
    token : string;
    first_name: string;
    last_name: string;
    email: string;    
    password: string;  
    phonenumber : string;
    msg : string;
    status : any;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}