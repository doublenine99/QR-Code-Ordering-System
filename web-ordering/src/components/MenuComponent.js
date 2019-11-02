import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
// import { baseUrl } from '../shared/baseUrl';
import TopAppBar from './AppBarComponent';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

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
            dishRef,
            number:1,
        }
        ).then(ref => {
            console.log('Added document with ID: ', ref.id);
        });
}
function filterMenuByCategory(menu, currentCategory) {
    var MenuAfterfiltered = [];
    var menu = Array.from(menu);

    for (var dish of menu) {
        for (var category of Array.from(dish.categories)) {
            if (String(category).toLowerCase() == String(currentCategory).toLowerCase()) {
                MenuAfterfiltered.push(dish)
                break;
            }
        }
    }
    // console.log(MenuAfterfiltered);
    return MenuAfterfiltered;

}

const Menu = (props) => {
    const classes = useStyles();
    const [detailOpen, setDetailOpen] = useState(null);
    const [detailDish, setDetailDish] = useState(null);

    const RenderDishDetail = (dishRef) => {
        setDetailOpen(Math.random());
        setDetailDish(dishRef);
    };

    return (
        <div >
            <TopAppBar />
            <div className={classes.root}>
                <GridList cellHeight={150} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">{props.currentCategory}</ListSubheader>
                    </GridListTile>
                    {filterMenuByCategory(props.menu, props.currentCategory)
                        .map(dish => (
                            <GridListTile key={dish.id}>
                                <img
                                    src={dish.image != null ? dish.image : "https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/koisushiMenu%2Fdefault-food-image.jpg?alt=media&token=e6958bef-eae1-4144-b670-e717768d518f"}
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
                <DishDetailDialog open={detailOpen} dish={detailDish} />
            </div>
        </div>
    );

}

export default Menu;