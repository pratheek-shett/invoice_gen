export class Item{
    constructor(description,quantity,unitPrice){

        if(!description){
            throw new Error("Description required")
        }

        if(quantity <=0){
            throw new Error("Quantity must be positive ")
        }
        if(unitPrice<=0){
            throw new Error("Unit price must be ")
        }

        this.description = description;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    getTotal(){
       return  this.quantity * this.unitPrice;
    }

    getFormattedTotal(){
       return this.getTotal().toLocaleString("en-IN",{
        style : "currency",
        currency : "INR"
       })
    }

    getSummary(){
        return {
            description : this.description,
            quantity:this.quantity,
            unitPrice:this.unitPrice,
            total:this.getTotal(),
            formattedTotal:this.getFormattedTotal()
        }
    }
}


const a = new Item(
    "This is a android Tablet",
    12,
    12000
)
const t = a.getTotal();
const b = a.getFormattedTotal();
console.log(a.getSummary())
console.log(t)
console.log(b)
