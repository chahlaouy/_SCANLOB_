
export class User{
    constructor(
        private id: number,
        private uuid: string,
        private username: string,
        private email: string,
        private age: number,
        private gender: string,
        private phone: string,
        private emailVerifiedAt: string,
        private createdAt: string,
        private updatedAt: string,
        private userRole: string,
        private isActivated: boolean,
        private userImg: string,
        private zip: number,
        private city: string,
        private country: string,
    ){}

    get userId(){
      return this.id;
    }
    get name(){
      return this.username;
    }
    get userEmail(){
      return this.email;
    }
    get userZip(){
      return this.zip;
    }
    get userPhone(){
      return this.phone;
    }
    get userCountry(){
      return this.country;
    }
    get userCity(){
      return this.city;
    }
}
