import React from 'react';
import ReactDOM from 'react-dom';



class BookSearchEngine extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            query:"",
            books: [],
            status : "Searching For "
        }
        this.inputChanged=this.inputChanged.bind(this);
       
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
         
        for(let i =0 ;i<data.length;i++)
        {
          
            if(data[i].language=="English")
            {
                this.setState({        
                    books:this.state.books.push(data[i])
                })
            }
        }
        this.state.books.forEach((book)=>{
            lang.push(<option>{book.language}</option>)
        })
      }  
    }
        
}

    inputChanged(event)
    {
         
        
       
    }
    render()
    {
       
        return (
        <div className="container-fluid">
           
            <div className="row">
                <div className="col-md-4 offset-md-4">
                <h1>BOOK SEARCH</h1>
                <hr/>
                <h5>Enter Language of book</h5>
                <hr/>
                <label>
                    <select onChange={this.inputChanged} className="form-control">
                       {lang}
                        </select>
               </label>
               <br/>
        <button  className="btn btn-info">Search</button>
                       
                       <hr/>
                       <h5>{this.state.status +this.state.query}</h5>
                      
                    </div>
                
                </div>
                <BookSearchResult  Books={this.state.books}/>
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
        return (
   <div className="table-responsive">
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
       </div>
        );
        }
    }

ReactDOM.render(<BookSearchEngine/>,document.getElementById('root'));