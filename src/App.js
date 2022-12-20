import './App.css';
import React from 'react';

class App extends React.Component {
  state = {
    counter: 0,
    posts: [
      {
        id: 1,
        title: 'O título 1',
        body: 'O corpo 1'
      },
      {
        id: 2,
        title: 'O título 2',
        body: 'O corpo 2'
      },
      {
        id: 3,
        title: 'O título 3',
        body: 'O corpo 3'
      }
    ]
  };
  timeOutUpdate = null;

  // Lifecycle methods
  
  // É invocado imediatamente após um componente ser montado
  componentDidMount () {
    this.handleTimeout();
  }

  // É invocado imediatamente após alguma atualização ocorrer
  componentDidUpdate () {
    this.handleTimeout();
  }

  // É invocado imediatamente antes que um componente seja desmontado e destruído
  // qualquer limpeza necessária deve ser realizada neste método
  componenWillUnmount (){
    clearTimeout(this.timeOutUpdate);
  }

  handleTimeout = () => {
    const { posts, counter } = this.state
    posts[0].title = 'O título mudou';
    this.timeOutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 })
    }, 1000)
  }

  render() {
    const { posts, counter } = this.state

    return (
      <div className="App">
        <h1>{counter}</h1>
        {posts.map(post => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
