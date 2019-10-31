import React from 'react';
import TopAppBar from './AppBarComponent';
import OrderDetail from'./OrderDetailDialogue';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper
  },
  gridcontainer: {
    margin: theme.spacing(2, 0, 2)
  },
  paper: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1)
  },
  title: {
    margin: theme.spacing(1, 1, 1),
    textAlign: 'left'
  },
  body: {
    margin: theme.spacing(2, 2, 2),
    textAlign: 'left'
  }
}));

export default function OrderHitstory() {
  const classes = useStyles();

  return (
    <div>
      <TopAppBar />
      <div className={classes.root}>
        <div>
          <Grid container className={classes.gridcontainer}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h6" className={classes.title} color="primary">
                  Table #
                </Typography>
                <Divider variant="middle" />
                <div>
                  <Typography variant="body2" className={classes.body}>
                    Subtotal
                  </Typography>
                  <Typography variant="body2" className={classes.body}>
                    Tax
                  </Typography>
                  <Typography variant="subtitle2" className={classes.body}>
                    Total
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div className={classes.button}>
                <Link to ={`/menu`}>
                  <Button variant="contained" size="small" color="primary" className={classes.button}>
                    ADD MORE ITEMS
                  </Button>
                </Link>
                  <Button variant="contained" size="small" color="primary" className={classes.button}>
                    MAKE A PAYMENT
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <Divider variant="middle" />
        <div>
          <Grid container className={classes.gridcontainer}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h6" className={classes.title} color="primary">
                  Order #
                </Typography>
                <Typography variant="subtitle1" className={classes.title} color="textSecondary">
                  Order Time
                </Typography>
                <Divider variant="middle" />
                <div>
                  <Typography variant="body2" className={classes.body}>
                    Dish #1
                  </Typography>
                  <Typography variant="body2" className={classes.body}>
                    Dish #2
                  </Typography>
                  <Typography variant="body2" className={classes.body}>
                    Dish #3
                  </Typography>
                  <Typography variant="body2" className={classes.body}>
                    ...
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div className={classes.button}>
                  <Button size="small" color="primary" className={classes.button}>
                    VIEW DETAILS
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

