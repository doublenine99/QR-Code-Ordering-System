import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarsIcon from '@material-ui/icons/Stars';


export default class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: props.categories,
      left: false
    }
  }

  componentWillReceiveProps() {  // activate drawer from app bar
    this.setState({ left: true });
    // console.log("sidebar: receive click from appbar", this.state);
  }
  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ left: open });
  };
  handleSelectCategory(category) {
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
    return (
      <div>
        <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
          {this.sideList()}
        </Drawer>
      </div>
    );
  }
}





