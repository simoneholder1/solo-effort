import React, { Component } from 'react';

class Cart extends Component {
    render() {

            var displayCartContent = this.props.cartContent.map((products,i)=>{
                return(
                    <div>
                        <h1>{products.name}</h1>
                        <p>{products.color}</p>
                        <p>${products.price}</p>
                        <button onClick= {(()=>this.props.removeProductFromCart(i))}>Remove It: I Changed My Mind</button>
                    </div>
                )

            })
           

    return(        
            <div> <h1>All of my Beautiful Goodies</h1>
                {displayCartContent} 
            </div>
        );
    }
}

export default Cart;