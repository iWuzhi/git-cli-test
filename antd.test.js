/**
 * Author iWuzhi
 * Date 2019/11/30
 * */
/* eslint-disable */
import React, { useState } from "react";
import { Tree, Input } from "antd";

const { TreeNode } = Tree;
const { Search } = Input;

const menus = [];
for (let i = 0; i < 10; i++) {
  menus.push({
    key: i,
    name: `门-${i + 1}`,
    subMenus: [1, 2, 3].map((item, index) => ({
      key: `${i}-${index}`,
      name: `组-${i}-${index}`
    }))
  });
}

export default class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      searchValue: ''
    }
  }
  onSelect = (selectedKeys) => {
    this.setState({
      selectedKeys
    })
  }
  onChange = (e) => {
    const { value } = e.target;
    this.setState({
      searchValue: value,
    });
  }
  filterTreeNode = (node) => {
    return this.state.searchValue && node.props.title.includes(this.state.searchValue);
  }
  render() {
    const { selectedKeys, searchValue } = this.state;
    return (
      <>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree defaultExpandAll onSelect={this.onSelect} selectedKeys={selectedKeys} filterTreeNode={this.filterTreeNode}>
          <TreeNode title={'全部'} key={'_aa'} />
          {menus.filter((menu) => {
            return !searchValue || menu.name.includes(searchValue) || (menu.subMenus && menu.subMenus.some(subMenu => subMenu.name.includes(searchValue))) ;
          }).map(menu => {
            return (
              <TreeNode title={menu.name} key={menu.key}>
                {menu.subMenus &&
                  menu.subMenus.map(subMenuItem => {
                    return (
                      <TreeNode title={subMenuItem.name} key={subMenuItem.key} />
                    );
                  })}
              </TreeNode>
            );
          })}
        </Tree>
      </>
    );
  }
}
