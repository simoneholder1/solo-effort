import React, { Component } from 'react';
import axios from 'axios';

class ProductDetails extends Component {
    constructor(){
        super ()
    
        this.state={
            productDetails: {},

        }
    
    }

    //.then is the response from the server. this.props.match.params. comes from react router dom, which is stored in App.js inside the Route Component.
    componentWillMount(){
        axios.get(`api/products/${this.props.match.params.id}`).then((responseFromOurServer)=>{
            this.setState({

                // you want to reset the state with whatever comes back from the server
                productDetails: responseFromOurServer.data
            })
        })

    }


    render() {
        console.log(this)
        return (
            // display what you want to see from this component below. This infor is generated from the server.
            <div>
            
                <h1>{this.state.productDetails.color}</h1>
                <h3>{this.state.productDetails.price}</h3>
                <p>{this.state.productDetails.details}</p>
            </div>
        );
    }
}

export default ProductDetails;