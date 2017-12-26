import React from 'react'
import PropTypes from 'prop-types'
import {List,Grid} from 'antd-mobile'

class AvatarSelector extends React.Component{
  static PropTypes = {
    selectAvatar:PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    const avatatList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(v=>({
        icon:require(`../img/${v}.png`),
        text:v
      }))
    const gridHeader = this.state.text?
                        (<div><span>已选择头像</span><img  src={this.state.icon} alt="" style={{width:20}}/></div>)
                        : '请选择头像'
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid
            data={avatatList}
            columnNum={5}
            onClick={elm=>{
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector