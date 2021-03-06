import React, {Component} from "react";
import {required} from "~/src/utils/fieldLevelValidation";
import {renderField} from "~/src/Components/Forms/RenderField";
import {reduxForm, Field} from "redux-form";
import axios from "axios";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {fetchProfile} from '~/src/Profile/action'

class SNActive extends Component {
  constructor(props) {
    super(props);
    this.submitStart = false;
  }

  submit(values) {
    var self = this;
    this.submitStart = true;
    const url = `${process.env.REACT_APP_API_URL}/sn/snActivate`;

    axios({
        method: "post",
        url: url,
        data: values,
        headers: {
          Authorization: `Bearer ${this.props.client.access_token}`
        }
      }).then(function (res) {
      self.submitStart = false;
      self
        .props
        .dispatch(fetchProfile());
      toast.info("激活成功", {position: toast.POSITION.BOTTOM_CENTER});
    })
      .catch(function (e) {
        self.submitStart = false;
        toast.error(e.response.data.message, {position: toast.POSITION.BOTTOM_CENTER});
      });
  }

  componentDidMount() {}

  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.submit.bind(this))}>
          <div className="alert alert-success">
          您可以联系销售商购买充值码，每个充值码有效期1个月（30天）。如需使用一个季度，这里提交3个充值码。如需使用半年，这里提交6个充值码即可，以此类推。推荐购买VIP年度套餐，优惠更多。
          </div>
          <Field
            name="sn"
            type="text"
            label="充值码"
            component={renderField}
            validate={required}
            placeholder="输入充值码"/>

          <button
            action="submit"
            className="btn btn-block btn-success"
            disabled={this.submitStart}>
            激活
          </button>
        </form>
       
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {client: state.client};
};
//state表示reducer, combineReducer包含state和dispatch
export default connect(mapStateToProps)(reduxForm({form: "form"})(SNActive));
