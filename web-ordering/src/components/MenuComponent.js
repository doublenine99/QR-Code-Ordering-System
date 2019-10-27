import React, { useState } from 'react';
// import {
//     Card, CardImgOverlay, Breadcrumb, BreadcrumbItem, CardTitle
// } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import { baseUrl } from '../shared/baseUrl';
import TopAppBar from './AppBarComponent';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';

import DishDetailDialog from './DishDetailDialog';
import { koiSushiRestaurant } from '../Firebase/firebase'


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
}));

function handleAddButton(dishRef) {
    koiSushiRestaurant.collection('tables').doc('t0').collection('cart')
        .add({
            dishRef
        }
        ).then(ref => {
            console.log('Added document with ID: ', ref.id);
        });
}

const Menu = (props) => {
    const classes = useStyles();
    const [detailOpen, setDetailOpen] = useState(null);

    const RenderDishDetail = (dishRef) => {
        setDetailOpen(Math.random());
        // console.log(detailOpen)
        // DishDetailOpen = true;
        // return <DishDetailDialog dish={dishRef} />
    }

    // console.log("props in MenuComponent is " + JSON.stringify(props));
    // const RenderMenu = Array.from(props.menu).map((dish) => {
    //     return (
    //         <RenderMenuItem dish={dish} />
    //     );
    // });

    return (
        <div >
            <TopAppBar />
            <div className={classes.root}>
                <GridList cellHeight={150} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">TODO: Current Category</ListSubheader>
                    </GridListTile>
                    {Array.from(props.menu).map(dish => (
                        <GridListTile key={dish.id}>
                            <img
                                src={dish.image}
                                alt={dish.name}
                                onClick={() => RenderDishDetail(dish)}
                            />
                            <GridListTileBar
                                title={dish.name}
                                subtitle={<span>${dish.price}</span>}
                                actionIcon={
                                    <IconButton
                                        onClick={() => handleAddButton(dish)}
                                        aria-label={`info about ${dish.name}`}
                                        className={classes.icon}
                                    >
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
                <DishDetailDialog open={detailOpen} />
            </div>
        </div>
    );

}

export default Menu;