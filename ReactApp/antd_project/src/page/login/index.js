import React, { Component } from 'react'
import './index.less';
import {
  Row, Button, Table, Modal, message,
} from 'antd'
import WrappedNormalLoginForm from '../../components/Form/index';
import ImageCode from '../../components/ImageCode';

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // url:"",
    //   images: [
    //     'http://47.107.243.224:8010/e682140d7f0911ecef3cc8050e6c05e1?w=500&h=300',
    //     'http://47.107.243.224:8010/4f915ea1f32de33554a63e11273234c7?w=500&h=300',
    //     'http://47.107.243.224:8010/b83bb1efb060f9c0541aa9eb34b9573b?w=500&h=300',
    //     'http://47.107.243.224:8010/b2edb240fbc4abee9a6569fd986c19d0?w=500&h=300',
    //     'http://47.107.243.224:8010/d089b024bb1784b0276feadb5a5cc47d?w=500&h=300',
    //     'http://47.107.243.224:8010/c4591bc5ad129998b8c9192b702e9354?w=500&h=300',
    //     'http://47.107.243.224:8010/0a61b425b88e56658de5dc75bf6b84cd?w=500&h=300',
    //     'http://47.107.243.224:8010/ac96921907a6614d16ebd11711e21cc2?w=500&h=300',
    //     'http://47.107.243.224:8010/fb0f360bc922e0b80cc8533b9e651570?w=500&h=300',
    //     'http://47.107.243.224:8010/bba91989bd17756283954e17637d7a2e?w=500&h=300'
    // ]
    }
  }

  // componentDidMount() {
  //   this.setState({ url: this.getImage() })
  // }

  // getImage = () => {
  //   let i = Math.floor(Math.random() * 10)
  //   return this.state.images[i];
  // }

  // onReload = () => {
  //   this.setState({ 
  //     url: this.getImage() 
  //   })
  // }
  render() {
    return (
      <div>
        <div>
          <WrappedNormalLoginForm />
        </div>
        {/* <div className="lg_code">
          <ImageCode
            imageUrl={this.state.url}
            onReload={this.onReload}
            onMatch={() => {
            }}
          />
        </div> */}
      </div>
    )
  }
}
