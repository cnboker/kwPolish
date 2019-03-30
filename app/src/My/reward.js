import React, {Component} from "react";
import Account from "./account";
import axiox from "axios";
import {connect} from "react-redux";
import ImageUploader from '~/src/Components/Fileuploader/index'
import {userUpdate} from '~/src/Client/action'

class Reward extends Component {
  constructor() {
    super();
    this.state = {
      profile: {
        grade: "",
        rewardCode: "",
        userName: "",
        expiredDate: Date.now(),
        balance: []
      },
      pictures: []
    };
    this.onDrop = this
      .onDrop
      .bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    console.log('ondrop', pictureFiles, pictureDataURLs)
    this.setState({
      pictures: this
        .state
        .pictures
        .concat(pictureFiles)
    });
  }

  componentDidMount() {}

  getStats(balance) {
    var amount = balance.reduce((sum, val) => {
      return (sum += val.amount);
    }, 0);
    var paidAmount = balance
      .filter(f => f.status === 1)
      .reduce((sum, val) => {
        return (sum += val.amount);
      }, 0);
    var unPaidAmount = amount - paidAmount;
    return {amount, paidAmount, unPaidAmount};
  }

  onFinished(url) {
    this
      .props
      .dispatch(userUpdate(this.props.client.token.userName, {wxpayUrl: url}))
  }

  onRemove(url) {
    this
      .props
      .dispatch(userUpdate(this.props.client.token.userName, {wxpayUrl: ''}))
  }

  render() {
    const {profile} = this.props;
    const balance = profile
      .balance
      .filter(x => x.payType == 2);
    const stats = this.getStats(balance);
    return (
      <div className="row">
        <div className=" mt-3">
          <h3>分享越多,收获越多！</h3>

          把好用的钢铁侠推荐给更多人使用，您会有更多收获。经您推荐的注册用户，一旦激活VIP身份，您就能有
          <strong style={{
            color: "red"
          }}>
            50元/人
          </strong>
          奖金拿，奖励随时可提现.
          <br/>

          记得提醒新用户在注册时，输入您的专用推荐码哟！

          <p>
            钢铁侠赐您专用推荐码:
            <span
              style={{
              fontSize: "36px",
              color: "red",
              marginLeft: "15px"
            }}>
              {this.state.profile.rewardCode}
            </span>
          </p>
        </div>

        <div className=" mt-3">
          <h3>点击下面图标上传收款码，方便给您返还奖励</h3>

          <ImageUploader
            images={profile.wxpayUrl?[profile.wxpayUrl]:[]}
            onFinished={this
            .onFinished
            .bind(this)} onRemove={this.onRemove.bind(this)}/>

        </div>

        <div className=" mt-3">
          <h3>我的分享收益</h3>
          <br/>
          <Account balance={balance} onlyReward={true}>
            <div className="text-right">
              总收益: {stats
                .amount
                .toFixed(2)}
              元，已提现金额:{stats
                .paidAmount
                .toFixed(2)}元，余额: {stats
                .unPaidAmount
                .toFixed(2)}
            </div>
          </Account>
          <p>群号：340828020</p>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {client: state.client, profile:state.userProfile};
};

//state表示reducer, combineReducer包含state和dispatch
export default connect(mapStateToProps)(Reward);