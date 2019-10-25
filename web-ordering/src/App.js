import React from 'react';
import { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

// import { koiSushiMenu } from './Firebase/firebase'; // test

const store = ConfigureStore();

class App extends Component {

  render() {


    // koiSushiMenu.get()
    //   .then(querySnapshot => {
    //     const data = querySnapshot.docs.map(doc => doc.data());
    //     console.log(data); // array of cities objects
    //   })
    //   .catch((err) => {
    //     console.log('Error getting documents', err);
    //   });



    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
