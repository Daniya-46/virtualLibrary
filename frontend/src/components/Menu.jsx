import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";
import { useBookContext } from "../hooks/useBookContext";
import { useUserContext } from "../hooks/useUserContext";

const Menu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { dispatch } = useBookContext();
  const { state: userState, dispatch: userDispatch } = useUserContext();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const toggleCategories = (e) => {
    e.stopPropagation();
    setCategoriesOpen(!categoriesOpen);
  };

  const categories = [
    "Love",
    "Mystery",
    "Crime",
    "Horror",
    "Fiction",
    "Science",
    "History",
  ];

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
  };

  const DrawerList = (
    <div
      style={{
        width: 250,
        padding: "10px",
        backgroundColor: "#F5F1E1",
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={toggleCategories}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
          {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories.map((category) => (
              <ListItem
                button
                component={Link}
                to={`/categories/${category}`}
                key={category}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: "SET_CATEGORY", payload: category });
                }}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider />
        {userState.user && (
          <ListItem button component={Link} to="/my-borrowed-books">
            <ListItemText primary="My Borrowed Books" />
          </ListItem>
        )}

        {!userState.user && (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}

        {!userState.user && (
          <ListItem button component={Link} to="/signup">
            <ListItemText primary="Sign Up" />
          </ListItem>
        )}

        {userState.user && (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <>
      <Button
        startIcon={<MenuIcon />}
        onClick={toggleDrawer(true)}
        style={{ color: "#FAF3E0", marginLeft: "10px" }}
      ></Button>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(182, 182, 182, 0.459)",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Menu;
