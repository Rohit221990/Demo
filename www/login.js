
var SubmitButton = React.createClass({
  render: function() {
    return (
      <div>
        <button type="submit" onClick={this.props.submit}>
          Submit
        </button>
      </div>
    );
  }
});

var Contact = React.createClass({
  getInitialState: function() {
    return {value:""}
  },
  submit: function(e) {
    e.preventDefault()
	  var email = this.refs.form.getDOMNode().email.value
        var password = this.refs.form.getDOMNode().password.value
        if (!email) {return emptyEmail();}
		if(!password){ return emptyPassword();}
		 
		$.ajax({
			url: RESTURL.LogInAPI,
			data : {username : this.state.email, password :this.state.password,applicationid:"e8c8bfed-3864-11e6-8051-00ff9de4742d"},
			dataType: 'JSON',
			type: "POST",
			success: function(data, xhr){
				//setCookie('accessToken',data.object.access_token);
				setCookie('userId',data.object.user_id);
				//setCookie('userKey',data.object.userKey);
				//setCookie('accessKey',data.object.access_key);

				this.setState({quotes: data});
				{this.state.quotes.valid ? go_to_you_page():inValidData(e)}
			}.bind(this),

			error: function (xhr, status, err) {
				this.setState({err: status});
			}.bind(this)	
		});
		function emptyEmail(){
		//document.getElementById('emailScope').removeClass('hide');
			document.getElementById('emailScope').innerText = "Email Id is Required"
		}

		function emptyPassword(){
			document.getElementById('passwordScope').innerText = "Password is Required"
		}
		function go_to_you_page() {  
			window.location = 'http://localhost:50361/Web%20Application/dashboard.html';     
			} 
		function inValidData(e){
			alert(e)
		}		
  },

  handlePasswordChange: function(e) {
  	//document.getElementById('emailScope').removeClass('hide');
    this.setState({
      password: e.target.value
    })

  },
  handleEmailChange: function(e) {
    this.setState({
      email: e.target.value
    })
  },

  render: function() {
    return (
        <form ref="form">
		<div className="form-group">
			<label htmlFor="exampleInputEmail1">Email</label>
			<i className="fa fa-envelope"></i>
          <input type="text" name="email" placeholder="Email" onChange={this.handleEmailChange} tabindex="1"/>
		  </div>
			<div className="form-group"> 
			<label htmlFor="exampleInputPassword1">Password</label>
			<i className="fa fa-lock"></i>
          <input type="password" name="password" placeholder="Password" onChange={this.handlePasswordChange} tabindex="2"/>
		  </div>
		  <div className="form-actions">
          <button type="button" onClick={this.submit} tabindex="3">Login</button>
		  </div>
        </form>		
    );
  }
});

React.render(
  <Contact></Contact>,
  document.getElementById("divLoginForm")
);




