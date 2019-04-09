import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;



      // <Row className="container">
      //   <Col span="2" className="nav-left">
      //     <NavLeft />
      //   </Col>
      //   <Col span="22" className="main">
      //     <Row>
      //       <Header />
      //     </Row>
      //     <Row className="content">
      //       <Home />
      //     </Row>
      //     <Footer />
      //   </Col>
      // </Row>
