import React from 'react';
import TopAppBar from './AppBarComponent';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import firebase from "firebase";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { restaurants } from '../Firebase/firebase';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


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

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffbb93',
      main: '#ff8a65',
      dark: '#c75b39',
      contrastText: '#fff',
    },
    secondary: {
      light: '#d3b8ae',
      main: '#a1887f',
      dark: '#725b53',
      contrastText: '#fff',
    },
  },
});


const Cart = (props) => {
  var tablenumber = props.table;
  var testcart = props.cart;
  var bccc;

  const [totalPrice, setTotalPrice] = React.useState(0);
  const [totalPricer, setTotalPricer] = React.useState(0);
  const [finishFilter, setFinishFilter] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  // const [testcart, setCart] = React.useState();
  const [cart, setCart] = React.useState([]);

  // function addItemToCart(e) {
  //   const item = e;
  //   console.log(item);
  //   setCart(cart => [...cart, item]);
  // }
  var overallPrice = 0;
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleClickOpen1 = () => {
    console.log("tablenumber");
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };


  const updatepc = (taxRate) => {
    restaurants.doc(props.restaurant).collection("tables").doc(tablenumber).collection("cart")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          overallPrice = parseFloat(parseFloat(doc.data().dishRef.price) * parseInt(doc.data().number) + parseFloat(overallPrice)).toFixed(2);
        });
        setTotalPrice(overallPrice);
        setTotalPricer((overallPrice * (1 + taxRate)).toFixed(2));
        bccc = String(overallPrice);
      })

    restaurants.doc(props.restaurant).collection("tables").doc(props.table).collection("cart")
      .onSnapshot(snapshot => {
        testcart = snapshot.docs.map(doc => doc.data());
        console.log("update date!")
      });
  }


  restaurants.doc(props.restaurant).collection("tables").doc(tablenumber).collection("cart")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var nn = doc.id;
        restaurants.doc(props.restaurant).collection("tables").doc(tablenumber).collection("cart").doc(doc.id).update({ ID: nn });
      });
      setFinishFilter(true);
    })


  updatepc(props.tax);

  const handleAdd = (newnum, idid) => {
    // idid = Object.prototype.toString.call(idid) ;
    updatepc(props.tax);
    // addItemToCart();
    console.log(typeof (idid));
    console.log(String(idid));
    if (idid == null) {
      return;
    }
    const increment = firebase.firestore.FieldValue.increment(1);
    const st = restaurants.doc(props.restaurant).collection("tables").doc(tablenumber).collection("cart").doc(idid);
    st.update({ number: increment });

  }

  const handleMin = (newnum, idid) => {
    updatepc(props.tax);
    console.log(idid);
    if (idid == null) {
      return;
    }
    // addItemToCart();

    const dec = firebase.firestore.FieldValue.increment(-1);
    const st = restaurants.doc(props.restaurant).collection("tables").doc(tablenumber).collection("cart").doc(idid);
    st.update({ number: dec });
    if (newnum === 1) {
      restaurants.doc(props.restaurant).collection("tables").doc(tablenumber).collection("cart").doc(idid).delete();
    }
    updatepc(props.tax);
    // addItemToCart();

  }

  const handleOrder = (vv) => {
    const fa = String(Math.random());
    handleClose();
    console.log(tablenumber);
    restaurants.doc(props.restaurant).collection("tables").doc(tablenumber).collection("orders").doc(fa).set({});
    restaurants.doc(props.restaurant).collection("tables").doc(tablenumber).update({ "status": "NEEDTO_SERVE" });
    vv.forEach(function (doc) {
      restaurants.doc(props.restaurant).collection("tables").doc(tablenumber).collection("orders").doc(fa).update({
        dishes: firebase.firestore.FieldValue.arrayUnion({
          name: doc.dishRef.name,
          price: doc.dishRef.price,
          quantity: doc.number,
        }),
        subtotal: totalPrice,

        ordertime: firebase.firestore.FieldValue.serverTimestamp(),
        finished: false,
      });
    });
    handleClear(vv);
  };


  const handleClear = (vv) => {
    handleClose1();
    vv.forEach(function (doc) {
      console.log(tablenumber);
      console.log(doc.ID);
      restaurants.doc(props.restaurant).collection("tables").doc(tablenumber).collection("cart").doc(doc.ID).delete();
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <TopAppBar restaurant={props.restaurant} table={props.table} />
        {Array.from(testcart).map(dish => (
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item className={classes.woyaoheng}>
                <img
                  width={120}
                  height={120}
                  src={dish.dishRef.image  ? dish.dishRef.image : "https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/koisushiMenu%2Fdefault-food-image.jpg?alt=media&token=4d5719ce-bbc1-4458-973b-0b4cc43740d0"}
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
                      <ListItemText primary={"Price:" + "   $" + dish.dishRef.price} />
                    </ListItem>

                    <div>
                      <ButtonGroup color="primary" size="medium" aria-label="small outlined button group">
                        <IconButton
                          //  onClick={() => addItemToCart()}
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
              <ListItemText primary="Before tax" secondary={"$" + totalPrice} />
            </ListItem>
            {/* <ListItem>
              <ListItemText primary="After tax" secondary={"$" + totalPricer} />
            </ListItem> */}
          </List>
        </div>
        <div>

          <div className={classes.root}>
            <ButtonGroup color="primary" >
              <Button
                onClick={handleClickOpen}
              > Place Order</Button>
              <Button
                onClick={handleClickOpen1}
              >Clear all the dishes</Button>
            </ButtonGroup>

            <Link to={'/' + props.restaurant + '/' + props.table + '/orderHistory'}>
                <Button>check Ordered dishes</Button>
              </Link>
          </div>
        </div>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm this order?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleOrder(testcart)} color="primary" autoFocus>
                Confirm
          </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                No
          </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog
            open={open1}
            onClose1={handleClose1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure to delete all the dishes?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClear(testcart)} color="primary" autoFocus>
                Confirm
          </Button>
              <Button onClick={handleClose1} color="primary" autoFocus>
                No
          </Button>
            </DialogActions>
          </Dialog>
        </div>


      </div>
    </ThemeProvider>

  );
}

export default Cart;