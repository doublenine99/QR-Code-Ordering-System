import React, { useEffect, useState } from 'react';
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
import firebase from "firebase";
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { Dialog } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { koiSushiMenu, koiSushiRestaurant, koiSushiCart } from '../Firebase/firebase';



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



var bccc;

const Cart = (props) => {

  var overallPrice = 0;

  var oldnumber;
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [totalPricer, setTotalPricer] = React.useState(0);
  const [finishFilter, setFinishFilter] = React.useState(false);

  const updatepc = () => {
    const prin = koiSushiRestaurant.collection("tables").doc("t0").collection("cart")
      .get()
      .then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {
          //  console.log(parseInt(doc.data().dishRef.price) * parseInt(doc.data().number));
          overallPrice = parseInt(doc.data().dishRef.price) * parseInt(doc.data().number) + overallPrice;


        });
        setTotalPrice(overallPrice);
        setTotalPricer(overallPrice * 1.05);
        bccc = String(overallPrice);
      })
    // console.log(overallPrice);
  }


  koiSushiRestaurant.collection("tables").doc("t0").collection("cart")
    .get()
    .then(function (querySnapshot) {

      var qiangbimingdan = new Set();
      var dic = new Map();

      querySnapshot.forEach(function (doc) {

        var nn = doc.id;

        koiSushiRestaurant.collection("tables").doc("t0").collection("cart").doc(doc.id).update({ ID: nn });

        if (dic.has(doc.data().dishRef.id.path)) {
          qiangbimingdan.add(doc.data().ID);
          var right = dic.get(doc.data().dishRef.id.path);


          // console.log(right);
          if (right != null) {
            koiSushiRestaurant.collection("tables").doc("t0").collection("cart").doc(right).get().then(function (dddoc) {
              oldnumber = dddoc.data().number;
              console.log("dddd!" + oldnumber);
              handleAdd(parseInt(oldnumber), right);
            })
          }
        } else {
          dic.set(doc.data().dishRef.id.path, doc.data().ID);
          // console.log("put!");
        }
        qiangbimingdan.forEach(function (kkk) {
          if (kkk != null) {
            koiSushiRestaurant.collection("tables").doc("t0").collection("cart").doc(kkk).delete();
          }

        })
      });
      setFinishFilter(true);
    })
  updatepc();




  const handleAdd = (newnum, idid) => {
    koiSushiRestaurant.collection("tables").doc("t0").collection("cart").doc(idid).update({ number: newnum + 1 });
    updatepc();
  }

  const handleMin = (newnum, idid) => {
    if (newnum > 1) {
      koiSushiRestaurant.collection("tables").doc("t0").collection("cart").doc(idid).update({ number: newnum - 1 });
    } else {
      koiSushiRestaurant.collection("tables").doc("t0").collection("cart").doc(idid).delete();
    }
    updatepc();

  }
  var finma;

 


  const handleOrder = (vv) => {



        const fa = String(Math.random());
        // const fa = "haha";
        koiSushiRestaurant.collection("tables").doc("t0").collection("orders").doc(fa).set({});
        vv.forEach(function (doc) {
          var dishnum = doc.ID;
          koiSushiRestaurant.collection("tables").doc("t0").collection("orders").doc(fa).update({
    
            dishes: firebase.firestore.FieldValue.arrayUnion({
              name: doc.dishRef.name,
              price: doc.dishRef.price,
              quantity: doc.number,
    //           dishid: doc.dishRef.id,
            }),
    
            subtotal: totalPrice,
            taxrate: 0.05,
            ordertime: firebase.firestore.FieldValue.serverTimestamp(),
    
          });
    
        });
    
    
      };




  const handleClear = (vv) => {
    // koiSushiRestaurant.collection("tables").doc("t01").collection("orders").doc("neworder").set({haha:1});
    vv.forEach(function (doc) {
      console.log(doc.ID);
      koiSushiRestaurant.collection("tables").doc("t0").collection("cart").doc(doc.ID).delete();

    });


  };











  if (!finishFilter) {
    return (
      <div>
        Loading
    </div>
    )
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
                    <ListItemText primary={"Number:" + "   " + parseInt(dish.number)} />
                  </ListItem>

                  <ListItem className={classes.hoho}>
                    <ListItemText primary={"Price:" + "   " + dish.dishRef.price} />
                  </ListItem>

                  <div>
                    <ButtonGroup color="primary" size="medium" aria-label="small outlined button group">
                      <IconButton
                        onClick={() => handleAdd(parseInt(dish.number), dish.ID)}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleMin(parseInt(dish.number), dish.ID)}
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



      <div>
        <List className={classes.root}>
          <ListItem >

            <ListItemText primary="Before tax" secondary={totalPrice} />
          </ListItem>


          <ListItem>
            <ListItemText primary="After tax" secondary={totalPricer} />
          </ListItem>


        </List>

      </div>

      <div>

        <div>
          <ButtonGroup color="primary" size="large" aria-label="small outlined button group">
            <Button
              onClick={() => handleOrder(props.cart)}
            > Confirm</Button>
            <Button
              onClick={() => handleClear(props.cart)}
            >Clear</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>



  );
}

export default Cart;