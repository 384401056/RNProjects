import React, { Component, Fragment } from 'react';
import './style.css';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

class Transition extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      show: true,
      showValidationMessage: true,
    }
  }

  render() {
    return (
      <Fragment>
        <h2>CSS3 动画效果</h2>
        <div className={this.state.show ? 'show' : 'hide'}>
          <h2>自定义CSS3动画 Hello World.</h2>
        </div>
        <button onClick={this.btnClick01.bind(this)}>点击</button>

        <hr />

        <CSSTransition
          in={this.state.showValidationMessage} //执行变量绑定
          timeout={1000} //动画时间 ms
          classNames="fade"
          unmountOnExit //动画结束移除dom
          appear={true} //第一次页面展示时也带动画果，设置 appear 样式
          onEntered={(el) => { //显示结束时执行的方法
            el.style.color = 'green';//被包裹元素的颜色设为red
          }}
          onExit={(el) => {//开始隐藏时执行的方法
            el.style.color = 'green';
          }}
        >
          <h2>CSSTransition动画 Hello World.</h2>
        </CSSTransition>
        <button onClick={this.btnClick02.bind(this)}>点击</button>

        <hr />

        <TransitionGroup>
        {
          this.state.list.map((item, index) => {
            return (
              <CSSTransition
                // in={this.state.showValidationMessage} 当为TransitionGroup动画时，元素中的in 就不需要了
                timeout={1000} //动画时间 ms
                classNames="fade"
                unmountOnExit //动画结束移除dom
                appear={true} //第一次页面展示时也带动画果，设置 appear 样式
                key={item.id}
                onEntered={(el) => { //显示结束时执行的方法
                  el.style.color = 'orange';
                }}
              >
                <h2 onClick={this.removeItem.bind(this,index)}>{item.value}</h2>
              </CSSTransition>
            )
          })
        }
        </TransitionGroup>
        <button onClick={this.handleAddItem.bind(this)}>点击</button>
      </Fragment>
    )
  }


  btnClick01() {
    this.setState({
      show: !this.state.show
    }, () => {
      console.log(this.state.show);
    })
  }

  btnClick02() {
    this.setState({
      showValidationMessage: !this.state.showValidationMessage
    }, () => {
      console.log(this.state.show);
    })
  }

  /**
   * 添加item元素至list中
   */
  handleAddItem() {
    this.setState((prevState) => {
      let item = {
        id: this.getUUID(),
        value: "TransitionGroup动画-" + (Math.random(10) * 100000000000),
      }
      return {
        list: [...prevState.list, item],
      }
    })
  }

  removeItem(index){
    this.setState((prevState) => {
      prevState.list.splice(index, 1);
      return {
        list: [...prevState.list],
      }
    })
  }

  /**
 * 生成UUID来给key用
 */
  getUUID() {
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

}

export default Transition
