import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Tab,
  Button,
  Container,
  Menu,
  MenuItem,
  InputBase,
  InputAdornment,
  ClickAwayListener,
  Pagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Search,
  SortTwoTone,
  MoreHoriz,
  ContentPaste,
} from "@mui/icons-material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import "../assets/styles/OrderList.css";
import Axios from "axios";

function MyOrder() {
  const { isLoggedIn, user, dataUser } = useSelector((state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    dataUser: state.userData.userData,
  }));
  const userUID = user?.customer_uid;
  console.log(user);
  const userData = user?.approle;
  console.log(userData?.role);

  const [activeTab, setActiveTab] = useState();
  const [orderDetails, setOrderDetails] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [cancelIndex, setCancelIndex] = useState();
  // state = {
  //   isOnGoing: true,
  //   isCompleted: false,
  //   value: '1',
  //   isOrderComplete: true,
  //   isOrderOg: false,
  //   status: '',
  //   isSearch: false,
  //   isAdmin: true,
  //   setOpenC: false,
  // };

  const handleChange = (e, value) => {
    setActiveTab(value);
  };

  useEffect(() => {
    getOrderList();
  }, []);

  const isSearchHandle = () => {
    setIsSearch(true);
  };

  const isSearchHandleClose = () => {
    setIsSearch(false);
  };

  const handleCloseCancel = () => {
    setOpenC(false);
  };

  const handleClickOpenCancel = () => {
    setOpenC(true);
  };

  const isCanceled = (index) => {
    setCancelIndex(index);
  };

  const getOrderList = () => {
    Axios.get(
      `http://localhost:3300/api/order/get-order-cart-user-product/${userUID}`
    )
      .then((result) => {
        console.log(result.data);
        setOrderDetails(result.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan di server");
      });
  };


  const cancelOrder = (id) => {
    const data = {
      status_detail: 6,
    };
    // for(i=0; i<=orderDetails.length; i++)
    Axios.put(`http://localhost:3300/api/order/cancel-order/${id}`, data)
      .then(() => {
        alert("Berhasil");
        getOrderList();
        // <Redirect to="/my-order/:customer_uid" />
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const olistcDetailStatus = (status) => {
    if (status === 0) {
      return (
        <Box
          className="moc-detail-status-1"
          sx={{ backgroundColor: "rgb(255,165,0,0.4)" }}
        >
          Waiting for payment
        </Box>
      );
    } else if (status === 1) {
      return (
        <Box
          className="moc-detail-status-2"
          sx={{ backgroundColor: "rgb(255,215,0,0.4)" }}
        >
          Payment confirmation
        </Box>
      );
    } else if (status === 2) {
      return (
        <Box
          className="moc-detail-status-3"
          sx={{ backgroundColor: "rgb(152,251,152,0.4)" }}
        >
          In process
        </Box>
      );
    } else if (status === 3) {
      return (
        <Box
          className="moc-detail-status-4"
          sx={{ backgroundColor: "rgba(127, 255, 212, 0.4)" }}
        >
          In delivery
        </Box>
      );
    } else if (status === 4) {
      return (
        <Box
          className="moc-detail-status-5"
          sx={{ backgroundColor: "rgb(72,209,204,0.4)" }}
        >
          Received
        </Box>
      );
    } else {
      return (
        <Box
          className="moc-detail-status-6"
          sx={{ backgroundColor: "rgb(220,20,60,0.4)" }}
        >
          Canceled
        </Box>
      );
    }
  };

  const menuHandler = () => {
    return (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <button
              className="account-button"
              variant="contained"
              {...bindTrigger(popupState)}
            >
              <IconButton>
                <MoreHoriz />
              </IconButton>
            </button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem>
                <Link to="/dashboard" className="userlist-banner-menu-link">
                  Dashboard
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/user-list" className="userlist-banner-menu-link">
                  User List
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/warehouse-management"
                  className="userlist-banner-menu-link"
                >
                  Warehouse Mng.
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/products-management-list"
                  className="userlist-banner-menu-link"
                >
                  Product List
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/products-management-category"
                  className="userlist-banner-menu-link"
                >
                  Product Category
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/stock-mutation"
                  className="userlist-banner-menu-link"
                >
                  Stock Mutation
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/order-list" className="userlist-banner-menu-link">
                  Order List
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/sales-report" className="userlist-banner-menu-link">
                  Sales Report
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/stock-history" className="userlist-banner-menu-link">
                  Stock History
                </Link>
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    );
  };

  const defaultOngoing = () => {
      <div className="orderlist-og">
        <img
          src="https://i.pinimg.com/originals/6f/df/bc/6fdfbc41d6a8e26d4b9073bc1afd899f.jpg"
          className="orderlist-og-logo"
          alt="No Order"
        />
        <div className="orderlist-og-text-1">You don't have an order yet</div>
        <div className="orderlist-og-text-2">
          You don't have On Going orders at this time
        </div>
      </div>
  }

  const defaultComplete = () => {
      <div className="orderlist-og">
        <img
          src="https://i.pinimg.com/originals/6f/df/bc/6fdfbc41d6a8e26d4b9073bc1afd899f.jpg"
          className="orderlist-og-logo"
          alt="No Order"
        />
        <div className="orderlist-og-text-1">You don't have any completed order yet</div>
        <div className="orderlist-og-text-2">
          You don't have any complete orders at this time
        </div>
      </div>
  }

  const orderListCard = (input) => {
    console.log("ini orderdetail", orderDetails);
    let orderCheck = [];
    console.log(input, "ini input")
    if(input === 2) {
      orderCheck = [];
      orderDetails?.forEach(function(order) {
        if (order.status_detail === 4) {
          orderCheck.push(order);
        }
      })
    } else if (input === 1){
      orderCheck = [];
      orderDetails?.forEach(function (order) {
        if (
          order.status_detail === 0 ||
          order.status_detail === 1 ||
          order.status_detail === 2 ||
          order.status_detail === 3 ||
          order.status_detail === 6
        ) {
          orderCheck.push(order);
        }
      });
    }
    console.log('order check', orderCheck);
    return (
      <>
        {orderCheck?.map((orderDetail, index) => (
          <>
            <div className="olistc-main">
              <div className="olistc-subdetail">
                <div className="olistc-detail-name">Order ID</div>
                <div className="olistc-detail-subname">Order Date</div>
                <div className="olistc-detail-subname">User ID</div>
                <div className="olistc-detail-subname">User</div>
                <div className="olistc-detail-subname">From</div>
                {olistcDetailStatus(orderDetail?.status_detail)}
              </div>
              <div className="olistc-detail">
                <>
                  <div className="olistc-detail-name">{orderDetail?.id}</div>
                  <div className="olistc-detail-subname">
                    {orderDetail?.createdAt}
                  </div>
                  <div className="olistc-detail-subname">
                    {orderDetail?.customer_uid}
                  </div>
                  <div className="olistc-detail-subname">
                    {orderDetail?.fullname}
                  </div>
                  <div className="olistc-detail-subname">
                    Warehouse {orderDetail?.orderitems[0]?.warehouse_id}
                  </div>
                </>
                <div className="olistc-detail-bottom">
                  {orderDetail?.status_detail === 6 || 4 ? null : (
                    <>
                      <Button
                        sx={{
                          borderRadius: "20px",
                          backgroundColor: "white",
                          color: "red",
                          fontSize: "8px",
                          fontFamily: "Lora",
                        }}
                        variant="contained"
                        onClick={() => {
                          handleClickOpenCancel();
                          isCanceled(index);
                        }}
                        className="olistc-detail-bottom-track"
                      >
                        Cancel
                      </Button>
                      <Dialog
                        open={openC}
                        onClose={handleCloseCancel}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Cancel this order"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure ?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseCancel}>No</Button>
                          <Button
                            onClick={() => {
                              handleCloseCancel();
                              cancelOrder(orderCheck[cancelIndex]?.id);
                            }}
                            autoFocus
                          >
                            {console.log(orderDetail?.id)}
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}

                  <Link
                    to={{
                      pathname: `/my-order-detail/${userUID}/${orderDetail?.id}`,
                    }}
                  >
                    <Button
                      sx={{
                        borderRadius: "20px",
                        backgroundColor: "black",
                        fontSize: "8px",
                        fontFamily: "Lora",
                      }}
                      variant="contained"
                      className="olistc-detail-bottom-track"
                    >
                      Detail
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ))}
      </>
    );
  };

  return (
    <Container maxWidth="xs" sx={{ backgroundColor: "white" }}>
      <div className="orderlist-main">
        <div className="orderlist-banner">
          <div className="orderlist-banner-logo">
            <IconButton disabled>
              <ContentPaste />
            </IconButton>
          </div>

          {isSearch ? (
            <>
              <ClickAwayListener onClickAway={isSearchHandleClose}>
                <InputBase
                  sx={{ ml: 1, flex: 1, fontFamily: "Lora" }}
                  placeholder="Order ID"
                  inputProps={{ "aria-label": "Search" }}
                  className="orderlist-search"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </ClickAwayListener>
            </>
          ) : (
            <>
              <div className="orderlist-banner-text">Order List</div>
              <div className="orderlist-banner-search">
                <IconButton onClick={isSearchHandle}>
                  <Search />
                </IconButton>
              </div>
            </>
          )}

          <div className="orderlist-banner-sort">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <button
                    className="account-button"
                    variant="contained"
                    {...bindTrigger(popupState)}
                  >
                    <IconButton>
                      <SortTwoTone />
                    </IconButton>
                  </button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      onClick={popupState.close}
                      sx={{ fontFamily: "Lora" }}
                    >
                      <img src="https://img.icons8.com/fluency-systems-filled/22/null/sort-numeric-up.png" />
                      Oldest
                    </MenuItem>
                    <MenuItem
                      onClick={popupState.close}
                      sx={{ fontFamily: "Lora" }}
                    >
                      <img src="https://img.icons8.com/windows/24/null/sort-numeric-up-reversed.png" />
                      Recent
                    </MenuItem>
                    {userData?.role === "admin" ? (
                      <>
                        <MenuItem>
                          <img src="https://img.icons8.com/ios/24/null/garage-closed.png" />
                          Warehouse A
                        </MenuItem>
                        <MenuItem>
                          <img src="https://img.icons8.com/ios/24/null/garage-closed.png" />
                          Warehouse B
                        </MenuItem>
                        <MenuItem>
                          <img src="https://img.icons8.com/ios/24/null/garage-closed.png" />
                          Warehouse C
                        </MenuItem>
                        {/* <MenuItem>
                            <div>{orderDetails[0]?.status}</div>
                          </MenuItem> */}
                      </>
                    ) : null}
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>

          <div className="orderlist-banner-menu">{menuHandler()}</div>
        </div>

        <div className="orderlist-tab">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    sx={{ marginLeft: "20px", fontFamily: "Lora" }}
                    label="On Going"
                    value="1"
                  />
                  <Tab
                    sx={{ marginLeft: "100px", fontFamily: "Lora" }}
                    label="Completed"
                    value="2"
                  />
                </TabList>
              </Box>
                    <TabPanel value="1">
                      {orderListCard(1)}

                      <Stack
                        spacing={1}
                        sx={{
                          position: "fixed",
                          top: "78%",
                          width: "110%",
                          fontFamily: "Lora",
                        }}
                      >
                        <Pagination count={10} />
                      </Stack>
                    </TabPanel>
              
                    <TabPanel value="2">
                      {orderListCard(2)}

                      <Stack
                        spacing={1}
                        sx={{
                          position: "fixed",
                          top: "78%",
                          width: "110%",
                          fontFamily: "Lora",
                        }}
                      >
                        <Pagination count={10} />
                      </Stack>
                    </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </Container>
  );
}

export default MyOrder;
