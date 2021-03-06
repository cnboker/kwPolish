import crossfilter from "crossfilter";
//import  d3 from 'd3'
import React, { Component } from "react";
import { connect } from "react-redux";
//import dc from 'dc'
import axios from "axios";
import moment from "moment";
import { showLoading, hideLoading } from "react-redux-loading-bar";

var d3 = require("d3");
var dc = require("dc");

class History extends Component {
  componentDidMount() {
    var client = this.props.client;
    const { dispatch,analysisId } = this.props;
    if(analysisId === '')return;
    dispatch(showLoading());
    Promise.all([
      axios({
        url: `${process.env.REACT_APP_API_URL}/analysis/${analysisId}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${client.access_token}`
        }
      }),
      axios({
        url: `${process.env.REACT_APP_API_URL}/event/${analysisId}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${client.access_token}`
        }
      })
    ])
      .then(results => {
        dispatch(hideLoading());
        console.log(results);
        this.draw(results);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getKeyword() {
    const { keywords } = this.props;
    if(!keywords || this.props.analysisId === '')return{keyword:''}
    return keywords[this.props.analysisId];
  }

  draw(results) {
    var exp1 = results[0].data,
      exp2 = results[1].data;

    //console.log(x)
    var parseDate = d3.timeFormat("%Y-%B-%d");
    // console.log('test', parseDate(new Date("2018-04-23T06:48:13.362Z")))
    // exp1.data.forEach(function(d) {   d.date = parseDate(new Date(d.createDate));
    // }); exp2.data.forEach(function(d) {   d.date = parseDate(new
    // Date(d.createDate)); });

    var ndx = crossfilter();
    ndx.add(
      exp1.map(function(d) {
        return {
          date: parseDate(new Date(d.createDate)),
          y2: 0,
          y1: +d.dynamicRank
        };
      })
    );

    var ndx1 = crossfilter();

    ndx1.add(
      exp2.map(function(d) {
        return {
          date: parseDate(new Date(d.createDate)),
          y2: 1,
          y1: 0,
          text: d.text
        };
      })
    );
    //确保数据类型和domain里面的数据类型一致

    var dim = ndx.dimension(d => {
      return new Date(d.date);
    });
    var dim1 = ndx1.dimension(d => {
      return new Date(d.date);
    });
    //var grp1 = dim.group().reduceSum(dc.pluck('y1'));

    var grp1 = dim.group().reduce(
      //callback for when data is added to the current filter results
      (p, v) => {
        ++p.count;
        p.total += v.y1;
        return p;
      },
      //callback for when data is removed from the current results
      (p, v) => {
        --p.count;
        p.total -= v.y1;
        return p;
      },
      () => {
        return { count: 0, total: 0 };
      }
    );
    //print_filter(grp1); var grp2 = dim.group().reduceSum(dc.pluck("y2"));
    var grp2 = dim1.group().reduce(
      //callback for when data is added to the current filter results
      (p, v) => {
        console.log("grp2", v);
        ++p.count;
        p.total += v.y2;
        if (v.text) {
          p.text.push(v.text);
        }
        //
        return p;
      },
      //callback for when data is removed from the current results
      (p, v) => {
        --p.count;
        p.total -= v.y2;

        return p;
      },
      () => {
        return { count: 0, total: 0, text: [] };
      }
    );
    //print_filter(grp1);
    //print_filter(grp2);
    //print_filter(grp2);
    var minDate = new Date();
    if(dim.bottom(1)[0]){
      minDate = dim.bottom(1)[0].date;
    }
    
    //var maxDate = dim.top(1)[0].date;
    var maxDate = new Date();
    console.log("hits", minDate, maxDate);
    //var chart = dc.lineChart(that.chart);
    var width = this.chart.offsetWidth;
    var chartx = dc.compositeChart(this.chart);
    
    console.log('dc width', width)
    chartx
      .height(500)
      .width(width)
      .brushOn(false)
      .yAxisLabel("排名位置")
      .x(d3.scaleTime().domain([new Date(minDate), new Date(maxDate)]))
      .y(d3.scaleLinear().domain([120, -5]))
      .margins({ top: 30, right: 50, bottom: 30, left: 50 })
      .renderHorizontalGridLines(true)
      .legend(
        dc
          .legend()
          .x(800)
          .y(10)
          .itemHeight(13)
          .gap(5)
      )
      .shareTitle(false)
      .compose([
        dc
          .bubbleChart(chartx)
          .transitionDuration(1500)
          //.margins({ top: 10, right: 50, bottom: 30, left: 40 })
          .dimension(dim1)
          .group(grp2, "记录")
          .colors(d3.scaleOrdinal(d3.schemeCategory10))
          .keyAccessor(function(p) {
            return p.key;
          })
          .valueAccessor(function(p) {
            return p.value.count;
          })
          .radiusValueAccessor(function(p) {
            return p.value.count;
          })
          .maxBubbleRelativeSize(2)
          .x(d3.scaleLinear())
          .y(d3.scaleLinear().domain([0, 10]))
          .r(d3.scaleLinear().domain([0, 100]))
          .maxBubbleRelativeSize(0.5)
          .renderHorizontalGridLines(true)
          .renderVerticalGridLines(true)
          .renderLabel(true)
          .renderTitle(true)
          .title(function(p) {
            return moment(p.key).format("l") + "\n" + p.value.text.join("\n");
          })
          .label(p => {
            return moment(p.key).format("l");
          }),
        //.xAxis().tickFormat(d3.format('.3s'))
        dc
          .lineChart(chartx)
          .dimension(dim)
          .elasticY(true)
          .group(grp1, "排名")
          //.dashStyle([2, 2])
          .valueAccessor(p => {
            //console.log('p',p)
            return p.value.count > 0
              ? Math.round((p.value.total || 0) / p.value.count, 0)
              : 0;
          })
          .title(p => {
            var rank =
              p.value.count > 0
                ? Math.round((p.value.total || 0) / p.value.count, 0)
                : 0;
            return `时间:${moment(p.key).format("MM-DD")}\n排名:${rank}`;
          })
      ])
      .render();
  }

  render() {
    
    return (
      <div >
        <div className="row">
          <h1 className="mx-auto h-100 justify-content-center text-center">
            排名走势一览图
          </h1>
        </div>
        <div className="row">{`关键词:${this.getKeyword().keyword}`}</div>
        <div className="row">
        <div className="col-md-8">
          <div 
            ref={chart => (this.chart = chart)}
            style={{
              width: "100%"
            }}
          />
          <p>统计时间</p>
        </div>
        <div className="col-md-4">
          <p >
            自然搜索结果中，网页排序变化频繁是搜索引擎生命力活跃的表现。为了更好的提升用户体验价值，搜索引擎有动力并且已经在往个性化内容展示方向上发展，搜索结果会随用户使用习惯、时间、地区及终端设备等个性化因素不同而不同。
          </p>
          <p >
            <span lang="EN-US">&nbsp;</span>
          </p>
          <p >
            影响搜索结果排序的主要因素类别有：用户需求，搜索引擎排序
            <a name="_GoBack"></a>算法，网页内容质量，相似内容竞争及其它。
          </p>
         
          <p >
            排序异常变化，一般可通过以下途径排查问题，网站自身因素（如服务器稳定性问题，网站被挂马，网页内容近期有较大改动，优化操作违规等），搜索引擎因素（如新算法推出，人为干预等），同行竞争因素（排序靠前的同行网站近期有大幅度上升或下降），用户需求变化（如近期有相关热点话题等）。
          </p>
        </div>
        </div>
     
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { keywords: state.keywordState.keywords, client: state.client,analysisId: state.keywordState.analysisId };
};

//state表示reducer, combineReducer包含state和dispatch
export default connect(mapStateToProps)(History);

function print_filter(filter) {
  var f = eval(filter);
  if (typeof f.length != "undefined") {
  } else {
  }
  if (typeof f.top != "undefined") {
    f = f.top(Infinity);
  } else {
  }
  if (typeof f.dimension != "undefined") {
    f = f
      .dimension(function(d) {
        return "";
      })
      .top(Infinity);
  } else {
  }
  console.log(
    filter +
      "(" +
      f.length +
      ") = " +
      JSON.stringify(f)
        .replace("[", "[\n\t")
        .replace(/}\,/g, "},\n\t")
        .replace("]", "\n]")
  );
}
