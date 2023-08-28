import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
// import StripeCheckout from "react-stripe-checkout";

function BookNow() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);
  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // const onToken = (token) => {
  //   console.log(token);
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axiosInstance.post("/api/bookings/make-payment", {
  //       token,
  //       amount: selectedSeats.length * bus.fare,
  //     });
  //     dispatch(HideLoading());
  //     if (response.data.success) {
  //       message.success(response.data.message);
  //     } else {
  //       message.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };
  useEffect(() => {
    getBus();
  }, []);
  return (
    <div>
      {bus && (
        <Row className="mt-3" gutter={[30, 30]}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-2xl text-primary">{bus.name}</h1>
            <h1 className="text-md">
              {bus.from} - {bus.to}
            </h1>
            <hr />

            <div className="flex flex-col gap-2">
              <p className="text-lg">
                <b>Journey Date</b> :{bus.journeyDate}
              </p>
              <p className="text-lg">
                <b>Fare</b> : Rs. {bus.fare} /=
              </p>
              <p className="text-lg">
                <b>Departure Time</b> : {bus.departure}
              </p>
              <p className="text-lg">
                <b>Arrival Time</b> : {bus.arrival}
              </p>
              <p className="text-lg">
                <b>Capacity</b> : {bus.capacity}
              </p>
              <p className="text-lg">
                <b>Seats Left</b> : {bus.capacity - bus.seatsBooked.length}
              </p>
            </div>
            <hr />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl">
                Selected Seats :{selectedSeats.join(",")}
              </h1>
              <h5 className="mt-3">
                Price : {bus.fare * selectedSeats.length}/=
              </h5>
              <hr />

              {/* <StripeCheckout
                // billingAddress
                token={onToken}
                // amount={bus.fare * selectedSeats.length * 100}
                // currency="LKR"
                stripeKey="pk_test_51MeTl1DkMB83WeqiCkxctGbm3t5fPPrBRqhaxUPXnZkibZoph8ubQ7eUgwea1od8vKZa90jQHhAADZZ7szghifmh00ludEPxhI"
              >
                
              </StripeCheckout> */}
              <button
                className={`btn btn-primary ${
                  selectedSeats.length === 0 && "disabled-btn"
                }`}
                onClick={bookNow}
                disabled={selectedSeats.length === 0}
              >
                Book Now
              </button>
            </div>
            <hr />
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;
