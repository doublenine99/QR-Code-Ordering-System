import React, { useEffect } from 'react';
import TopAppBar from './AppBarComponent';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from '@material-ui/core/ListSubheader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

// import moment from 'moment';

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
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  table: {
    maxWidth: 360,
  },
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogTitle>
      <Typography variant="h6" align='center'>{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function OrderHistory(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [scroll, setScroll] = React.useState('paper');
  const orders = Array.from(props.orders);

  function subtotal(orders) {
    var subtotal = 0;

    for (var order of orders) {
      var dishes = Array.from(order.dishes);
      for (var dish of dishes) {
        var quantity = dish.quantity;
        var price = dish.price;
        subtotal += quantity * price;
      }
    }
    return subtotal;
  };

  const invoiceSubtotal = subtotal(orders);
  const invoiceTaxes = 0.05 * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  useEffect(() => {
    if (props!=null &&props.orders[0] != null){
      // console.log('get order', props.orders);
    }
    
    if (props.open != null) {
      setOpen(true);
    }
  }, [props.open])

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // console.log("bbb",props.orders[]);
  return (
    
    <div>
      <TopAppBar />
      <div className={classes.root}>
        <div>
          <Grid container className={classes.gridcontainer}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <Typography variant="h6" className={classes.title} color="primary">
                  Table #
                  </Typography>
                <Divider variant="middle" /> */}
                <Typography variant="body2" className={classes.body}>
                  Subtotal {invoiceSubtotal}
                  </Typography>
                <Typography variant="body2" className={classes.body}>
                  Tax {invoiceTaxes}
                  </Typography>
                <Typography variant="subtitle2" className={classes.body}>
                  Total {invoiceTotal}
                  </Typography>
                <Divider variant="middle" />
                <div className={classes.button}>
                  <Link to={`/menu`}>
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
                {/* <Typography variant="h6" className={classes.title} color="primary">
                  Order #
                  </Typography>
                <Typography variant="subtitle2" className={classes.title} color="textSecondary">
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
                </div> */}
                <List className={classes.list} subheader={<li />}>
                  {Array.from(props.orders).map(order => (
                    <li key={`order-${order}`} className={classes.listSection}>
                      <ul className={classes.ul}>
                        {/* <ListSubheader>{moment(order.ordertime.toDate()).calendar()}</ListSubheader> */}
                        {Array.from(order.dishes).map(dish => (
                          <Table className={classes.table} aria-label="spanning table">
                            <TableBody>
                              <TableRow key={`dish-${dish.name}`}>
                                <TableCell>{dish.name}</TableCell>
                                <TableCell align="right">{dish.quantity}</TableCell>
                                <TableCell align="right">{`$${dish.price}`}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        ))}
                      </ul>
                    </li>
                  ))}
                </List>
                {/* <Divider variant="middle" />
                <div className={classes.button}>
                  <Button size="small" color="primary" className={classes.button} onClick={handleClickOpen('paper')}>
                    VIEW DETAILS
                    </Button>
                  <Dialog fullScreen={fullScreen} scroll={scroll} aria-labelledby="dialog-title" open={open}>
                    <DialogTitle id="dialog-title">
                      ORDER DETAILS
                      </DialogTitle>
                    <DialogContent dividers>
                      <Typography variant="body2">
                        Dish #1
                        </Typography>
                      <Divider />
                      <Typography variant="body2">
                        Dish #2
                        </Typography>
                      <Divider />
                      <Typography variant="body2">
                        Dish #3
                        </Typography>
                      <Divider />
                      <Typography variant="body2">
                        Dish #4
                        </Typography>
                      <Divider />
                      <Typography variant="body2">
                        Dish #5
                        </Typography>
                    </DialogContent>
                    <Button autoFocus size="large" color="primary" onClick={handleClose}>
                      CLOSE
                      </Button>
                  </Dialog>
                </div> */}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

