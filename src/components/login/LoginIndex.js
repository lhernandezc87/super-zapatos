import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

class LoginIndex extends React.Component {

	state = {
		fields: {
 		  user: '',
 		  password: ''
		}
	};


 render(){
 	return (
 		<div className="loginContainer">
 		  <div className="loginTitle">
 		    Login
 		  </div>
 		  <div className="loginUser">
 		    
 		    <input
 		      type="text"
 		      placeholder="User name"
 		      name="user"
 		      value={this.state.fields.name}
 		      onChange={this.onChangeText}
 		    />
 		  </div>

 		  <div className="loginPassword">
 		    
 		    <input
 		      type="text"
 		      placeholder="Password"
 		      name="password"
 		      value={this.state.fields.password}
 		      onChange={this.onChangeText}
 		    />
 		  </div>
 		  <div className="loginButtons">
 		    <div className="loginButton">
	 		  	<input
	 		  	  type="button"
	 		  	  value="Login"
	 		  	  onClick={this.handleLogin}
	 		  	/>
	 		</div>
	 		<div className="loginClearButton">  	
	 		  	<input
	 		  	  type="button"
	 		  	  value="clear"
	 		  	  onClick={this.handleLoginClear}
	 		  	/>
 		  	 </div>
 		  </div>

 		</div>
 	);
 } 

}

export default LoginIndex
