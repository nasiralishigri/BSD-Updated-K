import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "./Sidebar.css";
import bsglogo from "../../Assets/bsg-logo-only.png";
import navgraydashboard from "../../Assets/nav-gray-dashboard.png";
import navgraydepositdetail from "../../Assets/nav-gray-deposit-detail.png"
import navgrayteam from "../../Assets/nav-gray-team.png"
import Pdf from "../../Assets/docs/rules.pdf"
import {
    Routes,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import DashBoard from '../DashBoard/DashBoard';
import MyTeam from '../MyTeam/MyTeam';
import Details from '../Details/Details';
import navgrayrule from "../../Assets/nav-gray-rule.png"



const drawerWidth = 250;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isColor, setIsColor] = useState("Dashboard")
    const { pathname } = useLocation();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };



    const changeRoute = () => {
        if (pathname) {
            if (pathname == "/sidebar/dashboard") {
                setIsColor("Dashboard")
            } else if (pathname == "/sidebar/team") {
                setIsColor("My Team")
            } else if (pathname == "/sidebar/details") {
                setIsColor("Deposit Details")
            }
        }
    }

    const drawer = (
        <div className='stakenmsColor1'>
            <Toolbar className="d-flex align-items-center justify-content-start pb-3 pt-1 ms-4" >
                <img src={bsglogo} height="30" width="25" /><span className='mode'>BSG2.0</span>
            </Toolbar>
            <Divider />
            <List>
                <Link to="/sidebar/dashboard" style={{ textDecoration: "none" }}>
                    <ListItem key="Dashboard"
                        onClick={() => setIsColor("Dashboard")}
                        className={isColor == "Dashboard" ? 'staking-btn-active' : 'staking-btn'}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={navgraydashboard} width="30px" />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/sidebar/team" style={{ textDecoration: "none" }}>
                    <ListItem key="My Team"
                        onClick={() => setIsColor("My Team")}
                        className={isColor == "My Team" ? 'staking-btn-active' : 'staking-btn'}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={navgrayteam} width="30px" />
                            </ListItemIcon>
                            <ListItemText primary="My Team" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/sidebar/details" style={{ textDecoration: "none" }}>
                    <ListItem key="Deposit Details"
                        onClick={() => setIsColor("Deposit Details")}
                        className={isColor == "Deposit Details" ? 'staking-btn-active' : 'staking-btn'}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={navgraydepositdetail} width="25px" />
                            </ListItemIcon>
                            <ListItemText primary="Deposit Details" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <a href={Pdf} without rel="noopener noreferrer" target="_blank" style={{ textDecoration: "none" }}>
                    <ListItem key="Rules"
                        onClick={() => setIsColor("Rules")}
                        className={isColor == "Rules" ? 'staking-btn-active' : 'staking-btn'}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={navgrayrule} width="25px" />
                            </ListItemIcon>
                            <ListItemText primary="Rules" />
                        </ListItemButton>
                    </ListItem>
                </a>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar style={{
                    backgroundColor: "#070635", width: '100%', paddingTop: "13px", paddingBottom: "13px"
                }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography noWrap className='d-flex justify-content-end' style={{ color: "white", display: "flex", width: '100%' }}>
                        <button className='btn btn-warning' >Connect Wallet</button>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                className="sidebar-down-color"
            >
                <Toolbar />
                <Routes>
                    <Route path='/dashboard' element={<DashBoard />} />
                    <Route path="/team" element={<MyTeam />} />
                    <Route path="/details" element={<Details />} />
                </Routes>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;