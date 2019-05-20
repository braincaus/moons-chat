import { Component } from 'react';
import openSocket from 'socket.io-client';

const  socket = openSocket('http://localhost:8000');

const subscribeToMessage = () => {
  socket.on('chat message', function(msg){
    console.log(msg);
    // $('#messages').append($('<li>').text(msg));
  });
};

const sendNewMessage = () => {
  socket.emit('chat message', "Demo Message");
};
  
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }


  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.message);
    sendNewMessage();
    this.setState({message: ''}); 
  }

  render () {
    return (
      <div>
        <ul id="messages"></ul>
        <form onSubmit={this.handleSubmit}>
          <input id="m" value={this.state.message} onChange={this.handleChange} />
          <button>Send</button>
        </form>
        <style jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font: 13px Helvetica, Arial; }
        form { background: #000; padding: 3px; position: fixed; left: 0; bottom: 0; width: 100%; }
        form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
        form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
        #messages { list-style-type: none; margin: 0; padding: 0; }
        #messages li { padding: 5px 10px; }
        #messages li:nth-child(odd) { background: #eee; }
        `}</style>
      </div>
    )
  }
}
  
export default Chat