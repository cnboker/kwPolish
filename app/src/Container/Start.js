import React, { Component } from "react";
import image1 from "../../public/images/1.png";

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
              <h2>如何提交关键词?</h2>
            </div>

            <p className="lead">
              1. 安装并启动软件
              <br />
              2. 登录软件后，点击“新建”就可以提交关键词了
              <img src={image1} className="img-fluid" />
              <dl>
                <dt>备注</dt>
                <dd>
                  正常情况下，关键词提交后，保持软件运行状态，两分钟内会出现起始排名数据
                </dd>
                <dt>情况1</dt>
                <dd>
                  起始排名在100以内，这时，只须保持软件处在挂机状态即可，系统会自动安排执行优化工作
                </dd>
                <dt>情况2</dt>
                <dd>
                  起始排名数据显示100+，这时，你要专门解决，具体方法 见下方。
                </dd>
                <dt>情况3</dt>
                <dd>
                  起始排名数据始终为0，没有变化，此时说明系统检测工作没有正常启动。一般关掉软件，再重新启动就会恢复正常。如果仍没有显示数据，请联系售后人员解决。
                </dd>
              </dl>
            </p>
            <div className="page-header">
              <h2>起始排名始终不出现数据怎么办？</h2>
            </div>
            <p className="lead">
              在正常情况下，提交关键词后，两分钟内会出现起始排名的数据。
              <br />
              如果等待很长时间，还没有出现关键词的起始排名数据，则可能是软件未生效。你可以尝试关掉软件，然后重新再打开
              <br />
              如果重启后，仍旧不能出现起始排名数据。请尝试关掉360系列软件，再次尝试或联系售后人员进行故障排查。
              <br />
              小知识：搜索引擎如百度，每页约10个页面，页面出现在10页以后也是排名在100以上的网页默认质量相对较低。
              系统的默认规则是，起始排名在100+以上，就不再执行优化工作。此时，你应该修改关键词，以保障关键词对应的排名在100以内。
            </p>
            <div className="page-header">
              <h2>如果提交的关键词起始排名100+怎么办？</h2>
            </div>

            <div className="lead">
              <p>
                基本思路：先做相关的长尾关键词，以保障提交的关键词排名在100以内，系统自动执行优化。长尾关键词优化一段时间，对应的核心关键词也会自动往前提升排名，直到排名进入100以内，再进行优化这个主关键词。
              </p>
              <dl>
                <dt>解决方法1</dt>
                <dd>
                  直接在输入关键词和域名这样作为组合关键词使用，这样在搜索里就可以排名靠前了。这样优化处理一段时后，原关键词的对应排名就会往前排。如果进入100以内，就可以按常规操作方法优化处理。
                  <br />
                  收录较少的新网站，可采取这种套路，快速增进收录。
                </dd>
              </dl>
              <dl>
                <dt>解决方法2</dt>
                <dd>
                  可以根据这个关键词，先做对应的长尾词，使用多个长尾词进行优化，把主关键词的排名推上来。相关长尾词的排名提升的同时，主关键词的排名也会自动往上提升。等核心关键词的排名进入100内，就可以常规操作了。
                </dd>
              </dl>
            </div>
          </div>
          <div className="card-footer" />
        </div>
      </div>
    );
  }
}
