import React, {Component} from "react";
import {connect} from "react-redux";
import EventBus from "eventing-bus";
import {sendToBackground} from "../communication";
import {Link} from 'react-router-dom'
import {get} from "http";
class Index extends Component {
  constructor() {
    super();
    this.state = {
      keywords: ["正在获取拓词数据..."],
      selectedKeywords: []
    };
  }
  componentDidMount() {
    var kw = this.getKeyword();
    //发消息给后台
    sendToBackground("wordQuery", kw.keyword);
    var self = this;
    EventBus.on("wordResponse", function (obj) {
      console.log("react wordResponse", obj);
      kw = self.getKeyword();
      if (kw.keyword == obj.keyword) {
        self.setState({keywords: obj.result});
      }
    });
  }

  getKeyword() {
    var id = this.props.match.params.id;
    const {keywords} = this.props;
    var kw = keywords.filter(x => {
      return x._id == id;
    });
    return kw[0];
  }

  componentWillUnmount() {}

  wordReady(keywords) {
    console.log("wordReady", keywords);
  }

  leftClick(index) {
    var selected = this
      .state
      .keywords
      .splice(index, 1)
    var selectedKeywords = this.state.selectedKeywords;
    selectedKeywords.push(selected)
    this.setState(selectedKeywords)
  }

  rightClick(index) {
    var selectedKeywords = this.state.selectedKeywords;
    var removeItem = selectedKeywords.splice(index, 1);
    this
      .state
      .keywords
      .push(removeItem)
    this.setState(selectedKeywords)
  }

  keywordSubmit() {}

  render() {
    return (
      <div>
        <div className="alert alert-success">
          点击左边列表关键词后添加到右边列表，再点击“添加到排名列表”完成操作
        </div>
        <div className="row">
          <div className="col-sm">
            <ul className="list-group">
              {this
                .state
                .keywords
                .map((item, index) => {
                  return (
                    <li
                      className="list-group-item"
                      key={index}
                      onClick={this
                      .leftClick
                      .bind(this, index)}>
                      {item}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col-sm">
            <ul className="list-group">
              {this
                .state
                .selectedKeywords
                .map((item, index) => {
                  return (
                    <li
                      className="list-group-item"
                      key={index}
                      onClick={this
                      .rightClick
                      .bind(this, index)}>
                      {item}
                    </li>
                  );
                })}
              <li className="list-group-item">
                <Link
                  to={{
                  pathname: '/keyword/new',
                  state: {
                    newKeywords: this
                      .state
                      .selectedKeywords
                      .join('\n'),
                    link: this
                      .getKeyword()
                      .link
                  }
                }}
                  className="btn btn-primary"
                  onClick={(e) => {
                  if (this.state.selectedKeywords.length == 0) {
                    e.preventDefault()
                  }
                }}>添加到排名列表</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {keywords: state.keywords, client: state.client};
};
//state表示reducer, combineReducer包含state和dispatch
export default connect(mapStateToProps)(Index);
