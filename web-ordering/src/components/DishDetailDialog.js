// rendering the dialog for the detail information of each dish
import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
// import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { koiSushiRestaurant } from '../Firebase/firebase'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

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



export default function DishDetailDialog(props) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(false);
  const [addAlert, setAddAlert] = useState(false);
  
  function handleAddButton(dishRef, table) {
    koiSushiRestaurant.collection('tables').doc(table).collection('cart')
      .add({
        dishRef,
        number: 1
      }
      ).then(ref => {
        console.log('Added document with ID: ', ref.id);
        setAddAlert(true);
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
                props.dish.image != null ? props.dish.image : "https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/koisushiMenu%2Fdefault-food-image.jpg?alt=media&token=e6958bef-eae1-4144-b670-e717768d518f"
              }
              alt={props.dish.name}
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
        <div>
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
      </div>
    );
  } else {
    return (
      <div>
      </div>
    )
  }


}
