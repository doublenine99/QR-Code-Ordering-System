import React from 'react';
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
import Button from '@material-ui/core/Button';


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


function handleAddButton(dishName) {
    //TODO: onclick does not work
    console.log(dishName);
}

// function RenderMenuItem({ dish, onClick }) {
//     //TODO: 
//     return (
//         <Card key={dish.id}>
//             {/* <Link to={`/menu/${dish.id}`}> */}
//             {/* <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} /> */}
//             <CardImgOverlay>
//                 <CardTitle>{dish.name}</CardTitle>
//             </CardImgOverlay>
//             {/* </Link> */}
//         </Card>

//     );
// }

const Menu = (props) => {
    
    const classes = useStyles();

    // console.log("props in MenuComponent is " + JSON.stringify(props));
    // const RenderMenu = Array.from(props.menu).map((dish) => {
    //     return (
    //         <RenderMenuItem dish={dish} />
    //     );
    // });


    const renderAddButton = (dish) => {
        return (
            <IconButton
                // onClick={handleAddButton(dish.name)}
                tooltip="Add this food to the cart"
                aria-label={`info about ${dish.name}`}
                className={classes.icon}
            >
                <AddShoppingCartIcon />
            </IconButton>
        )
    }


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
                            // onClick={}
                            />
                            <GridListTileBar
                                title={dish.name}
                                subtitle={<span>${dish.price}</span>}

                                actionIcon={
                                  renderAddButton(dish)
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            {/* <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">TODO: Current Category</ListSubheader>
                    </GridListTile>
                    {tileData.map(tile => (
                        <GridListTile key={tile.img}>
                            <img
                                src={tile.img}
                                alt={tile.title}
                            // onClick={console.log("aaa")}
                            />
                            <GridListTileBar
                                title={tile.title}
                                subtitle={<span>by: {tile.author}</span>}
                                actionIcon={
                                    <IconButton
                                        aria-label={`info about ${tile.title}`}
                                        className={classes.icon}
                                    // onClick={console.log("aaa")}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div> */}
        </div>
    );

}

export default Menu;