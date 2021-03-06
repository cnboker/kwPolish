import React, { Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";

import Event from "../event/list";
import Extender from "./keywordExtender";
import Rank from "./rankChart";

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    }; 
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  getKeyword() {
    var id = '';
    if (this.props.analysisId !== '') {
      id = this.props.analysisId;
      const { keywords } = this.props;
      return keywords[id];
    }

    return id;
  }

  render() {
    if(this.props.analysisId === '')return null
    return ( 
      <div>
        <a className="btn btn-info"
          href="#"
          onClick={e => {
            e.preventDefault();
            this.props.detailView('')
          }}
        >返回</a>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              排名跟踪
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              记录
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              拓词
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Rank {...this.props} />
          </TabPane>
          <TabPane tabId="2">
            <Event {...this.props} />{" "}
          </TabPane>
          <TabPane tabId="3">
            <Extender keyword={this.getKeyword()} displaySearchBtn={true} />{" "}
          </TabPane>
        </TabContent>
      </div>
    );
  }
}


