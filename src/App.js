import React, { Component } from 'react';

import './App.css';
//on importel outil de traduction
import marked from 'marked'
import { sampleText } from './sampleText'


class App extends Component  {
  state={
    text: sampleText
  }
//pour recuperer la valeur
  handleChange= event => {
    //event = au moment du changement target = dans quoi  est arriver le changement
    const text = event.target.value
    //mise a jour 
    this.setState({ text })

  }

  componentDidMount(){
    const text = localStorage.getItem('text')
    this.setState({text})
    if (text){
      this.setState({ text})
    }else{
      this.setState({ text : sampleText})
    }
  }
  //pour sauvegarder la mise a jour
  componentDidUpdate(){
    //const text=this.state.text ou
    const { text } =this.state
    localStorage.setItem('text', text)

  }
  //creation de methode pour utiliser librairie marked
  //
  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return { __html}
  }
  render (){
    return (
      
      <div className="container">
        <div className='row'>
          <div className="col-sm-6">
            <textarea 
              onChange={this.handleChange}
              //valeur du state
              value={this.state.text}
              rows="35" 
              className="form-control">
            </textarea>
          </div>
          <div className="col-sm-6">
            <div>             
              <div dangerouslySetInnerHTML={this.renderText(this.state.text)}/>              
            </div>
          </div>
        </div>
        
      </div>
      
    )
  }
}

export default App;
