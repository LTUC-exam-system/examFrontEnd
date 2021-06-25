import React from 'react';
import base64 from 'base-64';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import axios from 'axios';
const API = 'https://quiz-ltuc.herokuapp.com';


export const AuthContext = React.createContext();


class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      signedUp: false,
      numSinedUp:0,
      setNumSigned: this.setNumSigned,
      login: this.login,
      // signUp: this.signUp,
      logout: this.logout,
      user: {},
      isValidAction: this.isValidAction,
      permissions: []
    };
  }
  setNumSigned =(numSinedUp)=>{
    this.setState({numSinedUp});
  }
  login = async (userEmail, password) => {
    const encodedData = base64.encode(`${userEmail}:${password}`);
    const result = await axios({
      method: 'post',
      url:`${API}/signin`,
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        'Authorization': `Basic ${encodedData}`,
      },
    });
    
    cookie.save('per',result.data.permissions);
    this.validateToken(result.data.token);
    this.setState({ permissions: cookie.load('per')});

  };
  // signUp = async (object) => {
  //   const result = await axios(`${API}/adduser`, {
  //     method: 'post',
  //     data: {
  //       username: object.userName,
  //       role_name: object.role,
  //       password: object.password,
  //       email: object.email,
  //       name: object.name,
  //       is_accepted: false,
  //     },
  //   });
  //   if (result.data.length > 0) {
  //     this.setState({ signedUp: true });
  //   }
  // };

  validateToken = (token) => {
    let user = jwt.decode(token);
    console.log(user) 
    if (user) {
      this.setAuthState(true, token, user);
    }
  };

  setAuthState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    this.setState({ loggedIn, user });
  };

  logout = () => {
    this.setAuthState(false, null, {});
  };

  isValidAction = (action) => {
    let permissions=cookie.load('per');
    console.log('this.state.user.permissions>>>>>>',this.state.permissions)
    return permissions.includes(action);
  };

  componentDidMount = () => {
    const userCookie = cookie.load('auth');
    this.validateToken(userCookie);
  };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;