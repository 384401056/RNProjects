import React from 'react';
import cssObj from '@/css/cmtlist.scss';

export default function CmtItem(props) {
    return (
        <div className={cssObj.cmtbox}>
            <h3>评论人：{props.user}</h3>
            <p className={cssObj.content+ " test"}>评论内容：{props.content}</p>
        </div>
    )
}