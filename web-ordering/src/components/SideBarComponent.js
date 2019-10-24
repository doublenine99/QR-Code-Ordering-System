import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import ListIcon from '@material-ui/icons/List';
import StarsIcon from '@material-ui/icons/Stars';
import LocalBarIcon from '@material-ui/icons/LocalBar';

// const useStyles = makeStyles({
//   list: {
//     width: 150,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });


// const SideBar = (props) => {

// const classes = useStyles();
// const [state, setState] = React.useState({
//   left: props
// });
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false
    }
  }
  componentWillReceiveProps() {  // activate drawer from app bar
    this.setState({ left: true })
  }
  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ left: open });
  };

  sideList = () => (
    <div
      // className={classes.list}
      role="presentation"
      onClick={this.toggleDrawer(false)}
      onKeyDown={this.toggleDrawer(false)}
    >
      <List>
        {['All', 'Promoted'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <ListIcon /> : <StarsIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Appitizer', 'Boiled'].map((text, index) => (
          <ListItem button key={text}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Milk Tea', 'Fruit Tea', 'Juice'].map((text, index) => (
          <ListItem button key={text}>
            {/* <ListItemIcon>{<LocalBarIcon />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  render() {
    return (
      <div>
        {/* <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button> */}
        <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
          {this.sideList()}
        </Drawer>
      </div>
    );
  }
}


export default SideBar;