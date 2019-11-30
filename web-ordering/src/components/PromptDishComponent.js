import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TopAppBar from './AppBarComponent';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// import CardHeader from '@material-ui/core/CardHeader';
// import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { Box } from '@material-ui/core';
import { restaurants } from '../Firebase/firebase'
import firebase from "firebase";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

  Typography: {
    fontFamily: 'Raleway, Arial',
    fontSize: '3rem',
    fontStyle: 'italic',
    align: "right",
    style: "inline-block"
  }

}));


function filterMenuByCategory(menu) {
  var MenuAfterfiltered = [];
  menu = Array.from(menu);

  for (var dish of menu) {
    for (var category of Array.from(dish.categories)) {
      if (String(category).toLowerCase() === "prompt") {
        MenuAfterfiltered.push(dish);
        break;
      }
    }
  }
  // console.log(MenuAfterfiltered);
  return MenuAfterfiltered;
}

export default function Promotion(props) {
  const classes = useStyles();

  const [expanded0, setExpanded0] = React.useState(false);
  const [expanded1, setExpanded1] = React.useState(false);
  const [addAlert, setAddAlert] = useState(false);
  const handleExpandClick0 = () => {
    setExpanded0(!expanded0);
  }
  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  }
  var promptDish = filterMenuByCategory(props.menu);

  function handleAddButton(dishRef, tableID) {

    const increment = firebase.firestore.FieldValue.increment(1);
    console.log(dishRef.name);
    var gt = dishRef.name;
    const st = restaurants.doc(props.restaurant).collection("tables").doc(tableID).collection("cart").doc(gt);
    restaurants.doc(props.restaurant).collection("tables").doc(tableID).collection("cart").doc(gt)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          st.update({ number: increment })
            .then(setAddAlert(true))
        } else {
          // doc.data() will be undefined in this case
          const fa = dishRef.name;
          restaurants.doc(props.restaurant).collection('tables').doc(tableID).collection('cart').doc(fa)
            .set({
              dishRef,
              number: 1,
            })
            .then(setAddAlert(true))
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

  }
  return (
    <div>
      <TopAppBar restaurant={props.restaurant} table={props.table} />
      <Box m={2} fontFamily="Monospace" fontStyle="italic" textAlign="left" >
        <Typography gutterBottom variant="h5" component='h1'>Today's hot deal</Typography></Box>
      <Card className={classes.card} style={{ margin: 'auto', marginTop: '2vh' }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={promptDish[0] != null ? promptDish[0].image : ""}
            title={promptDish[0] != null ? promptDish[0].id : ""}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="justify">
              {promptDish[0] != null ? promptDish[0].name : ""}
            </Typography>

          </CardContent>

        </CardActionArea>
        <CardActions>
          <IconButton
            onClick={() => handleAddButton(promptDish[0], props.table)}
            className={classes.icon}
          >
            <AddShoppingCartIcon />
          </IconButton>
          <strike align="right">${promptDish[0] != null ? promptDish[0].price : ""}</strike>
          <Typography variant="h6">${promptDish[0] != null ? promptDish[0].newPrice : ""}</Typography>

          <IconButton className={clsx(classes.expand, { [classes.expandOpen]: expanded0 })}
            onClick={handleExpandClick0}
            aria-expanded={expanded0} size="small" color="primary"
            aria-label="Learn More">
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded0} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p" align="left">
              {promptDish[0] != null ? promptDish[0].description : ""}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>




      <Card className={classes.card} style={{ margin: 'auto', marginTop: '2vh' }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={promptDish[1] != null ? promptDish[1].image : ""}
            title={promptDish[1] != null ? promptDish[1].id : ""}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="justify">
              {promptDish[1] != null ? promptDish[1].name : ""}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" align="left">
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton
            onClick={() => handleAddButton(promptDish[1], props.table)}
            // tooltip="Add this food to the cart"
            // aria-label={`info about ${dish.name}`}
            className={classes.icon}
          >
            <AddShoppingCartIcon />
          </IconButton>
          <strike align="right">${promptDish[1] != null ? promptDish[1].price : ""}</strike>
          <Typography variant="h6">${promptDish[1] != null ? promptDish[1].newPrice : ""}</Typography>
          <IconButton className={clsx(classes.expand, {
            [classes.expandOpen]: expanded1,
          })}
            onClick={handleExpandClick1}
            aria-expanded={expanded1} size="small" color="primary"
            aria-label="Learn More">
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded1} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p" align="left">
              {promptDish[1] != null ? promptDish[1].description : ""}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
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
    </div >

  );
}
