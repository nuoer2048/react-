import React, {Component} from 'react';
import { Icon } from 'antd-mobile';
import { Link,withRouter } from 'react-router-dom';
import { getRoute } from '../../util/backTo';
import './header.less';
@withRouter
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.goBack = this.goBack.bind(this);
        this.handleScroll = this.handleScroll.bind(this)
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll(){

        if(window.scrollY>80){
            this.refs.header.style.background = "#ff82ab";

        }else{
            this.refs.header.style.background = "rgba(0,0,0,0)";
        }
    }
    goBack(){
        console.log(getRoute());
        this.props.history.goBack()
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        return (

            <div id="header" ref="header">
                <span>{this.props.text}</span>
                <Link to={getRoute()} onClick={this.goBack} className="h-back">
                    <svg t="1562405715998" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2579" width="16" height="16"><path d="M204.8 506.667l472.064-512 142.336 153.6-330.752 358.4 330.752 358.4-142.336 153.6-472.064-512z" p-id="2580" fill="#ffffff"></path></svg>
                </Link>
                {
                    this.props.operate?
                        <div onClick={this.props.onClick} className="h-operate">{this.props.operate}</div>
                        :
                        null
                }

            </div>

        )
    }
}
export default Header