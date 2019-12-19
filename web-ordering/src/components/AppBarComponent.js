import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HistoryIcon from '@material-ui/icons/History';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Sidebar from './SideBarComponent';
import { connect } from 'react-redux';
import { fetchCategories, updateCategory } from '../redux/ActionCreators';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// import { koiSushiRestaurant } from '../Firebase/firebase'
import { restaurants } from '../Firebase/firebase'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';



const mapStateToProps = (state) => {
    return {
        // categories: state.categories,
    }
}
const mapDispatchToProps = dispatch => ({
    // fetchCategories: () => dispatch(fetchCategories()),
    updateCategory: (category) => dispatch(updateCategory(category))
});



var redirectFlag = false;  // flag to indicate redirecting after enter search bar


export const TopAppBar = (props) => {
    const classes = useStyles();
    const [searchWord, setSearchWord] = React.useState("");
    const [SideBarOpen, setSideBarState] = React.useState(null);
    const [assistAlert, setAssistAlert] = React.useState(false);

    // console.log("appbar render");
    const handleSideBarOpen = () => {
        setSideBarState(Math.random());
    }
    const handleAssistant = () => {
        if (props.table != null) {
            restaurants.doc(props.restaurant).collection('tables').doc(props.table)
                .update({ status: "NEEDTO_ASSIST" })
                .then(console.log("set the assistance flag of", props.table, "to true"))
                .then(setAssistAlert(true))
        }
    }

    const getCurrentCategoryFromSidebar = (selectedCategory) => {
        props.updateCategory(selectedCategory);
    }

    const getCurrentSearchResultFromSidebar = (searchWord) => {
        // console.log("type enter")
        if (!redirectFlag) {
            redirectFlag = true;
        }

        // setSearchWord(null);
        props.updateCategory("#" + searchWord);
    }
    const handleUserInput = (input) => {
        setSideBarState(null);
        setSearchWord(input);
    }

    const renderAppBar =

        <ThemeProvider theme={theme}>
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={() => handleSideBarOpen()}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>

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
                                value={searchWord}
                                inputProps={{ 'aria-label': 'search' }}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        getCurrentSearchResultFromSidebar(event.target.value)
                                    }
                                }}
                                onChange={event => handleUserInput(event.target.value)}
                            />
                        </div>
                        <div className={classes.grow} />
                        <IconButton
                            onClick={handleAssistant}
                            aria-label="Call Assistance"
                            color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <EmojiPeopleIcon />
                            </Badge>
                        </IconButton>

                        <Link style={{ textDecoration: 'none', color: 'white' }} to={'/' + props.restaurant + '/' + props.table + '/orderHistory'}>
                            <IconButton aria-label="Order History" color="inherit">
                                <Badge badgeContent={0} color="secondary">
                                    <HistoryIcon />
                                </Badge>
                            </IconButton>
                        </Link>

                        <Link style={{ textDecoration: 'none', color: 'white' }} to={'/' + props.restaurant + '/' + props.table + '/cart'}>
                            <IconButton aria-label="Cart" color="inherit">
                                <Badge badgeContent={0} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Link>

                    </Toolbar>
                    <div>
                        <Dialog
                            open={assistAlert}
                            onClose={() => { setAssistAlert(false) }}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Message sent, please wait for someone comes to help you
                                </DialogContentText>
                            </DialogContent>

                        </Dialog>
                    </div>
                </AppBar>
                <Sidebar
                    restaurant={props.restaurant}
                    table={props.table}
                    SideBarOpen={SideBarOpen}
                    // categories={props.categories}
                    getCurrentCategoryFromSidebar={getCurrentCategoryFromSidebar}
                />

            </div>
        </ThemeProvider>


    if (redirectFlag) {
        redirectFlag = false;
        console.log("redirect == true");

        return (
            <div>
                {renderAppBar}
                <Redirect to={'/' + props.restaurant + '/' + props.table + '/menu'} />
            </div>
        )
    }
    return (
        renderAppBar
    );





}

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
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ffbb93',
            main: '#ff8a65',
            dark: '#c75b39',
            contrastText: '#fff',
        },
        secondary: {
            light: '#d3b8ae',
            main: '#a1887f',
            dark: '#725b53',
            contrastText: '#fff',
        },
    },
});
export default (connect(mapStateToProps, mapDispatchToProps)(TopAppBar));