import React from 'react'
import  './Login.css'
import img from '../../src/assets/bg.jpg'

class Login extends React.Component{


    handleClick = () =>{
this.props.history.push('/fiber')
    }

    render(){
        return(
            <div>
                <div id="page-wrap">

<div>
    <div>
    <input autocomplete="off" name="name" type="text" placeholder="User Name"></input>
    </div>
    <div>
    <input autocomplete="off" name="password" type="password" placeholder="Password"></input>
    </div>
    <div>
        <button onClick={this.handleClick}>Log In</button>
    </div>
</div>

                </div>

<div id="bg">
  <img src={img} alt=""></img>
</div>
            </div>
        )
    }
}

export default Login