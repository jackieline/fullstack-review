import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  this.componentDidMount = this.componentDidMount.bind(this);  
  }

  doWork(data) {
    $.ajax({
      type: 'GET',
      url: '/repos'
      // ,
      // success: data => {
      //   console.log(data);
      //   this.setState({
      //     repos: data
      //   });
      // }
    })
    .done(repos => {
      console.log(repos);
      this.setState({
        repos: repos
      });
    }).fail(function() {
      alert("error");
    });
  }

  componentDidMount() {
    // set up get request to server from here
    this.doWork();
  } 

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: '/repos',
      data: {'username': term},
      success: this.doWork.bind(this)
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
      
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));