import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import AddItem from "./add";
import Dialog from "../../Components/Modals/Dialog";
import { default as crudActions } from "./actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class List extends Component { 
  constructor() {
    super();
    this.state = {
      filter: null
    };
  }
  componentDidMount() {
    //mock()
    //this.fetch();
  }

  fetch() {
    if(this.props.analysisId === '')return; 
    const action = crudActions.fetch(
      0,
      0,
      true,
      this.props.client,
      this.props.analysisId
    );
    this.dispatch(action);
  }

  get dispatch() { 
    return this.props.dispatch;
  }

  onAdd() {
    console.log("onadd run...",this.props.analysisId);
    this.fetch();
  }

  onDelete(entity, event) {
    event.preventDefault();

    this.refs.dialog.show({
      title: "提示",
      body: "确定要删除此项吗?",
      actions: [
        Dialog.CancelAction(() => {
          console.log("dialog cancel");
        }),
        Dialog.OKAction(() => {
          const action = crudActions.delete(entity, this.props.client);
          this.dispatch(action);
        })
      ],
     
    });
  }

  renderList() {
    return this.props.events.map(item => {
      return (
        <tr key={item._id}>
          <td>{moment(item.createDate).format("YYYY-MM-DD HH:mm")}</td>
          <td>
            {item.text}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={this.onDelete.bind(this, item)}
            >
              <FontAwesomeIcon icon={faTrash} size="1x" />
            </button>
          </td>
        </tr>
      );
    });
  }

  onSelect(selectedOption) {
    this.setState({
      filter: selectedOption
    });
    console.log("option select", selectedOption);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="alert alert-success">
        在此记录你对当前网站的优化操作事项，可以配合【排名跟踪】，分析相应优化操作对排名变化的影响，及为后续优化方向提供决策参考。
        </div>
        <AddItem
          className="info"
          {...this.props}
          onAdd={this.onAdd.bind(this)}
        />
        <Dialog ref="dialog" />
        <div className="table-responsive">
          <br />
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{"width":'15%'}}>日期</th>
                <th>事项</th>
                <th style={{"width":'5%'}}/>
              </tr>
            </thead>
            <tbody>{this.renderList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { events: state.events, client: state.client,analysisId:state.keywordState.analysisId };
};
//state表示reducer, combineReducer包含state和dispatch
export default connect(mapStateToProps)(List);

