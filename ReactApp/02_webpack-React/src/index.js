import React from 'react';
import ReactDom from 'react-dom';
import CmtList from '@/components/CmtList';
import BindEvent from '@/components/BindEvent';
import BindInputValue from '@/components/BindInputValue';
import 'bootstrap/dist/css/bootstrap.css'; //引入bootstrap样式

ReactDom.render(
    <div>
        {/* <CmtList /> */}
        {/* <BindEvent /> */}
        <BindInputValue />
    </div>,
    document.getElementById("app"));