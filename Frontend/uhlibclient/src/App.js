import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav} from "react-bootstrap";



import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import ItemList from './components/ItemList';
import Notification from './components/Notification'
import Context from "./Context";
import Searchbar from './components/Search/Searchbar'
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
    this.submitSearchForm("")
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
      this.submitSearchForm("")
      return true;
    } else {
      return false;
    }
  }

  addToCart = cartItem => {
    const {cart} = this.state;
    console.log("this is cartitem", cartItem)
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
        if (cart[p.item_id]) {
          p.stock = p.stock - cart[p.item_id].amount;
          console.log('item ',cart[p.item_id], p.item_id);

          console.log('data ',{ id: transaction_id, quantity: cart[p.item_id].amount, item_id: p.item_id });
          posts.push(
          axios.post(
            `https://uhlib.cc/api/loanitem`,
            { transaction_id: transaction_id, quantity: cart[p.item_id].amount, item_id: p.item_id },
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
          { "is_commit" : true,
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
    if(this.state.user){
    // fetch notification for users 
    const url = `https://uhlib.cc/api/notifications/user/${this.state.user.user_id}`
    const notis = await axios(url)
    this.setState({notiCount:notis.data.length, list_noti:notis.data })}
  }
  submitSearchForm = async (term) => {
    const url = `https://uhlib.cc/api/items/getall?filter={"title":"${term}"}`
    const filtered_items = await axios.get(url)
    // return filtered_items.data
    console.log("THIS IS THE DATA:", filtered_items.data)
    this.setState({items: filtered_items.data})
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

  <Navbar variant="dark" style={{backgroundColor: "#c8102e"}}  >
    <Navbar.Brand href="/home" style={{margin:"5px"}}><img
    src="https://apps.lib.uh.edu/uh-elements/secondary-logo.svg"
    alt="logo"
    width="250" /></Navbar.Brand>
    <Nav className="mr-auto" style={{marginTop: "10px"}}>

      <Nav.Link href="/home">Home</Nav.Link>
     
      <Nav.Link href="/cart">Cart { Object.keys(this.state.cart).length }</Nav.Link>
      <Nav.Link href="/items">Items</Nav.Link>
      <Nav.Link href="/notifcations">
      <div class="ui label">
        <i class="mail icon"></i> {this.state.notiCount}
      </div>
      </Nav.Link>
      {this.state.user ? <Nav.Link><div onClick={this.logout}>Logout</div></Nav.Link> :  <Nav.Link href="/login">Login</Nav.Link>} 
     
    </Nav>
    <Searchbar submitSearchForm={this.submitSearchForm}/>
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