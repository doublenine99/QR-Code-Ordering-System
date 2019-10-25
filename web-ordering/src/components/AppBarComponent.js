import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HistoryIcon from '@material-ui/icons/History';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import MoreIcon from '@material-ui/icons/MoreVert';

import Sidebar from './SideBarComponent';


const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    }
}));

const TopAppBar = () => {
    const classes = useStyles();

    const [SideBarOpen, setSideBarState] = React.useState(null);
    const handleSideBarOpen = () => {
        setSideBarState(!SideBarOpen);
    }
    const renderSideBar = (
        <Sidebar SideBarOpen={true} />
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={handleSideBarOpen}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Material-UI
                     </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <IconButton aria-label="Call Assistance" color="inherit">
                        <Badge badgeContent={0} color="secondary">
                            <EmojiPeopleIcon />
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="Order History" color="inherit">
                        <Badge badgeContent={0} color="secondary">
                            <HistoryIcon />
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="Cart" color="inherit">
                        <Badge badgeContent={1} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                </Toolbar>
            </AppBar>
            {renderSideBar}
        </div>
    );
}
export default TopAppBar;