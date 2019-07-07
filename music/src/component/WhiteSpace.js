import React from 'react';
class WhiteSpace extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            style:{
                width:"100%",
                height:"0.9rem",
                backgroundColor:"#f5f5f5",
                margin:"0.75rem 0"

            }
        }
    }
    render(){
        return(
            <div style={this.state.style}> </div>
        )
    }
}
export default WhiteSpace;