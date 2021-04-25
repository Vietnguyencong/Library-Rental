import React from "react";
import axios from "axios";
import Item from "./Item";
import withContext from "../withContext";

class ItemList extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            products :[],
        }
    }


//    const products = await axios.get('https://uhlib.cc/api/items/allitems');
    async componentDidMount() {
        let user = localStorage.getItem("user");
        const products = await axios.get('https://uhlib.cc/api/currentstocks/getall');
        user = user ? JSON.parse(user) : null;
        this.setState({ user,  products: products.data });
        }

    render() {
        const {products} = this.state;
        const filtered_products = this.props.context.items
        // console.log('props are ',JSON.stringify(this.props));
    //    return <p>{this.state.products.map(product => <p>{product.title}</p>)}</p>
    return (
        <>
          <div className="hero is-primary">
            <div className="hero-body container">
              <h4 className="title">Library Catalog</h4>
            </div>
          </div>
          <br />
          <div className="container">
            <div className="column columns is-multiline">
              { filtered_products && filtered_products.length ? (
                filtered_products.map((product, index) => (
                  <Item
                    item={product}
                    key={index}
                    addToCart1={this.props.context.addToCart}
                  />
                ))
              ) : (
                <div className="column">
                  <span className="title has-text-grey-light">
                    No products found!
                  </span>
                </div>
              )}
            </div> 
          </div>
        </>
      );
}
}

export default withContext(ItemList);