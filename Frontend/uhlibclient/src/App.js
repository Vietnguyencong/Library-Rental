import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";



import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import ItemList from './components/ItemList';
import Notification from './components/Notification'
import Context from "./Context";

//axios.defaults.baseURL = 'http://localhost';


axios.interceptors.request.use(config =>{
  if(!config.headers.Authorization){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      config.headers.Authorization = 'Bearer ' + user.token;
      console.log('token is', user.token);
    }
  }
  return config;
}, err => {Promise.reject(err)})


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
      notiCount : 0,
      list_noti :[]
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");
    user = user ? JSON.parse(user) : null;
    cart = cart? JSON.parse(cart) : {};
   // this.setState({ user });
   console.log("THIS IS THE USER", user)
    if(user){
      const items = await axios.get('https://uhlib.cc/api/items/allitems');
      this.setState({ user,  items: items.data, cart });
      console.log(items);
    }
    this.getNotification()
  }

  login = async (email, password) => {
    console.log('ep', email, password);
    const res = await axios.post(
      'https://uhlib.cc/api/aut/userlogin',
      // `localhost:3000/api/userlogin`,
      { email, password },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        }}
    ).catch((res) => {
      console.log( 'erro ',JSON.stringify(res));
      return { status: 401, message: 'Unauthorized' }
    })
  
    console.log(JSON.stringify(res));
    if(res.status === 200) {
      const { email,token } = jwt_decode(res.data.access_token)
      axios.defaults.headers.common = {'Authorization' : `Bearer ${token}` }

      console.log('email is ',email);
      const user_id = res.data.user_id;
      const user = {
        email,
        token: res.data.access_token,
        user_id
      }
  
      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  addToCart = cartItem => {
    const {cart} = this.state;
    
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
      cart[cartItem.id].amount = 1;
    }
    console.log('id is',cartItem.id);
    console.log(JSON.stringify(cart[cartItem.id]));

    if (cart[cartItem.id].amount > cart[cartItem.id].stock) {
      cart[cartItem.id].amount = cart[cartItem.id].stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };
  
  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }
  
    const cart = this.state.cart;
    const user_id = JSON.parse(localStorage.getItem('user')).user_id;
    console.log('user', JSON.parse(localStorage.getItem('user')).user_id);
    axios.post('https://uhlib.cc/api/transactions/', {user_id:JSON.parse(localStorage.getItem('user')).user_id}).then(response => {
      const transaction_id = response.data.transaction_id;
      console.log('ts', transaction_id);
      const posts = []
      const products = this.state.items.map(p => {

//        console.log(JSON.stringify(cart));
        if (cart[p.id]) {
          p.stock = p.stock - cart[p.id].amount;
          console.log('item ',cart[p.id], p.id);

          console.log('data ',{ id: transaction_id, quantity: cart[p.id].amount, item_id: p.id });
          posts.push(
          axios.post(
            `https://uhlib.cc/api/loanitem`,
            { transaction_id: transaction_id, quantity: cart[p.id].amount, item_id: p.id },
          ).then(response =>{
            console.log("response ", response.status);
          })
          );
        }
        return p;
      });
      Promise.all(posts).then(()=>{ 
        console.log('success')
        axios.put(
          `https://uhlib.cc/api/transactions/${transaction_id}`,
          { "is_commit" : 1,
            "user_id": user_id },
        ).then(response =>{
          console.log("response ", response.status);
        })
      });
      // axios.all(posts).then(axios.spread(...response)) =>{

      // });
    this.setState({ products });
    })


  
    this.clearCart();
  };

  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };
  
  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  getNotification = async () =>{
    // fetch notification for users 
    const url = `https://uhlib.cc/api/notifications/user/${this.state.user.user_id}`
    const notis = await axios(url)
    this.setState({notiCount:notis.data.length, list_noti:notis.data })
  }
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          clearCart: this.clearCart,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
        <div className="App">

          
          
          
          
          
          {/* <nav
            className="navbar navbar-default"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <b className="navbar-item is-size-4 ">ecommerce</b>
              <label
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ showMenu: !this.state.showMenu });
                }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </label>
            </div>
              <div className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}>
                <Link to="/products" className="navbar-item">
                  Products
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/add-product" className="navbar-item">
                    Add Product
                  </Link>
                )}
                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    { Object.keys(this.state.cart).length }
                  </span>
                </Link>
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <Link to="/" onClick={this.logout} className="navbar-item">
                    Logout
                  </Link>
                )}
              </div>
            </nav> */}
            
            

  
  <Navbar variant="dark" style={{backgroundColor: "#c8102e"}}  >
    <Navbar.Brand href="/home"><img
    src="https://apps.lib.uh.edu/uh-elements/secondary-logo.svg"
    alt="logo"
    width="250" /></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/home" className={{margin:"14px"}}>Home</Nav.Link>
     
      <Nav.Link href="/cart">Cart { Object.keys(this.state.cart).length }</Nav.Link>
      <Nav.Link href="/items">Items</Nav.Link>
      <Nav.Link href="/notifcations">
      <div class="ui label">
        <i class="mail icon"></i> {this.state.notiCount}
      </div>
      </Nav.Link>
      {this.state.user ? <Nav.Link><div onClick={this.logout}>Logout</div></Nav.Link> :  <Nav.Link href="/login">Login</Nav.Link>} 
      
     
      
      {/* <Link to="/" onClick={this.logout} className="navbar-item">
                    Logout
                  </Link>       */}

    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>

            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/items" component={ItemList} />
              <Route exact path="/notifcations" component={Notification} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}