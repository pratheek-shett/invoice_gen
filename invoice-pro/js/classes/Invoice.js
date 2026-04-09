
import { Item } from "./Item.js";

export class Invoice{

    static #count = 0;
    
    
    constructor(client,items=[],tax =18,discount = 0){
        this.client = client;
        this.items = items;
        this.tax = tax;
        this.id = ++Invoice.#count;
        this.invoiceNumber = `INV-00${this.id}`;
        this.discount = discount;
        this.status = "Pending";
        this.date = new Date().toLocaleDateString('en-IN');
        this.duedate = new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN');
        this.notes = ""
    }

    addItems(description,quantity,unitPrice){
        const item = new Item(description,quantity,unitPrice);
        this.items = [...this.items, item];
    }

    removeItems(id){
        this.items = this.items.filter((_,i) => i!==id);
    }
    getsubtotal(){
        this.items= this.items.reduce(0)
    }


}