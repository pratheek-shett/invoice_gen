
import { Item } from "./Item.js";
import {Client} from "./Client.js"

export class Invoice{

    static Status = Object.freeze({
        Pending : "pending",
        Paid: "paid",
        Overdue: "overdue",

     })

    static #count = 0;
    
    
    constructor(client,items=[],tax =18,discount = 0){
        this.client = client;
        this.items = items;
        this.tax = tax;
        this.id = ++Invoice.#count;
        this.invoiceNumber = `INV-00${this.id}`;
        this.discount = discount;
       this.status = Invoice.Status.Pending;
        this.date = new Date().toLocaleDateString('en-IN');
        this.duedate = new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN');
        this.notes = ""
    }

    addItems(description,quantity,unitPrice){
        const item = new Item(description,quantity,unitPrice);
        this.items = [...this.items, item];
    }

    removeItem(id){
        this.items = this.items.filter((_,i) => i!==id);
    }
    getSubTotal(){
        return this.items.reduce(
            (sum, item) => sum + item.getTotal()
, 0);
    }

    getTotal(){
        return this.getSubTotal() - this.getDiscountAmount() +this.getTaxAmount()
    }

    markAsPaid(){
        this.status =  Invoice.Status.Paid;
    }

    markAsOverdue(){
        this.status=  Invoice.Status.Overdue;
    }

    getDiscountAmount(){
       return (this.getSubTotal() * this.discount /100)
    }
    getTaxAmount(){
       return (
        (this.getSubTotal() - this.getDiscountAmount())
        * this.tax / 100
    );
    }
    getSummary(){
        return {
            ...this,
            total:this.getTotal()
        }
        
    }

}
// Add this at bottom of your file
// to test everything works

// Step 1 - Create Client
const client = new Client(
    "Rahul Kumar",
    "rahul@gmail.com",
    "9876543210",
    "TCS"
);

// Step 2 - Create Invoice
const inv = new Invoice(client, [], 18, 10);

// Step 3 - Add Items
inv.addItems("Angular Training", 2, 15000);
inv.addItems("Java Training", 1, 20000);

// Step 4 - Test all methods
console.log("ID:", inv.id);
console.log("Invoice No:", inv.invoiceNumber);
console.log("Status:", inv.status);
console.log("Subtotal:", inv.getSubTotal());
console.log("Discount:", inv.getDiscountAmount());
console.log("Tax:", inv.getTaxAmount());
console.log("Total:", inv.getTotal());

// Step 5 - Test mark as paid
inv.markAsPaid();
console.log("Status after paid:", inv.status);

// Step 6 - Test summary
console.log("Summary:", inv.getSummary());

// Step 7 - Test remove item
inv.removeItem(0);
console.log("Items after remove:", inv.items);
