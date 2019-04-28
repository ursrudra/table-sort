import React from 'react';
import './App.css';
import CoinTable from './components/coin-table';
import data from './data/coins.json';
import Done from './images/done.svg';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: data,
      updatedData:[],
      updateedRecords:[],
      updateedRecord:{},
      value:"Something",
      isInEditMode:false, 
      currentPage:1,
      editIndex:-1, 
      direction:{
        price_usd:'asc',
        rank:'asc',
        name:'asc',
        symbol:'asc',
        hour:'asc',
        day:'asc',
        week:'asc'
      }
    }
  }

  getSortOrder = (e,key,type)=>{
  //  console.log("Sort order", e.target.value,key);
   this.setState({direction:{...this.state.direction,[key]:e.target.value}},
    ()=>{
      this.sortBy(key,type);
    }
  )
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
    })
  }

  else if(type === 'name'){
    console.log(`${type} sort by ${key}`)
     if(this.state.direction[key] === 'asc'){
      this.setState({
        data:data.sort((a,b) =>{
            let nameA = a.name.toUpperCase(); // ignore upper and lowercase
            let nameB = b.name.toUpperCase(); // ignore upper and lowercase
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
     else {
      this.setState({
        data:data.sort((a,b) =>{
            let nameA = a.name.toUpperCase(); // ignore upper and lowercase
            let nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          })
      })
     }
  }
}
//need to edit this function if data changed then only we need to update it
  getUpdatedData = (e,key,rank)=>{
   const value = e.target.value;
   const feildName = e.target.name;
   // const r = this.state.updatedData.find(f => (f.rank === rank));
   this.setState({
     updatedData:[...this.state.updatedData,{[key]:value,rank:rank}],
   },()=>{
      
      const oldRow = this.state.data.find(f => f.rank === rank)
      if(oldRow[key]!==value){
      this.setState({updateedRecords:[...this.state.updateedRecords,
        {...oldRow,[key]:value}],updateedRecord:{...oldRow,[key]:value,className:'edited',edited_feild:feildName}
      },
      ()=>{
         this.changeEditMode()
         const updatedDataSet = this.state.data.map(data=> {
           if(data.rank === rank){
             return this.state.updateedRecord
           }
           else{
             return data;
           }
         })
         this.setState({data:updatedDataSet});
        
      })
   }
   else{
     this.changeEditMode()
   }
  }
   )
  }

  // ,()=>{
  //   const oldRow = this.state.data.find(f => f.rank === rank)
  //   this.setState({updateedRecords:[...this.state.updateedRecords]},
  //   this.changeEditMode()
  getSelectedRowId = (e,id)=>{
    this.setState({editIndex:id,isInEditMode:true})
  }
  changeEditMode = ()=>{
    this.setState({isInEditMode:!this.state.isInEditMode})
  }
  
  getUpdatedDataMiddleWare = (event,name,rank)=>{
    var code = event.keyCode || event.which;
    if(code === 27) { //27 is the ESC keycode
      this.changeEditMode();
    } 
    else if(code === 13){//13 is the enter keycode
      this.getUpdatedData(event,name,rank);

    }
  }
  renderTextView = (value,type,name,rank)=>{
   return(
     <input type={type} defaultValue={value} name={name}  onKeyDown={(e)=>this.getUpdatedDataMiddleWare(e,name,rank)}/>
   )
  }
  renderSelectView = (columnName,type,sdata)=>{
    return(
      <select name="order" value='' className="order" onChange={(e)=>this.getSortOrder(e,columnName,type)}>
         <option value="" disabled></option>
         {
           sdata.map((data,i)=> {
             return <option value={data.value} key={i}>{data.value}</option>
           })
         }
      </select>
    )
  }
  renderEditView = ()=>{
    const row = this.state.data.find(r => r.rank === this.state.editIndex);
    return (
      <tr key={row.rank} onClick={(e)=>this.getSelectedRowId(e,row.rank)}>
      <td>{row.rank}</td>
      <td>{this.renderTextView(row.name,'text','name',row.rank)}</td>
      <td>{row.symbol}</td>
      <td>{this.renderTextView(row.price_usd,'number','price_usd',row.rank)}</td>
      <td className="mobile">{row.percent_change_1h}</td>
      <td className="mobile">{row.percent_change_24h}</td>
      <td className="mobile">{row.percent_change_7d}</td>


  </tr>
    )
  }

  showPanel = (rowId)=>{
    return( 
      <div>
        <h1>Panel</h1>
      </div>
    )
  }
  renderIcon = ()=>{
    return <img src={Done} className='done' alt="done editing"/>
  }
  renderDefaultView = (rank)=> {
    const row = this.state.data.find(r => r.rank === rank );
    return (
      <tr key={row.rank} className={row.className}>
              <td>{row.rank}</td>
              <td onClick={(e)=>this.getSelectedRowId(e,row.rank)}>{row.name}{row.edited_feild === 'name' ? this.renderIcon():''}</td>
              <td>{row.symbol}</td>
              <td onClick={(e)=>this.getSelectedRowId(e,row.rank)}>{row.price_usd}{row.edited_feild === 'price_usd' ? this.renderIcon():''}</td>
              <td className="mobile">{row.percent_change_1h}</td>
              <td className="mobile">{row.percent_change_24h}</td>
              <td className="mobile">{row.percent_change_7d}</td>
              

          </tr>

    )
  }
handlePagination = (step)=>{
  step === 'prev'? this.setState((state) => {
    return {currentPage:state.currentPage - 1}
  })
  :this.setState((state)=>{
    return {currentPage:state.currentPage + 1}
  })
}  
handleBulkUpdate = ()=>{
  console.log('Bulk',this.state.updatedData);
}
 render(){
   const filteredData = this.state.data.filter((d,index) => (index <= (this.state.currentPage * 10) - 1) && index >= ((this.state.currentPage -1) * 10));
  return (
    <div className="App">
       <Header/>
       <div className="container">
       <CoinTable data={filteredData} sortBy={this.sortBy}
       renderEditView={this.renderEditView}
       renderDefaultView={this.renderDefaultView}
       getSelectedRowId={this.getSelectedRowId}
       editIndex={this.state.editIndex}
       isInEditMode={this.state.isInEditMode}
       order={this.state.direction}
       renderSelectView={this.renderSelectView}
       getSortOrder={this.getSortOrder}/>
       <div className="navigation">
       <button onClick={()=>this.changeEditMode()} className='btn'>X</button>
       <button onClick={()=>this.handlePagination('prev')} disabled={this.state.currentPage <= 1} className='btn'>Prev</button>
       <button onClick={()=>this.handlePagination('next')} disabled={this.state.currentPage * 10 >= this.state.data.length} className='btn'>Next</button>
       <button onClick={this.handleBulkUpdate} name="bulkUpdate" className='btn btn__update'>Bulk Update</button>
       </div>
      </div>
     <Footer/>
    </div>
  );
 } 
}

export default App;
