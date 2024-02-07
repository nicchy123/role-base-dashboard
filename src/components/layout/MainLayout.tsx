import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { Collapse } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function MainLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [collapseId, setCollapseId] = useState<string | number>("");
  const userName = useGetUserQuery(undefined)?.data?.data?.name;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const user = useAppSelector((state) => state?.auth.user as any);
  let sideBarItems;
  if (user?.role === "user") {
    sideBarItems = [
      { name: "Dashboard", link: "/", icon: <DashboardIcon /> },
      {
        name: "Profile",
        link: "",
        icon: <DashboardIcon />,
        children: [
          {
            name: "Personal Profile",
            link: "/personal-profile",
            icon: <DashboardIcon />,
          },
          {
            name: "Professional Profile",
            link: "/professional-profile",
            icon: <DashboardIcon />,
          },
        ],
      },
    ];
  } else if (user?.role === "admin") {
    sideBarItems = [
      { name: "Dashboard", link: "/", icon: <DashboardIcon /> },
      { name: "Users", link: "/users", icon: <DashboardIcon /> },
      { name: "Roles", link: "/roles", icon: <DashboardIcon /> },
      {
        name: "Profile",
        link: "",
        icon: <DashboardIcon />,
        children: [
          {
            name: "Personal Profile",
            link: "/personal-profile",
            icon: <DashboardIcon />,
          },
          {
            name: "Professional Profile",
            link: "/professional-profile",
            icon: <DashboardIcon />,
          },
        ],
      },
    ];
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          Welcome Back, <p style={{display:"inline", color:"#071952", fontWeight:800}}>{ userName}</p>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideBarItems!.map((items, index) => {
            return (
              <div key={index}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <Link
                    onClick={() => setCollapseId(index)}
                    key={index}
                    to={items?.link}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {items.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={items.name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
                {items.children && (
                  <Collapse
                    in={collapseId === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div">
                      {items.children.map((childItem) => (
                        <Link
                          key={childItem.name}
                          to={childItem.link}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <ListItemButton sx={{ minHeight: 48, pl: 4 }}>
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                              }}
                            >
                              {childItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={childItem.name}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            );
          })}
        </List>
      </Drawer>
      <Box
        style={{ minHeight: "100vh" }}
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <h1>Hello</h1>
      </Box>
    </Box>
  );
}

export default MainLayout;
