import React from "react";
import { useNavigate } from "react-router-dom";

function Bus({ bus }) {
  const navigate = useNavigate();
  return (
    <div className="card p-2">
      <h1 className="text-lg">{bus.name}</h1>
      <hr />
      <div className="d-flex justify-content-between">
        <div>
          <p className="text-sm">From</p>
          <p className="text-sm text">{bus.from}</p>
        </div>

        <div>
          <p className="text-sm">To</p>
          <p className="text-sm">{bus.to}</p>
        </div>

        <div>
          <p className="text-sm">Fare</p>
          <p className="text-sm">Rs.{bus.fare} /=</p>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <p className="text-sm">Journey Date</p>
          <p className="text-sm">{bus.journeyDate}</p>
        </div>
        <h1
          className="text-lg underline text-primary"
          onClick={() => {
            navigate(`/book-now/${bus._id}`);
          }}
        >
          <button className="book-btn">Book Now</button>
        </h1>
      </div>
    </div>
  );
}

export default Bus;
