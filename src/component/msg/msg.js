import React from 'react'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'


@connect(
  state=>state
)
class Msg extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    console.log('msgGroup',msgGroup)
    const chatList = Object.values(msgGroup)
    return (
      <div>
          {chatList.map(v=>{
            const lastItem = this.getLast(v)
            const targetId = v[0].from === userid?v[0].to:v[0].from
            const name = userinfo[targetId]?userinfo[targetId].name:''
            const avatar = userinfo[targetId]?userinfo[targetId].avatar:''
            return(
              <List  key={lastItem._id}>
                <Item
                  thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                >
                  {lastItem.content}
                <Brief>{name}</Brief>
                </Item>
              </List>)
          })}
      </div>
    )
  }
}

export default Msg