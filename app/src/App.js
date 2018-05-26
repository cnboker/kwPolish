import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import Header from './Components/Header'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Container/Home'
import Keyword from './Keyword/index'
import Start from './Container/Start'
import classNames from 'classnames'
import './Components/Header.css'
import { PrivateRoute } from "./lib/check-auth"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { unsetClient } from "./Client/action"
//route test https://pshrmn.github.io/route-tester/#/

class App extends Component {

  render() {
    return (
     
      <div>
        <Header/>
        <div className={classNames('container', 'marginTop70')}>
          <Switch>
            <PrivateRoute path='/keyword' component={Keyword} dispatch={this.props.dispatch}/>
            <Route exact path='/' component={Home}/>
            <Route path="/start" component={Start}/>
          </Switch>
        </div>

      </div>

    )
  }
}

//referene https://stackoverflow.com/questions/36559661/how-can-i-dispatch-from-child-components-in-react-redux
const mapStateToProps = state => state.client

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
    ...bindActionCreators({ unsetClient }, dispatch)
  }
}
//不能传mapStateToProps进去，因为PrivateRoute检查token有效后会发起setClient的action, 而
//state里面包含client reducer导致重新render,从而又作验证发起setClient导致死循环
//dashboard不能使用PrivateRoute会引起程序死循环
export default connect(mapStateToProps, mapDispatchToProps)(App)
