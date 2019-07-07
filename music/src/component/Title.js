import React from 'react';
class Title extends  React.Component{
    constructor(props){
        super(props);
       this.state={
           style:{
               fontSize:"1.12rem",
               color:"rgba(100,100,100,.8)",
                 marginBottom:"0.5rem",
               padding:"0 3rem",
               marginTop:"1.25rem"

           }
       }
    }
    render(){
        const {title} = this.props;
        return(
            <div style={this.state.style}> {title} </div>
        )
    }
}
export default Title;