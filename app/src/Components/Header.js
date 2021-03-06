import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BootstrapMenu from "./Dropdownlist/bootstrapMenu";
// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();
export default class Header extends Component {
  constructor() {
    super();
    this.title = "费用管理";
    this.data = [
      { name: "充值码", link: "/sn" },
      { name: "微信支付", link: "/admin_wx_pay" },
      { name: "账单", link: "bill" }
    ];
  }
  componentDidMount() {}
  navs() {
    if (this.props.userName === "admin") {
      return (
        <nav className="my-2 my-md-0 mr-md-3">
          <Link className="p-2 text-dark" to="/qa">
            问答
          </Link>
          <Link className="p-2 text-dark" to="/users/keywords/__today__">
            今日关键词
          </Link>

          <Link className="p-2 text-dark" to="/users">
            用户列表
          </Link>
          <Link className="p-2 text-dark" to="/pool">
            任务池
          </Link>
          <BootstrapMenu title={this.title} data={this.data} />
        </nav>
      );
    } else {
      return (
        <nav className="my-2 my-md-0 mr-md-3">
          <Link className="p-2 text-dark" to="/keyword">
            排名监控
          </Link>
          {/* <Link className="p-2 text-dark" to="/qa">
            问答
          </Link> */}
          <Link className="p-2 text-dark" to="/customkw">
            拓词
          </Link>
          <Link className="p-2 text-dark" to="/reward">
            推荐奖励
          </Link>
          <Link className="p-2 text-dark" to="/setting">
            设置
          </Link>
          <Link className="p-2 text-dark" to="/my">
            用户中心
          </Link>
          <Link className="p-2 text-dark" to="/start">
            帮助
          </Link>
        </nav>
      );
    }
  }

  render() {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">钢铁侠</h5>

        {this.navs()}
        <button
          className="btn btn-outline-primary"
          onClick={this.props.unsetClient}
        >
          {this.props.userName ? "登出" : "登录"}
        </button>
        {/* {this.props.userName=='admin'&&<button onClick={history.goBack()}>返回</button>} */}
      </div>
    );
  }
}
