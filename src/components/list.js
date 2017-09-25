import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class List extends Component {
    
    
    
    render() {
        const displayProducts = this.props.displayProducts.map((products,index)=>{
            return (
                <div>
                    <Link to={`/productdetails/${products.id}`}><h1>{products.name}</h1></Link>
                    <p>{products.color}</p>
                    <p>${products.price}</p>
                    <button onClick={(()=> {this.props.moveToCart(products)})}>Gotta Have It!</button>
                </div>
            )
        })
        return (
            <div>
                {displayProducts}
            </div>
        );
    }
}

export default List;