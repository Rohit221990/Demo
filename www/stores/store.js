
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
        $.ajax({
          url: 'https://gateway.watsonplatform.net/natural-language-classifier/api/v1/classifiers/33ffe6x85-nlc-6380/classify?text=' + newChat ,
          //data : {Username : '584b5a4b-93f2-4a5c-a27c-bb6ee81b910d', password :'hup2kYmeWCzU'},
          dataType: 'JSON',
          text : newChat,
          type: "GET",
          beforeSend: function (request)
            {
                request.setRequestHeader("Authorization", 'Basic ZTNjYTQwZDYtMzhjOC00NmI0LTkyY2QtYjdjNDdhYzE1OTVlOnVZZDAzWkNIbUNhNw==');
            },
          success: function(data, xhr){
            this.chat = data;
            console.log(this.chat);

            $.ajax({
              url: 'https://watson-api-explorer.mybluemix.net/dialog/api/v1/dialogs/e8ee309a-ee91-444b-b601-6e7d812e4185/conversation',
              //data : {Username : '584b5a4b-93f2-4a5c-a27c-bb6ee81b910d', password :'hup2kYmeWCzU'},
              dataType: 'JSON',
              input : this.chat.text,
              type: "POST",
              //client_Id: localStorage.getItem('client_Id'),
              //conversation_id: localStorage.getItem('conversation_id'),             
              beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", 'Basic NGZiNGYzYWItNmUyMy00ZTk3LWI4ZGEtNDVkMmM1ZDI3MmUwOnlpUDBTdjRzYWlzTw==');
                },
              success: function(data, xhr){
                /*this.setState({client_Id: data.client_id});
                localstorage.setItem(client_Id, data.client_id);
                localstorage.setItem(conversation_id, conversation_id);*/

                console.log(data); 
                var list = document.getElementById("chatData"); 
                $('<div class="userData"/>').html(data.response).appendTo(list);        
              }.bind(this)
            });

          }.bind(this)
        });
      },
      onDeleteChat: function(){ 
        
      },          
      componentDidMount : function() {

      }
    });