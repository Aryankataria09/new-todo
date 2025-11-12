import React, { Component } from 'react';

class StyleComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            active:false
        }
    }
    changeState=()=>{
        this.setState({
            active:true
        })
    }
  render() {
    let obj1 = {
      color: "red",
      backgroundColor: "black",
      fontSize:"50px"
    };
    if(this.state.active)
    {
        obj1.backgroundColor="yellow";
    }
    //let obj2 = {
      //fontSize: "100px",
      //fontFamily: "Cooper"
    //};

    return (
      <div>
        <button style={obj1} onClick={this.changeState}>Click</button>
        {/*<h1 style={{ ...obj1, ...obj2 }}>Hello</h1>*/}
      </div>
    );
  }
}

export default StyleComponent;
