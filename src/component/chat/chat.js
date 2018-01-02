import React from 'react'
import {InputItem,List,NavBar} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {sendMsg} from '../../redux/chat.redux'

const socket = io('ws://localhost:9093')

@connect(
  state=>state,
  { sendMsg }
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={text:'',msg:[]}
  }
  componentDidMount(){
    // socket.on('recvmsg',(data) => {
    //   this.setState({
    //     msg:[...this.state.msg,data.text]
    //   })
    // })
  }
  handleSubmit(){
    // socket.emit('sendmsg',{ text:this.state.text})
    // this.setState({text:''})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({text:''})
  }
  render(){
    console.log(this.props)
    const user = this.props.match.params.user
    const Item = List.Item
    return (
      <div id='chat-page'>
        <NavBar mode='dark'>
          {this.props.match.params.user}
        </NavBar>
        {this.props.chat.chatmsg.map(v=>{
          return v.from===user?(
            <List key={v._id}>
              <Item>{v.content}</Item>
            </List>
            // <p key={v._id}>对方发来的：{v.content}</p>
          ):(
            <List key={v._id}>
              <Item
                className='chat-me'
                extra={'avatar'}
              >{v.content}</Item>
            </List>
          )
          // return <p key={v._id}>{v.content}</p>
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
            >
              信息
            </InputItem>
          </List>
        </div>
      </div>

    )
  }
}

export default Chat