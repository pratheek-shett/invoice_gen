
export class Client{

  static  #count = 0;
    constructor(name,email,phone,company){
        this.id = ++Client.#count
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.company=company;
        this.avatar= this.getInitials()

        if(!name) throw new Error("name value required")
        if(!email)throw new Error("email is required")
        if(!phone) throw new Error("phone value is required")
        if(!company) throw new Error("company name required")
       
    }


    //gets avatar by sorting out the fullname
    getInitials(){
        return this.name.split(" ").map(word => word[0]).join("").toUpperCase();
    }

    //get all in one object

    getFullDetails(){
        const {
            id,name,email,phone,company,avatar
            //this pulls from  current object using destructuring
        }=this;
        return{
            id,name,email,phone,company,avatar
        };
    }

    //if want to update the phone number then

    updateDetails(phonenumber){
        return{
            ...this.getFullDetails(),
           ...phonenumber
        }

    }
}

const a = new Client("Pratheek Shetty M", "prathee@gmail.com", "893837838", "xytz");
const ar = a.getFullDetails();
console.log(ar)
