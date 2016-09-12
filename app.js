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
    var SomeActions = Reflux.createActions([
      'updateChat',
      'deleteChat'
    ]);

    var Store = Reflux.createStore({
      listenables : [SomeActions],
      init(){
        this.chat = '';
        this.data = '';
      },
      getInitialState(){
        return {chatMessage : this.chat}
      },
      onUpdateChat: function(newChat){
        this.chat = newChat;
        this.trigger({
          chat : this.chat
        });
      },
      onDeleteChat: function(){
        
      }
    });

    var Chat = React.createClass({
    mixins: [
        Reflux.listenTo(SomeActions.updateChat)
        ], 
    componentDidMount () {
      SomeActions.updateChat(this.props.chat);
    },
    mixins: [Reflux.connect(Store,'chatMessage','deleteMsg')],
    addValueInMessageBox: function(){
      var list = document.getElementById("chatBox");
    },

    clickChat: function(e){
      e.preventDefault();
      var list = document.getElementById("wrapper");
      $(list).animate({ scrollTop: $('#wrapper').height() }, 100);      
      $(list).append(this.state.chatMessage.chat + "<br>")
      $('#usermsg').val("")
      this.state.chatMessage.chat = '';
    },


    changeMessage: function(e){
      e.preventDefault();      
      SomeActions.updateChat(e.target.value);
    },

    deleteMsg: function(e){
      e.preventDefault();
        var list = document.getElementById("wrapper");
        $(list).remove();
    },
    render: function() {
      $('#valueOFList').removeClass('show').addClass('hide');
      return (
          <div id="wrapper">
            <form name="message">
                <input name="usermsg" type="text" id="usermsg" size="63" value={this.state.value} onChange={this.changeMessage}  />
                <input name="submitmsg" type="submit"  id="submitmsg" onClick={this.clickChat} value="Send" />
                <button type="button" onClick={this.deleteMsg} >DeleteAll</button>
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
    
    ReactDOM.render(
    <Router>
      <Route path="/" component={App}>
      <IndexRoute component={Todo} />
      <Route path="chat" component={Chat} />
      </Route>
    </Router>,
      destination
    );