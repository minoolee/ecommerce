// ecommerce

class User {
  constructor(public name: string, public email: string, public ps: string | number, public bank: Bank) {
  }
}

class Product {
  constructor(public id: number, public name: string,public price: number){}
}

class Bank {
  constructor(public name: string, public iban: string, public ps: number, public balance: number){}
}

class Cafe {
constructor(readonly name:string,public users:User[],public products: Product[],public shoppingCart: Product[]){
}

addProduct (product : Product)  {
  this.products.push(product)
}
removeProductById (id:number){
  this.products = this.products.filter((p)=> p.id !== id);   // filter method is used to remove the product by
}
displayHomePage(){
  console.log(` Welcome to ${this.name} \nOur Menu:`)
  this.products.forEach((p)=> {
   console.log(`Name of the product is ${p.name} Price: ${p.price} $`);
})
}
register (user: User){
  this.users.push(user)
  console.log(`Registered user: ${user.name}`);
  
  }
  login(email:string, ps: string | number){
  const aktivUser = this.users.find((user)=> user.email === email && user.ps === ps )
    if (aktivUser){
      console.log('you are logged in')
      return aktivUser
      } else {
        console.error("wrong login or password")
        return null
    }
    }
addToShoppingCart(productName: string){
const wishProduct = this.products.find((product)=> product.name === productName )
if(wishProduct ){
   this.shoppingCart.push(wishProduct) 
   console.log(`${productName} added to your shopping cart.`)
  }else {
    console.log('Product not found');
  }
}
removeFromShoppingCart(productName: string){
  this.shoppingCart = this.shoppingCart.filter((p) => p.name !== productName)
  console.log(`${productName} removed from your shopping cart.`);
}
calculateTotal(){
  let totalPrice: number =0 ;
 this.shoppingCart.forEach((item)=> {
  totalPrice += item.price;
 })
 console.log(`Total Price: ${totalPrice} $`);
 return totalPrice
}
payTheBill(ibanCode: string, ps: number, totalPrice:number){
  const user = this.users.find((u) => u.bank.iban == ibanCode && u.bank.ps == ps) 
  if(user){
    if(user.bank.balance >= totalPrice) {
      user.bank.balance -= totalPrice;
      console.log(`${this.name}, your bill has been paid successfully!`);
    }else {
      console.log("You don't have enough money for paying!");
    }
  }else {
    console.log ("Wrong bank details!")
  }
  }
}


//updateBalanceByIBNAndPs ({IBN ,ps}:Bank):void{}
// Products
const praga = new Product(1, "Praga", 77)
const chocolade = new Product(2, "Caffe", 55)
const pie = new Product(3, "Apple", 33)
// bank account
const sparkasse = new Bank("Hamzah", "DE43 8879 9000", 1234, 5000)
// user
const hamzah = new User("Hamzah", "hamzah@gmail.com", "ella", sparkasse )
const minoo = new Cafe("Minoo", [], [pie, chocolade], [])
minoo.addProduct(praga)
minoo.displayHomePage()
/* const log = minoo.login("hamzah@gmail.com", "ella")
console.log(log) */
minoo.register(hamzah)
minoo.login("hamzah@gmail.com", "ella")
minoo.addToShoppingCart("Apple")
minoo.addToShoppingCart("Praga")
console.log(minoo.shoppingCart);

const bill = minoo.payTheBill('DE43 8879 9000', 1234 ,minoo.calculateTotal())



