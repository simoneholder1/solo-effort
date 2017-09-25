import React, { Component } from 'react';
import './App.css';
import List from '../src/components/list';
import Cart from '../src/components/cart';
import Details from '../src/components/details';
import {HashRouter, Route, Link, Switch} from 'react-router-dom';
import axios from 'axios';
import Admin from '../src/components/admin';

class App extends Component {
  constructor (){
    super()

this.state={
  products:[],
  cart: []

}  

//re-explain the purpose of the bind? bind is hooking this up specifically to App. 
this.moveToCart=this.moveToCart.bind(this);
this.removeFromCart=this.removeFromCart.bind(this);
this.getProducts=this.getProducts.bind(this);
}


// can you explain what we need to create a new cart? this allows you to create a new cart so the child doesn't reference the old cart (which react will have an issue with)
// Lines 25-26 could be consolidated in the this.setState object as cart: [...this.state.cart,product]. The ... essentially creates a copy 
moveToCart(product){
  var newCart= this.state.cart.slice()
  newCart.push(product)
  this.setState({
    cart: newCart,
  })
}

removeFromCart(i){
  var updateCart= this.state.cart.slice()
// wherever the index is we want to cut 1 from the cart.
  updateCart.splice(i,1)
  this.setState({
    cart: updateCart
  })
}

  // typically this is where you'd make a request to the server in hopes to get the products on the screen before the entire site is loaded. As a place holder we will enter in an array of objects that would typically be sent from the server.

  // note that the html request has a proxy which allows both the server to run and your front end.
getProducts(){
axios.get('/api/products').then((res)=>{res.data
  this.setState({
    products: res.data
})
})
}
componentDidMount(){
  this.getProducts()
}


// below you need to create props to pass down to your child components so that they can receive the data AND/OR use the parent's functions.
//this.moveToCart is a function tath 
// the route for product details uses a : id to serve as a place holder for the parameter. component is used because no props on Apps need to be passed down to the child. 

  render() {
    return (
      <div className="Main.Container"> 
        <Link to='/'>
        <h1>Products</h1>
        </Link>

        <Link to= '/cart' ><h1>Cart({this.state.cart.length})</h1></Link>

        <Link to= '/admin'>
        <h1>Admin</h1>
          </Link>
        
          <Route exact path='/' render={()=>{
            return <List displayProducts= {this.state.products} 
                  moveToCart= {this.moveToCart}/>
                  }}/>
          <Route path='/cart' render={()=> {
            return <Cart cartContent= {this.state.cart} 
            removeProductFromCart={this.removeFromCart}
            />}}/>
          <Route path = '/productdetails/:id' component = {Details}/> 
          
          <Route path = '/admin' render={()=>{ return <Admin get Products={this.getProducts}/>}}/>
      </div>
    );
  }
}

export default App;
