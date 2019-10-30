import React from 'react';
import ReactDOM from 'react-dom';


class SearchEngine extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            query:"",
            results: [],
            status : "Searching For "
        }
        this.inputChanged=this.inputChanged.bind(this);
        this.buttonClicked=this.buttonClicked.bind(this);
    }

    buttonClicked(event)
    {
        var that=this;
        var temp=[]; 
       let url="https://api.duckduckgo.com/?q="+this.state.query+"&format=json&pretty=1";
       let request=new XMLHttpRequest();
       request.open('GET',url);
       request.send();
       request.onreadystatechange=() =>{
       if(request.readyState == 4 && request.status == 200)
       {
        this.setState({
            status:"Result For "
            
        });
           let data = JSON.parse(request.responseText);
            for(let i=0 ;i < data.RelatedTopics.length; i++)
            {
                let Text= data.RelatedTopics[i].Text;
               let result= document.createElement('a');
               result.href=data.RelatedTopics[i].FirstURL;
               result.innerText=Text;
              temp.push(result); 
            }
          
            that.setState({
                results :  temp
             })
       }
       console.log(that.state.results);
      
    }
}
    inputChanged(event)
    {
        this.setState({
            query:event.target.value
            
        });
        
    }
    render()
    {
        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                <h2>Search Engine</h2>
                <hr/>
                <label>
                    <input onChange={this.inputChanged} className="form-control"/>
               </label>
                       <button onClick={this.buttonClicked} className="btn btn-info">Search</button>
                       
                       <hr/>
                       <h5>{this.state.status +this.state.query}</h5>
                       <SearchResult  results={this.state.results}/>
                    </div>
                
                </div>
        
        </div>
        );
    }
}

class SearchResult extends React.Component
{
    constructor(props)
    {
        super(props);
        
    }
   
    render()
    {
        var resultList=[];
        for(var i = 0 ; i< this.props.results.length ; i++)
        {
           resultList.push(<a href={this.props.results[i].href}><li>{this.props.results[i].innerText}</li></a>);
        }
        console.log(resultList);
        return (
    <ul className="result">
      {resultList}
    </ul>
        );
    }
}

ReactDOM.render(<SearchEngine/>,document.getElementById('root'));