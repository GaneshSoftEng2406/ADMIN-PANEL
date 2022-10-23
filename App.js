import './App.css';
import axios from 'axios';
import react from 'react';

export default class App extends react.Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            activeItem:-1,
            filterArr:[],
            searchingValue:' ',
        }
    }
    async componentDidMount(){
      let resopnse=await axios.get('https://gist.githubusercontent.com/hmdlohar/a1ae4c3408b79fc82ab3f0af922b1f09/raw/270b29ce63b885df6d2851b71af6db9ccf5e72b9/Edyoda%2520Assigment%25201%2520Data')
      this.setState({ users:resopnse.data})
      this.setState({ filterArr:resopnse.data})

    }
    rowClicked=(item)=>{
        this.setState({activeItem:item})
    }    
    highLightIt=(str,id)=>{
        let bright=(id===this.state.filterArr[0].id)?'highLight':'secondaryHighLight'
        return str.toLowerCase().split(this.state.searchingValue.toLowerCase()).reduce((store,item,index,arr)=>{
        if(index===arr.length-1){
            return  <>{store}<span>{item}</span></>
        }
        return <>{store}<span>{item}</span><span className={bright}>{this.state.searchingValue}</span></>
    },<span></span>)
    }
    startSearch=(e)=>{
        if(e===''){
            console.log(e);
            console.log('not an string to filter');
            this.setState({filterArr:this.state.users,searchingValue:' '})
            return
        }
        let find=e.target.value;
        let filterSet=this.state.users.filter((item)=>{
            if((item.id).toString().toLowerCase().includes(find.toLowerCase())||item.firstName.toLowerCase().includes(find.toLowerCase())||item.lastName.toLowerCase().includes(find.toLowerCase())||item.email.toLowerCase().includes(find.toLowerCase())||item.phone.toLowerCase().includes(find.toLowerCase())){
                return true 
            }
        })
        this.setState({filterArr:filterSet,searchingValue:find})
    }
  render(){
      let address={},name='Name...... ',desc=' About the person ......'
      if(this.state.activeItem!==-1){
          address=this.state.activeItem.address;
          name=this.state.activeItem.firstName+' '+this.state.activeItem.lastName;
          desc=this.state.activeItem.description
        }
        else{
            address={
                streetAddress:'adress.....',
                city:'city.....',
                state:'state....',
                zip:'zip....'
            }
        }
        return (
            <main>
                <div className="table-section">

                    <form action="/">
                        <img src='./search-icon.svg' alt="Search Icon" />
                        <input type="text" placeholder="Enter something" name="search-box" className="search-box"  onChange={this.startSearch} />
                    </form>

                    <div className="table-wrapper">

                        <div className="table-headers" >
                            <table>
                                <thead>
                                    <tr>
                                        <th className='column1'>id</th>
                                        <th className='column2'>FirstName</th>
                                        <th className='column3'>LastName</th>
                                        <th className='column4'>Email</th>
                                        <th className='column5'>Phone</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className="table-data">
                            <table>
                                <tbody>
                                    {this.state.filterArr.map((item)=>{
                                        let active;
                                        (this.state.activeItem.id===item.id)?active='active':active='unactive'
                                        
                                    return(<>
                                        <tr key={item.id} onClick={()=>this.rowClicked(item,item.id)} className={active}>
                                        <td className='column1'>{this.highLightIt((item.id,item.id).toString())}</td>
                                        <td className='column2'>{this.highLightIt(item.firstName,item.id)}</td>
                                        <td className='column3'>{this.highLightIt(item.lastName,item.id)}</td>
                                        <td className='column4'>{this.highLightIt(item.email,item.id)}</td>
                                        <td className='column5'>{this.highLightIt(item.phone,item.id)}</td>
                                        </tr>
                                        </>)
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div className="info-wrapper">
                    <h1>Details</h1>
                    <p>Click on a table item to get detailed information</p>
                    <div className="info-ontent">
                        <div><b>User selected:</b>{name}</div>
                        <div>
                            <b>Description: </b>
                            <textarea value={desc}cols="50" rows="5" readonly/>
                        </div>
                        <div><b>Address:</b> {address.streetAddress}</div>
                        <div><b>City:</b> {address.city}</div>
                        <div><b>State:</b> {address.state}</div>
                        <div><b>Zip:</b> {address.zip}</div>
                    </div>
                </div>                
            </main>
        )
    }
}
