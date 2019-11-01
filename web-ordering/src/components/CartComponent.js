import React, {useEffect, useState} from 'react';
import TopAppBar from './AppBarComponent';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { Dialog } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  foot: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: '100%',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1),
  },
  hoho: {
    margin: `${theme.spacing(0)}px auto`,
    padding: theme.spacing(0),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  goot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
  woyaoheng: {
    direction: 'column',
  }
}));







const Cart = (props) => {

  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  const [num, setPrice] = React.useState(parseInt(1));


  useEffect(() => {

  });



  const handleAdd = (number)=> {
    
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" );
    const nn = number+1;
    console.log(num);
    setPrice(nn);
  }
  
  return (
    <div>
      <TopAppBar />

      {Array.from(props.cart).map(dish => (
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item className={classes.woyaoheng}>

              <img
                width={120}
                height={120}
                src={dish.dishRef.image}
                alt={dish.dishRef.name}
              />

            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography noWrap>{dish.dishRef.name}</Typography>
              <Grid container   >
                <div className={classes.container} >


                <ListItem className={classes.hoho}>
                  <ListItemText primary= {"Number:" +"   "+parseInt(dish.dishRef.number)} />
                </ListItem>

                <ListItem  className={classes.hoho}>
                  <ListItemText primary= {"Price:" +"   "+dish.dishRef.price} />
                </ListItem>

                  <div>
                    <ButtonGroup color="primary" size="medium" aria-label="small outlined button group">
                      <IconButton 
                       onClick={() => handleAdd(parseInt(dish.dishRef.number))}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton 
                      // onClick={() => handleAdd(dish.price)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </ButtonGroup>
                  </div>
                </div>

              </Grid>
            </Grid>

          </Grid>
        </Paper>



      ))}

      {/* <div>
      <Paper className={classes.root}>
        <Typography component="p">
          before tax: 4$
        </Typography>
      </Paper>
      <Divider />
    </div>

    <div>
      <Paper className={classes.root}>
        <Typography component="p">
          after tax: 5$
        </Typography>
      </Paper>
    </div> */}


      <div>
        <List className={classes.root}>
          <ListItem >
            <ListItemText primary="Before tax" secondary="100$" />
          </ListItem>


          <ListItem>
            <ListItemText primary="After tax" secondary="105$" />
          </ListItem>
          

        </List>

      </div>

      <div>
        {/* <BottomNavigation
          value={value}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="Clear" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Order" icon={<FavoriteIcon />} />
        </BottomNavigation> */}
        <div>
                    <ButtonGroup color="primary" size="large" aria-label="small outlined button group">
                      <Button> Confirm</Button>
                      <Button>Clear</Button>
                    </ButtonGroup>
                  </div>
      </div>
    </div>



  );
}

export default Cart;