import React from 'react';
import { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { createBrowserHistory } from 'history';

const store = ConfigureStore();
const history = createBrowserHistory();  // use to track the user url to identify the table

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableID: ""
    }
  }
  retriveInfoFromURL = () => {
    // console.log("(Appjs)history: ", history.location.pathname)
    var pathArray = String(history.location.pathname).substring(1).split("/");
    // console.log(pathArray[0]);
    // this.setState({ tableID: String(history.location.pathname).substring(1) });
    return pathArray;

  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter history={this.props.history}>
          <div className="App">
            <Main pathArray={this.retriveInfoFromURL()} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
