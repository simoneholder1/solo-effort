import React, { Component } from 'react';
import axios from 'axios';

// using html input types below.
class Admin extends Component {
    constructor (){
        super();

        this.initialState={
           
                name: "",
                price: "",
                color:"",
                details: "",
            
        }

        this.state=this.initialState
    }

// Since we want to update all of these different elements for the incoming object we can create 1 method that will allow us to do this for each input box, but you have to make it generic to accommodate the different descriptors.  We will do this by creating a variable, newObj, that takes in an empty object.  The variable gives the user somewhere to temporarily store their information. We can access this empty object (newObj) and we can pass the value we receive from the user onto the property we receive the user newObj[props]= value
handleChange(value,propThatNeedsToChange){
    var newObj = {}
    newObj[propThatNeedsToChange]= value
    this.setState(newObj)
}

addProduct(){
    var newObj={
        name: this.state.name,
        price : this.state.price,
        color: this.state.color,
        details: this.state.details,
    }
    axios.post('api/products',newObj).then(()=>{
        console.log('successful');
        this.setState(this.initialState)
        this.props.getProducts()

    })
}


    render() {
        console.log(this.state)
        return (
            <div>
                <br/>
                <input value={this.state.name} placeholder="name of product" onChange={(e)=>{this.handleChange(e.target.value,'name')}}/>
                <br/>
                <input value={this.state.price}type="number" placeholder="price" onChange={(e)=>{this.handleChange(e.target.value,'price')}}/>
                <br/>
                <input value={this.state.details} placeholder="description" onChange={(e)=>{this.handleChange(e.target.value,'details')}}/>
                <br/>
                <input value={this.state.color} type="number" min="1" max="8" placeholder="color id" onChange={(e)=>{this.handleChange(e.target.value,'color')}}/>
                <button onClick={()=>{this.addProduct()}}>Add Product</button>
            </div>
        );
    }
}

export default Admin;