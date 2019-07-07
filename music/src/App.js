import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store'
import Router from './router';

class App extends React.Component{
    componentDidMount(){
        sessionStorage.setItem("userId",'5')
    }
 render(){

     return (
         <Provider store = {store}>
             <div className="App">
                 <Router> </Router>

             </div>
         </Provider>

     );
 }
}

export default App;
