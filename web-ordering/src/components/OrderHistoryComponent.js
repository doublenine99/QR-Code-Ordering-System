import React from 'react';
import TopAppBar from './AppBarComponent';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import List from "@material-ui/core/List";
import ListSubheader from '@material-ui/core/ListSubheader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import moment from 'moment';

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
    textAlign: 'center'
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

export default function OrderHistory(props) {
  const classes = useStyles();
  const orders = Array.from(props.orders);
  const unfinishedOrders = orders.filter(order => order.finished == false);

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

  const invoiceSubtotal = subtotal(unfinishedOrders);
  const invoiceTaxes = 0.05 * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <div>
      <TopAppBar table={props.table} />
      <div className={classes.root}>
        <div>
          <Grid container className={classes.gridcontainer}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="body2" className={classes.body}>
                  Subtotal: ${invoiceSubtotal}
                  </Typography>
                <Typography variant="body2" className={classes.body}>
                  Tax: ${invoiceTaxes}
                  </Typography>
                <Typography variant="body2" className={classes.body}>
                  Total: ${invoiceTotal}
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
                {/* {unfinishedOrders.length == 0 ?
                <Typography color="textSecondary" variant="body2" className={classes.title}>
                  No History
                </Typography>
                : null
                } */}
                <List className={classes.list} subheader={<li />}>
                  {Array.from(unfinishedOrders).map(order => (
                    <li key={`order-${order}`} className={classes.listSection}>
                      <ul className={classes.ul}>
                        <ListSubheader>{moment(order.ordertime.toDate()).calendar()}</ListSubheader>
                          {Array.from(order.dishes).map(dish => (
                            <Table className={classes.table} aria-label="spanning table">
                              <TableBody>
                                <TableRow key={`dish-${dish.name}`}>
                                  <TableCell width={100}>{dish.name}</TableCell>
                                  <TableCell width={50} align="right">{`${dish.quantity} ×`}</TableCell>
                                  <TableCell align="right">{`$${dish.price}`}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          ))}
                      </ul>
                    </li>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
          
      </div>
    </div>
  );
}