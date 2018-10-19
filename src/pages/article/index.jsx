import React from "react";
import "./index.less";
import MyCard from "./container/myCard";
import api from "@/lib/api";
import getPage from "@/lib/getPage";
import { Pagination } from "antd";
import history from "@/router/history";
const { article } = api;
class Article extends React.Component {
  state = {
    indexList: [],
    allCount: 0
  };
  componentWillMount() {
    this.page = getPage();
    this.loadData(10);
  }
  loadData = (pageSize = 10) => {
    this.$axios({
      url: article,
      method: "get",
      params: {
        page: this.page,
        pageSize
      }
    }).then(res => {
       ;
      this.setState({
        indexList: res.data.data,
        allCount: res.data.count
      });
    });
  };

  onChange = (page, pageSize) => {
    document.scrollingElement.scrollTop = 0;
    history.push(`/admin/article/?page=${page}`);
    this.page = getPage();
    this.loadData(pageSize);
  };
  render() {
    return (
      <div className="home">
        <div className="lists">
          {this.state.indexList.map((item, index) => (
            <MyCard list={item} key={index} onLoadData={this.loadData} />
          ))}
        </div>
        <div className="footer">
          <Pagination
            defaultCurrent={parseInt(this.page, 10)}
            total={this.state.allCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default Article;
