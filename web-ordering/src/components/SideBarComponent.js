import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarsIcon from '@material-ui/icons/Stars';
import { Redirect } from 'react-router-dom';

export default class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: props.categories,
      left: false,
      selectPromotions: false,
    }
  }

  componentWillReceiveProps(nextProps) {  // activate drawer from app bar
    if (nextProps.SideBarOpen) {
      this.setState({ left: true });
    }
    // console.log("sidebar: receive click from appbar", this.props.SideBarOpen);
  }
  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ left: open });
  };
  handleSelectCategory(category) {
    // link to promotions
    if (String(category).toLowerCase() == 'prompt') {
      this.setState({ selectPromotions: true });
      return;
    };

    this.props.getCurrentCategoryFromSidebar(category);
  }

  sideList = () => (
    <div
      role="presentation"
      onClick={this.toggleDrawer(false)}
      onKeyDown={this.toggleDrawer(false)}
    >
      <Divider />
      <List>
        {Array.from(this.state.categories).map((category) => (
          <ListItem button key={category} onClick={() => this.handleSelectCategory(category)}>
            <Divider />
            <ListItemIcon>{<StarsIcon />}</ListItemIcon>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  render() {
    if (this.state.selectPromotions == true) {
      return <Redirect to="/promotions" />
    }
    // back to menu page first if click sidebar on other page
    if (window.location.pathname !== "/menu" && this.state.left != false) {
      return <Redirect to="/menu" />
    }
    return (
      <div>
        <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
          {this.sideList()}
        </Drawer>
      </div>
    );
  }
}


