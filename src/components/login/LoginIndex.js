import React from 'react';

class LoginIndex extends React.Component {

	state = {
		fields: {
 		  user: '',
 		  password: '',
		}
	};


  handleLoginClear = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("password");
    this.setState({fields: {user: '', password: ''}});

  }

  handleLogin = () => {
    this.checkUserData();
  } 

  onChangeText = (evt) => {
  	const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({fields: fields});
  }

  checkUserData = () => {
    const {history} = this.props
    return fetch(users_url, {method: "GET"})
            .then((resp) => resp.json())
            .then((data) => {
            	data.map((user) => {
            		if (this.checkUser(user)) {
            			return history.push('/stores');
            		}
            	})
            })
         .catch(function(error) {
          return false;     
         });
  }

  checkUser(user){
	if (user.user === this.state.fields.user && user.password === this.state.fields.password) {
		localStorage.setItem("user", this.state.fields.user);
        localStorage.setItem("password", this.state.fields.password);
        return true;
	}
	return false;
  }

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
 		      value={this.state.fields.user}
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

const users_url = 'http://localhost:4000/users'

export default LoginIndex
