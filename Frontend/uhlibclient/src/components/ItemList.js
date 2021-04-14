import React from "react";
import axios from "axios";

export default class ItemList extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            products :[],
        }
    }


    async componentDidMount() {
        let user = localStorage.getItem("user");
        const products = await axios.get('http://localhost:5000/api/items/allitems');
        user = user ? JSON.parse(user) : null;
        this.setState({ user,  products: products.data });
        }

    render() {
       return <p>{this.state.products.map(product => <p>{product.title}</p>)}</p>
    }
}