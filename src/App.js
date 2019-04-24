import React from 'react';
import './App.css';
import CoinTable from './components/coin-table';
import data from './data/coins.json';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: data,
      value:"Something",
      isInEditMode:false,  
      direction:{
        price_usd:'asc',
        rank:'asc',
      }
    }
  }

  sortBy = (key,type) =>{
    console.log(key,type);
    if( type === 'number'){
      console.log(`${type} sort by ${key}`)

    this.setState({
      data:data.sort((a,b) => (
        this.state.direction[key] === 'asc' 
        ? parseFloat(a[key]) - parseFloat(b[key])
        : parseFloat(b[key]) - parseFloat(a[key])
      )),  

      direction:{
        [key] : this.state.direction[key] === 'asc'
        ? 'desc'
        : 'asc'
      }
    })
  }
  else if(type === 'name'){
    console.log(`${type} sort by ${key}`)
    this.setState({
      data:data.sort((a,b) =>{
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;

      })
    })
  }
  }

  changeEditMode = ()=>{
    this.setState({isInEditMode:!this.state.isInEditMode})
  }
  updateComponentValue = ()=>{
    this.setState({
      isInEditMode:false,
      value:this.refs.theTextInput.value
    })
  }
  renderEditView = ()=>{
    return (
      <div>
      <input type="text" 
      defaultValue={this.state.value}
      ref="theTextInput"
      />
      <button onClick={this.changeEditMode}>X</button>
      <button onClick={this.updateComponentValue}>Ok</button>
    </div>  
    )
  }

  renderDefaultView = ()=> <h1 onDoubleClick={this.changeEditMode}>{this.state.value}</h1>

 render(){
  return (
    <div className="App">
     {
       this.state.isInEditMode ?   
       this.renderEditView()
       :
      this.renderDefaultView()
     }
     <CoinTable data={this.state.data} sortBy={this.sortBy}/>
    </div>
  );
 } 
}

export default App;
