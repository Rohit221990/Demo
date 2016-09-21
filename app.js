'use strict';


 var { Router,
          Route,
          IndexRoute,
          IndexLink,
          Link } = ReactRouter;

    var destination = document.querySelector("#container");
    var Todo = React.createClass({
      add: function(){
        var list = document.getElementById("valueOFList");
        $(list).append("<li>"+this.state.Input+"</li>")
        $('#textValue').val("")
      },
      onChange: function(e){
        this.setState({Input : e.target.value})
      },
      render: function(){
        $('#valueOFList').removeClass('hide').addClass('show');
        return (
          <div>     
            <input type="text" id="textValue" onChange={this.onChange}/>
            <input type="button" value="Add" onClick={this.add} />
          </div>
        );    
      }
    }); 

    var Chat = React.createClass({ 

    mixins: [
        Reflux.listenTo(SomeActions.updateChat)
        ], 
    componentDidMount () {
      SomeActions.updateChat(this.props.chat);
    },
    mixins: [Reflux.connect(Store,'chatMessage')],
    addValueInMessageBox: function(){
      var list = document.getElementById("chatBox");
    },

    changeMessage: function(e){
      e.preventDefault();  
      var list = document.getElementById("hello"); 
      this.setState({data : this.state.Input})   
      $('<div class="bubble-human"/>').html(this.state.Input).appendTo(list);     
      //rows.push(this.state.Input);
      SomeActions.updateChat(this.state.Input);


    },

    deleteMsg: function(e){
      e.preventDefault();
        var list = document.getElementById("wrapper");
        $(list).remove();
    },
    
    /*
    conductConversationOnKeyUp: function(e){
      if(e.keyCode === 13) {
         var text = this.state.value;
         SomeActions.conductConversation(text);
       }
    },*/

    conductConversation: function(){  
      var text = this.state.value;
      SomeActions.conductConversation(text);
    },

    handleChange : function(e){
      this.setState({Input: e.target.value});
    },

    render: function() {
      var rows = [];
      $('#valueOFList').removeClass('show').addClass('hide');
      return (
          <div id="wrapper">
            <form name="message">
              <div className="container">
                <div className="col-lg-6 col-md-6 col-xs-12 padding-top-chat">
                  <div className="conversation-flow-container clearfix ">
                      <div className="col-lg-12 col-md-12 col-xs-12">
                        <div id="hello" className="conversation-well conversation-container clearfix chat-height">
                         
                        </div>
                        <div id="chatData">
                        </div>
                      </div>
                      <div className="col-lg-10 col-md-10 col-xs-8 no-padding-right">
                          <input 
                            id="input-box"
                            type="text" 
                            placeholder="Type a response" 
                            className="user-input form-control" 
                            value={this.state.value}
                            onChange={this.handleChange}
                            onKeyUp={this.conductConversationOnKeyUp}
                           />
                      </div>
                      <div className="col-lg-2 col-md-2 col-xs-4 text-right no-padding-left">
                        <button id="send-btn" className="input-btn btn btn-block" onClick={this.changeMessage}>Send</button>
                      </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="col-lg-12 col-md-12 col-xs-12">
                      <div className="information-container"></div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-xs-12">
                      <div className="profile-container"></div>
                  </div>
                </div>
            </div>
            </form>
          </div>
          );
        }
    });


    var App = React.createClass({
    render: function() {
      return (
        <div>
          <h1>React Demo</h1>
          <ul className="header">
            <li><Link to="/">Todo</Link></li>
            <li><Link to="/chat">Chat</Link></li>
          </ul>
          <div className="content">
            {this.props.children}
          </div>
      </div>
    )
  }
});


/*var dataChar = React.createClass({
  render : function(){
  var rows = [];
  rows.push(this.state.data);
    return(
      <div class="bubble-human">
        {rows}
      </div>
    )
  }
});*/
    
    ReactDOM.render(
    <Router>
      <Route path="/" component={App}>
      <IndexRoute component={Todo} />
      <Route path="chat" component={Chat} />
      </Route>
    </Router>,
      destination
    );