import React, { useContext } from "react";
import Layout from "../../components/Layout";
import ProductItem from "./ProductItem";
import { formatNumber } from "../../helpers/utils";
import { ENGINE_RIDER_ENDPOINT } from "../../environment";

export default class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.location.state.order,
      totalItems: 0,
      stateToUpdate: "GOING_TO_BUY",
      update : {success : false, msg : ""}
    };
    this.handleStateToUpdateChange = this.handleStateToUpdateChange.bind(this);
    this.handleOrderStatusUpdate = this.handleOrderStatusUpdate.bind(this);
  }

  componentDidMount() {
    var totalItemsTmp = 0;
    for (const [index] of this.state.order.productListItems.entries()) {
      totalItemsTmp += this.state.order.productListItems[index].quantity;
    }
    this.setState({ totalItems: totalItemsTmp });
  }

  handleOrderStatusUpdate = (e) => {
    e.preventDefault();

    const payload = {
      orderId: this.state.order.orderId,
      status: this.state.stateToUpdate,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };

    const url_post_order = ENGINE_RIDER_ENDPOINT + "1/orders";
    console.log(url_post_order);

    fetch(url_post_order, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.code == 201) {
          //dispatch({type: "CHECKOUT_201", msg: ""});
          console.log(data);
          this.setState({ update : { success : true, msg : "Order updated successfuly!"} });
        } else {
          //dispatch({type: "CHECKOUT_403", msg: data.message});
          console.log(data);
          this.setState({ update : { success : false, msg : data.message } });
        }
      });
  };

  handleStateToUpdateChange(e) {
    this.setState({ stateToUpdate: e.target.value });
  }

  render() {
    const order = this.state.order;
    const update = this.state.update;
    console.log(order);
    const totalItems = this.state.totalItems;

    return (
      <Layout title="Order Details" description="This is the Order page">
        <div>
          <div className="text-center mt-5">
            <h1>
              Order #{order.orderId} | {order.app.name}
            </h1>
          </div>

          <div className="row no-gutters justify-content-center">
            <div className="col-sm-9 p-3">
              <hr className="my-4" />

              <h3>App Information</h3>
              <div className="row no-gutters py-2">
                <div className="col-sm-4 p-2">
                  <p className="mb-1">Name</p>
                </div>
                <div className="col-sm-8 p-2">
                  <h5 className="mb-1">{order.app.name}</h5>
                </div>
              </div>
              <div className="row no-gutters py-2">
                <div className="col-sm-4 p-2">
                  <p className="mb-1">Address</p>
                </div>
                <div className="col-sm-8 p-2">
                  <h5 className="mb-1">{order.app.address}</h5>
                </div>
              </div>
              <div className="row no-gutters py-2">
                <div className="col-sm-4 p-2">
                  <p className="mb-1">Schedule</p>
                </div>
                <div className="col-sm-8 p-2">
                  <h5 className="mb-1">{order.app.schedule}</h5>
                </div>
              </div>

              <hr className="my-4" />

              <h3>Client Information</h3>
              <div className="row no-gutters py-2">
                <div className="col-sm-4 p-2">
                  <p className="mb-1">Name</p>
                </div>
                <div className="col-sm-8 p-2">
                  <h5 className="mb-1">
                    {order.endConsumer.fname + " " + order.endConsumer.lname}
                  </h5>
                </div>
              </div>
              <div className="row no-gutters py-2">
                <div className="col-sm-4 p-2">
                  <p className="mb-1">Phone number</p>
                </div>
                <div className="col-sm-8 p-2">
                  <h5 className="mb-1">{order.endConsumer.phone}</h5>
                </div>
              </div>
              <div className="row no-gutters py-2">
                <div className="col-sm-4 p-2">
                  <p className="mb-1">Delivery Address</p>
                </div>
                <div className="col-sm-8 p-2">
                  <h5 className="mb-1">{order.address}</h5>
                </div>
              </div>

              <hr className="my-4" />

              <h3>Products List</h3>
              {order.productListItems.map((productListItem) => (
                <ProductItem
                  quantity={productListItem.quantity}
                  key={productListItem.product.id}
                  product={productListItem.product}
                />
              ))}

              <hr className="my-4" />

              {/* { checkout.status && 
                            <div className="p-3 text-center text-success">
                                <p>Checkout successfull</p>
                                <Link to="/" className="btn btn-outline-success btn-sm">BUY MORE</Link>
                            </div>
                        }
                        { !checkout.status && 
                            <div className="p-3 text-center text-danger">
                                <p>{checkout.msg}</p>
                                <Link to="/" className="btn btn-outline-primary btn-sm">BUY MORE</Link>
                            </div>
                        } */}
            </div>
            {order.productListItems.length > 0 && (
              <div className="col-sm-3 p-3">
                <div className="card card-body">
                  <p className="mb-1">Total Items</p>
                  <h4 className=" mb-3 txt-right">{totalItems}</h4>

                  <p className="mb-1">Total Payment</p>
                  <h3 className=" mb-3 txt-right">
                    {formatNumber(order.price)}
                  </h3>

                  <p className="mb-1">Current State</p>
                  <h4 className="m-0 txt-right">{order.orderStatusEnum}</h4>

                  <hr className="my-4" />
                  <div className="text-center">
                    
                    <select
                      class="form-control"
                      name="orderStateUpdate"
                      id="orderStateUpdate"
                      value={this.state.stateToUpdate}
                      onChange={this.handleStateToUpdateChange}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="GOING_TO_BUY">GOING_TO_BUY</option>
                      <option value="BUYING">BUYING</option>
                      <option value="DELIVERING">DELIVERING</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-primary mb-2"
                      onClick={this.handleOrderStatusUpdate}
                    >
                      UPDATE ORDER STATE
                    </button>
                    {update.success && (
                      <div className="p-3 text-center text-success">
                        <p>{update.msg}</p>
                      </div>
                    )}
                    {!update.success && update.msg != "" && (
                      <div className="p-3 text-center text-danger">
                        <p>{update.msg}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

//export default OrderDetails;
