import React from 'react';
import CmtItem from '@/components/CmtItem';

//对CSS第三访loader进行参数设置后，才能把css模块导入，否则导入的对象是空的.
import cssObj from '@/css/cmtlist.scss';

// import bootcss from 'bootstrap/dist/css/bootstrap.css';

export default class CmtList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CommentList: [
                { id: 1, user: '张三', content: '哈哈哈哈，沙发....' },
                { id: 2, user: '李四', content: '哈哈哈哈，沙发....' },
                { id: 3, user: '王五', content: '哈哈哈哈，沙发....' },
                { id: 4, user: '赵六', content: '哈哈哈哈，沙发....' },
                { id: 5, user: '陈七', content: '哈哈哈哈，沙发....' },
                { id: 6, user: '吴八', content: '哈哈哈哈，沙发....' },
            ]
        }
        //对CSS第三访loader进行参数设置后，才能把css模块导入，否则导入的对象是空的.
        console.log(cssObj);
        // console.log(bootcss);
    }

    render() {
        return (
            <div>

                {/**使用 css 模块来设置样式 , 这里例举了，多种样式一起使用的方法*/}
                <h1 className={cssObj.title + " test"}>这是两种样式的评论内容</h1>
                <h1 className={[cssObj.title, 'test'].join(' ')}>这是两种样式的评论内容</h1>
                <h1 className={cssObj.title}>这是评论内容</h1>
                <div>
                    {/* 启用模块化后的bootstrap样式的写法，但是这样是不方便使用的, 所以.css结尾的文件不要用loader
                    <button className={[bootcss.btn, bootcss['btn-default']].join(" ")}>这是一个bootstrap按钮</button>
                    <button className={[bootcss.btn, bootcss['btn-primary']].join(" ")}>这是一个bootstrap按钮</button> 
                    */}

                    {/** 关闭css模块化后 bootstrap 样式使用就方便多了. */}
                    <button className="btn btn-default">这是一个bootstrap按钮</button>
                    <button className="btn btn-primary">这是一个bootstrap按钮</button>
                    <button className="btn btn-danger">这是一个bootstrap按钮</button>
                    <button className="btn btn-success">这是一个bootstrap按钮</button>
                    <button className="btn btn-info">这是一个bootstrap按钮</button>
               </div>

                {
                    this.state.CommentList.map(item => {
                        return <CmtItem key={item.id} {...item} />
                    })
                }
            </div>
        );
    }
}
