import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import {connect} from 'react-redux'

@withRouter
@connect(
  null,
  {loadData}
)
class AuthRoute extends React.Component{
  componentDidMount(){
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname)>-1){
      return null
    }
  //  获取用户信息
    axios.get('/user/info')
      .then(res=>{
        if (res.status == 200){
          if (res.data.code ==0){
          //  有登录信息
            this.props.loadData(res.data.data)
          }else{
            this.props.history.push('/login')
          }
          console.log(res)
        }
      })
  //   是否登录
  //   现在的URL是否跳转
  //   用户的type是BOSS还是牛人
  //  用户是否完善信息（头像，简介之类的）
  }

  render(){
    return null
  }
}

export default AuthRoute