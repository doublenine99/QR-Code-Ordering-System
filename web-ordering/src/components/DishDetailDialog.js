// rendering the dialog for the detail information of each dish
import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
// import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Slider from '@material-ui/core/Slider';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { restaurants } from '../Firebase/firebase'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import firebase from "firebase";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }

});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }

}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

// var dic = new Map();
export default function DishDetailDialog(props) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [amount, setAmount] = useState(1);  // the slider value for chooseing the amount
  const [open, setOpen] = React.useState(false);
  const [addAlert, setAddAlert] = useState(false);

  function handleAddButton(dishRef, tableID) {
    console.log(amount)
    const increment = firebase.firestore.FieldValue.increment(amount);
    console.log(dishRef.name);
    var gt = dishRef.name;
    const st = restaurants.doc(props.restaurant).collection("tables").doc(tableID).collection("cart").doc(gt);
    restaurants.doc(props.restaurant).collection("tables").doc(tableID).collection("cart").doc(gt)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          st.update({ number: increment });
        } else {
          // doc.data() will be undefined in this case
          const fa = dishRef.name;
          restaurants.doc(props.restaurant).collection('tables').doc(tableID).collection('cart').doc(fa)
            .set({
              dishRef,
              number: amount,
            })

        }
        // console.log("aaa");
        setAddAlert(true);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

  }

  useEffect(() => {
    // console.log('get dish', props.dish);
    if (props.open != null) {
      
      setOpen(true);
    }
  }, [props.open])
  const handleClose = () => {
    setOpen(false);
  };
  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 10,
      label: '10',
    },
  ];
  
  function valuetext(value) {
    return `${value}`;
  }
  if (props.dish != null) {
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {props.dish.name}
          </DialogTitle>
          <DialogContent dividers>
            <img
              style={{ width: '350px' }}
              src={
                props.dish.image ? props.dish.image : "https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/koisushiMenu%2Fdefault-food-image.jpg?alt=media&token=e6958bef-eae1-4144-b670-e717768d518f"
              }
              alt={props.dish.name}
            />
            <Typography gutterBottom>
              Choose the amount you want
            </Typography>
           
            <Slider
              defaultValue={1}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-always"
              step={1}
              marks={marks}
              valueLabelDisplay="on"
              min={1}
              max={10}
              onChange={(event, value)=>{
                setAmount(value)
                console.log(amount)
              }}
            />
            <Typography gutterBottom>
              {props.dish.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Box m={2} fontFamily="Monospace" fontStyle="italic" textAlign="left">
              <Typography gutterBottom >${props.dish.price}</Typography></Box>
            <IconButton
              onClick={() => handleAddButton(props.dish, props.table)}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </DialogActions>
        </Dialog>


        <Dialog
          open={addAlert}
          onClose={() => { setAddAlert(false) }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Succesfully add to cart!
                                 </DialogContentText>
          </DialogContent>

        </Dialog>

      </div>
    );
  } else {
    return (
      <div>
      </div>
    )
  }


}
