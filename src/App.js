import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      port: null,
      env: null,
      result: null,
      user: null,
      email: null,
      resultmsg: null,
      found: false
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/portandenv')
    .then(res => res.json())
    .then(data => this.setState({port: data.port, env: data.env}))
    .catch(err=> console.log('error'))
   
  }

  heading() {
    fetch('http://localhost:5000/detail')
    .then(response=> response.json())
    .then(data=> console.log(data))
    .catch(err=> console.log('oops!!'))
  }

  addUser = () => {
    this.setState({result: `${this.state.name} Added!`})
    fetch('http://localhost:5000/add', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email 
      })
    })
  }

  listUser = () => {
    
    fetch('http://localhost:5000/')
    .then(response=> response.json())
    .then(data=> data.map(item => {
      if(item.name === this.state.name) {
        this.setState({result: `${item.name} exist on server`}) 
        return this.setState({found: true})
      } else 
        this.setState({found: false})
      return null;
    }))
    if(this.state.found === false) {
      this.setState({result: 'user not found!!'})
    }
  }

  name = (e) => {
    this.setState({name: e.target.value})
  } 

  email =(e) => {
    this.setState({email: e.target.value})
  }

  render() {  
    return (
      <div className="App"> 
        <h1>Welcome to port {this.state.port} of {this.state.env} environment.</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <div className='options'>
            
            <div className='first'>
              <h2>Add a new User in the server:</h2>
              <input type='text' placeholder='Enter your name' name='name' onChange={this.name}/>
              <br/>
              <input type='text' placeholder='Enter your email' name='email' onChange={this.email}/>
              <br/>
              <input type='submit' onClick= {this.addUser}/>
            </div>

            <div className='second'>
              <h2>Check if a user exist on the server or not?</h2>
              <input type='text' placeholder='Enter your name' name='name' onChange={this.name}/>
              <br/>
              <input type='submit' value='check' onClick= {this.listUser}/>
            </div>
          </div>

          <h2>Results are: </h2>
          <h3>{this.state.result}</h3>
        </div>
    );
  }
}

export default App;
