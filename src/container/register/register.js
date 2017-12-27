import React from 'react'
import Logo from '../../component/logo/logo'
import { List, Radio, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from "../../redux/user.redux"
import bossForm from '../../component/boss-form/boss-form'
import './index.css'


//所有的组件，本质上都是函数
//高阶组件主要用来属性代理跟反向继承（继承时不继承React.Component而是继承传进来的组件）
@connect(
  state=>state.user,
  {register}
)
@bossForm
class Register extends React.Component{
  constructor(props){
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount(){
    this.props.handleChange('type','genius')
  }
  handleRegister(){
    this.props.register(this.props.state)
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
        <Logo></Logo>
        <List>
          {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
          <InputItem
            onChange={(v)=>this.props.handleChange('user',v)}
          >用户名</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem
            type='password'
            onChange={(v)=>this.props.handleChange('pwd',v)}
          >密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem
            type='password'
            onChange={(v)=>this.props.handleChange('repeatpwd',v)}
          >确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem
            checked={this.props.state.type == 'genius'}
            onChange={()=>this.props.handleChange('type','genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.props.state.type == 'boss'}
            onChange={()=>this.props.handleChange('type','boss')}
          >
            BOSS
          </RadioItem>
          <WhiteSpace></WhiteSpace>
          <Button type='primary'
            onClick={this.handleRegister}
          >注册</Button>
        </List>
      </div>
    )
  }
}

export default Register