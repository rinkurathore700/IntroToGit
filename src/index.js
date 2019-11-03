import React from 'react';
import ReactDOM from 'react-dom';



class BookLibrary extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            query:"",
            books: [],
            
        }
       
        this.updateBooks=this.updateBooks.bind(this);
       
    }
  
componentDidMount()
{
    
   
        
}

updateBooks(Books)
{
    this.setState({
        books: Books,
    })
}
    
    render()
    {
       
        return (
        <div className="container-fluid">
           <div className="row">
                <div className="col-md-4 offset-md-4">
                <h1>BOOK SEARCH</h1>
                <hr/>
           <LanguageSelect updateBooks={this.updateBooks}/>         
           </div>
           <BookSearchResult/>
           </div>
        </div>
        );
    }
}

class LanguageSelect extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            books:[]
        }
        this.inputChanged=this.inputChanged.bind(this);
    }

    inputChanged(event)
    {
         
        
       
    }
componentDidMount()
{
    let req=new XMLHttpRequest();
    req.open("GET","books.json");
    req.send();
    req.onreadystatechange=()=>{
      if(req.readyState==4&& req.status==200)
      {
          var data = JSON.parse(req.responseText);
          
       console.log(data);
      } 
    }
}
    render()
    {
       
        return (
       
           
            <div>
                <h5>Enter Language of book</h5>
                <hr/>
                <label>
                    <select onChange={this.inputChanged} className="form-control">
                      <option>Selected Your Language</option>
                        </select>
               </label>
               <br/>
        <button  className="btn btn-info">Search</button>
                       
                       <hr/>
                    
                      
              </div>      
       
        );
    }

}


class BookSearchResult extends React.Component
{
    constructor(props)
    {
        super(props);
        
    }
   
    render()
    {
       
        //console.log(this.props.Books);
       return(<div className="table-responsive">
       <table className="table">
           <thead>
             <tr>
               <th scope="col">S.No</th>
               <th scope="col">Title</th>
               <th scope="col">Country</th>
               <th scope="col">Language</th>
            </tr>
         </thead>
           </table>
       </div>);
        
        }
}

ReactDOM.render(<BookLibrary/>,document.getElementById('root'));