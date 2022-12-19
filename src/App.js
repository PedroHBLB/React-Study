import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
    state = {
      name: 'Henrique',
      contador: 0
    };

  render() {
    const { name } = this.state;
    const { contador } = this.state;

    const handlePClick = () => {
      this.setState({name: 'Pedro'});
    }

    const handleAClick = (event) => {
      event.preventDefault();
      this.setState({contador: contador + 1});
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={handlePClick}>
            {name} {contador}
          </p>
          <a
            onClick={handleAClick}
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
