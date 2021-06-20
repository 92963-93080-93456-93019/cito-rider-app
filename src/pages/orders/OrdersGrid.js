import React, { useContext } from "react";
import OrderItem from "./OrderItem";
import styles from "./OrdersGrid.module.scss";
import { ENGINE_RIDER_ENDPOINT } from "../../environment";
import Geocode from "react-geocode";

export default class ProductsGrid extends React.Component {
  constructor() {
    super();
    this.state = { orders: [], available: false, address : "SOMEWHERE", final_address : "SOMEWHERE", coordinates : { latitude : 50, longitude : 50 } };
    this.handleUpdateAvailability = this.handleUpdateAvailability.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.handleLocationChangeOk = this.handleLocationChangeOk.bind(this);
  }

  componentDidMount() {
    const url_get_orders = ENGINE_RIDER_ENDPOINT + "1/orders";
    fetch(url_get_orders)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ orders: json });
        console.log(json);
      });

    Geocode.setApiKey("AIzaSyAzDz2g0cchpWDii7dTD3tvsQ5kB83GTO0");
    Geocode.setLanguage("en");
    Geocode.setRegion("pt");
    Geocode.setLocationType("ROOFTOP");
  }

  handleUpdateAvailability = (e) => {
    const available = e.target.value;

    const payload = {
      availability: available,
    };

    console.log(available);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };

    const url_post_availability =
      ENGINE_RIDER_ENDPOINT + "1/availability";

    fetch(url_post_availability, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.code == 200) {
          console.log(data);
          this.setState({
            available: true,
          });
        } else {
          console.log(data);
          this.setState({
            available: false,
          });
        }
      });
  };

  setAddress(addr) {
    this.setState({ address: addr });
  }

  handleLocationChangeOk() {
    Geocode.fromAddress(this.state.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        const formatted_address = response.results[0].formatted_address;
        

        const payload = {
          latitude: lat,
          longitude: lng,
        };
    
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(payload),
        };

        const url_post_location =
          ENGINE_RIDER_ENDPOINT + "1/location";
        console.log(url_post_location);

        fetch(url_post_location, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.code == 200) {
              console.log(data);
              this.setState({
                final_address: formatted_address,
                coordinates : {latitude : lat, longitude : lng}
              });
            } else {
              console.log(data);
              // this.setState({
              //   available: false,
              // });
            }
          });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  render() {
    return (
      <div className={styles.p__container}>
        <div className="row">
          <div className="col">
            <div className="py-3">{this.state.orders.length} Orders</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className={styles.p__grid}>
              {this.state.orders.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))}
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card card-body">
              <p className="mb-1">Am I available?</p>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={this.state.check}
                  onChange={(e) => {
                    this.handleUpdateAvailability({
                      target: {
                        name: e.target.name,
                        value: e.target.checked,
                      },
                    });
                  }}
                />
                <span className={styles.slider}></span>
              </label>

              <p className="mb-1">Where am I?</p>
              <input
                onChange={(event) => this.setAddress(event.target.value)}
                placeholder="Address"
                className=" mb-3 txt-right form-control"
              />
              <button
                type="button"
                className="btn btn-primary mb-2"
                onClick={this.handleLocationChangeOk}
              >
                OK
              </button>
              <hr className="my-4" />
              <h4 className="m-0 txt-right">{this.state.final_address}</h4>
              <p className="mb-1">Lat: {this.state.coordinates.latitude}, Lon: {this.state.coordinates.longitude}</p>
            </div>
          </div>
        </div>

        <div className={styles.p__footer}></div>
      </div>
    );
  }
}
