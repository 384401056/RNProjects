import React from 'react';
import ReactDom from 'react-dom';
import CmtList from '@/components/CmtList';
import BindEvent from '@/components/BindEvent';

ReactDom.render(
    <div>
        {/* <CmtList /> */}
        <BindEvent />
    </div>,
    document.getElementById("app"));