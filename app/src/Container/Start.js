import React, { Component } from "react";

export default class Start extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var imageRoot = require("path").resolve() + "/app";
    return (
      <div className="row">
        <div className="card">
          <div className="card-body">
            <div className="page-header">
              <h2>如何使用?</h2>
            </div>

            <p className="lead">
              登录软件后，在“排名检测”界面，点击右上方的 “新建”
              ，提交关键词和对应的网址就可以。提交后，保持软件处在挂机状态，系统会自动运行优化工作
              <br /><br/>
              特别说明：
              <br />
              搜索引擎如百度，每页约10个页面，页面出现在10页以后也是排名在100以上的网页默认质量相对较低。当前系统的默认规则是，只针对初始排名在120名以内的关键词进行优化。
              <dl>
                <dt>情况1</dt>
                <dd>
                  正常情况下，关键词提交后，保持软件运行状态，两分钟内会出现初始排名数据。初始排名数据在120以内，这时，只须保持软件处在挂机状态即可，系统会自动安排执行优化工作。将软件最小化后台挂机即可，不影响使用电脑。
                </dd>
                <dt>情况2</dt>
                <dd>
                  初始排名数据长时间为0，没有变化，此时说明系统检测工作没有正常启动。一般关掉软件，再重新启动就会恢复正常。如果你电脑上装有360系列软件，请退出后再尝试。一般就可以正常使用。如果仍没有显示数据，请联系售后人员解决。
                </dd>
                <dt>情况3</dt>
                <dd>
                  如果初始排名数据显示为120+，这时状态显示停止怎么办？<br/>
                  <br />
                  基本思路：
                  <br />
                  先做相关的长尾关键词，以保障提交的关键词初始排名在120以内，系统能够执行优化。长尾关键词优化一段时间，对应的主关键词也会自动往前提升排名，直到排名进入120以内，再专门进行优化这个主关键词。
                  <br /><br/>
                  解决方法1 <br />
                  直接输入关键词和域名这样作为组合关键词使用，这样在搜索里就可以确保排名靠前。优化处理一段时后，关键词的对应排名就会往前排。如果进入120以内，就可以按常规操作方法优化处理。
                  *收录较少的新网站，可采取这种方式，快速增进收录。 <br/><br/>
                  解决方法2 <br/>
                  可以根据这个关键词，先做对应的长尾词，使用多个长尾词进行优化。相关长尾词的排名提升的同时，主关键词的排名也会自动往上提升。等主关键词的排名进入120内，就可以按常规方式操作了。
                </dd>
              </dl>
            </p>
          </div>
        
        </div>
      </div>
    );
  }
}
