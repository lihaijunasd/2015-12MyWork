let Board =React.createClass({
            getInitialState(){
                        return {input:'',arr:[]}
            },

            change(event){
                        var total = event.target.value;
                        this.setState({input:total})

            },

            headClick(event){
                     // var sum= this.refs.myTxt.value;
                        this.state.arr.push(this.state.input);
                        this.setState({arr:this.state.arr});
                        // this.refs.myTxt.value= '';

            },
            render(){
                        return (
                            <div className="panel panel-default">
                                        <div className="panel-heading">
                                                    <h1>珠峰留言板</h1>
                                        </div>
                                        <div className="panel-body">
                                                    <ul>
                                                                {
                                                                        this.state.arr.map(function (item,index) {
                                                                                   return <li key={index}>{item}</li>
                                                                        })
                                                                }
                                                    </ul>
                                        </div>
                                        <div className="panel-footer">
                                                    <input type="text" ref="myTxt" className="form-control" onChange={this.change}/>
                                                    <button className="btn btn-primary" onClick={this.headClick}>留言</button>
                                        </div>
                            </div>
                        )
            }
});
ReactDOM.render(<Board></Board>,document.querySelector('#container'));
/*
* 需求
* 点击留言，input
* 让留言中的内容放在li标签里面 每一条留言创建一个li
* 定义一个状态，数组，如果有添加一个
*
*
*
* */