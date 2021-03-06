import React from "react";
import Dialog from "../../Components/Modals/Dialog";
import wxremarkImage from "~/public/images/wxremark.png";
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0
    };
  }
  componentDidMount() {
    this.props.requestwxPay();
  }

  wxPayPost() {
    this.props.postwxPay();
    this.setState({ status: 1 });
  }

  reanderRemarkImage(e) {
    e.preventDefault();
    this.refs.dialog.show({
      body: <img src={wxremarkImage} />,
      actions: [
        Dialog.CancelAction(() => {
          console.log("dialog cancel");
        })
      ]
    });
  }
  pendingRender(wxpay) {
    return (
      <div>
        <p>
          本次付款的对账码是<kbd>{wxpay.payCode}</kbd>
        </p>
        <h5>第一步，请用微信扫描下方二维码付款</h5>
        <p>
          <img src={process.env.REACT_APP_AUTH_URL + wxpay.keeperQR} alt="" />
        </p>
        <h5>
          第二步，请将本次对账码添加到
          <a href="#" onClick={this.reanderRemarkImage.bind(this)}>
            微信付款时的备注
          </a>
          里，以方便平台客服人员及时确认
        </h5>
        <h5 className="text-left">
          第三步，微信支付成功后，请点击下方按钮完成支付确认
        </h5>
        <button className="btn btn-primary" onClick={this.wxPayPost.bind(this)}>
          完成支付确认
        </button>
        <hr />
        说明：
        <br />
        <p>
          充值方式有两种，微信在线支付和充值码充值。
          <br /> <br />{" "}
          默认支付一个月VIP费用。如果需要购买多月，请分开多次支付。请注意，每次对账码不同。
          <br />{" "}
        </p>
        <p>
          工作时间，付款成功30分钟内完成充值确认。非工作时间，完成充值时间可能延后。你也可以通过购买充值码的方式完成充值，充值码提交成功，系统自动即时确认充值。
          <br />{" "}
        </p>
        <p>工作时间：周一至周六 9：00-12：00 14：00-17：00 （节假日除外）</p>
      </div>
    );
  }

  recharge() {
    this.setState({ status: 0 });
    this.props.requestwxPay();
  }

  rePostRender() {
    return (
      <div>
        <p className="text-left">
          提交成功,客服人员会尽快帮您处理，请稍后。如果继续充值请点击"充值“按钮继续充值
        </p>
        <p>
          <button
            onClick={this.recharge.bind(this)}
            className="btn btn-primary"
          >
            充值
          </button>
        </p>
      </div>
    );
  }

  render() {
    const { wxpay } = this.props;
    return (
      <div className="bs-expamle">
        <Dialog ref="dialog" />
        {this.state.status == 0
          ? this.pendingRender(wxpay)
          : this.rePostRender()}
      </div>
    );
  }
}
