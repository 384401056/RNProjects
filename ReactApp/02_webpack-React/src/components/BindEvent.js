import React from 'react'

export default class BindEvent extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => { this.show("hahaha", "wowowow") }} >Click me! 方式一</button>
        <button onClick={this.show.bind(this, 'hahahaha', 'wowwowowow')} >Click me! 方式二</button>
      </div>
    )
  }

  show = (arg1, arg2) => {
    console.log("Show ...."+ arg1 + arg2);
  }

}
