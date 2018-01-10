import React from 'react'
import {InputItem,List,NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from "../../util";
import QueueAnim from 'rc-queue-anim'

@connect(
  state=>state,
  { getMsgList,sendMsg,recvMsg,readMsg }
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={text:'',msg:[],showEmoji:false}
  }
  componentDidMount(){
    if (!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  componentWillUnmount(){
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  fixCarousel(){
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    },0)
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
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v=>v)
      .map(v=>({text:v}))
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userid]){
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
    return (
      <div id='chat-page'>
        <NavBar
          mode='dark'
          icon={<Icon type='left'/>}
          onLeftClick={()=>this.props.history.goBack()}
        >
          {users[userid].name}
        </NavBar>
        <QueueAnim delay={10} type='left'>
          {chatmsg.map(v=>{
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from===userid?(
            <List key={v._id}>
              <Item
                thumb={avatar}
              >{v.content}</Item>
            </List>
            // <p key={v._id}>对方发来的：{v.content}</p>
          ):(
            <List key={v._id}>
              <Item
                extra={<img alt='avatar' src={avatar}/>}
                className='chat-me'
              >{v.content}</Item>
            </List>
          )
          // return <p key={v._id}>{v.content}</p>
        })}
        </QueueAnim>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={
                <div>
                  <span
                    style={{marginRight:15}}
                    onClick={()=>{
                      this.setState({
                        showEmoji:!this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}
                  >😀</span>
                  <span onClick={()=>this.handleSubmit()}>发送</span>
                </div>
              }
            >
              信息
            </InputItem>
          </List>
          {this.state.showEmoji?<Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el=>{
              this.setState({
                text:this.state.text+el.text
              })
            }}
          />:null}
        </div>
      </div>

    )
  }
}

export default Chat