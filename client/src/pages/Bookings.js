import { message, Modal, Table, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import BusForm from "../components/BusForm";
import PageTitle from "../components/PageTitle";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

function Bookings() {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/bookings/get-bookings-by-user-id",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(", ");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <h1
            className="text-md underline"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            <Button className="print-btn">Print Ticket</Button>
          </h1>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  const componentRef = useRef();
  const handlePrint = () => {
    const element = componentRef.current;
    const opt = {
      margin: [0.5, 0.5],
      filename: `ticket_${selectedBooking.key}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      <PageTitle title="Bookings" />
      <div className="mt-2">
        <Table dataSource={bookings} columns={columns} />
      </div>
      {showPrintModal && (
        <Modal
          title="Ticket"
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          visible={showPrintModal}
          okText="Print"
          onOk={handlePrint}
        >
          <div className="d-flex flex-column p-2" ref={componentRef}>
            <div className="watermark" />
            <div className="d-flex flex-column p-5" ref={componentRef}>
              <h1 className="text-lg"> Bus name: {selectedBooking.name}</h1>
              <hr />
              <h1 className="text-md text-secondary">
                {selectedBooking.from} to {selectedBooking.to}
              </h1>
              <hr />
              <p>
                <span className="text-secondary">Journey Date:</span>{" "}
                {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
              </p>
              <p>
                <span className="text-secondary">Journey Time:</span>{" "}
                {selectedBooking.departure}
              </p>
              <hr />
              <p>
                <span className="text-secondary text-lg">Seat no:</span>{" "}
                {selectedBooking.seats}
              </p>
              <hr />
              <p>
                <span className="text-secondary">Amount:</span> Rs.{" "}
                {selectedBooking.fare * selectedBooking.seats.length} /=
              </p>

              {/* <div
              className="text-lg underline text-blue-600 cursor-pointer"
              onClick={handlePrint}
            >
              Download Ticket
            </div> */}
            </div>
          </div>

          <Button className="ticket-btn" onClick={handlePrint}>
            Download Ticket
          </Button>
        </Modal>
      )}
    </div>
  );
}

export default Bookings;

// <Modal
//   title="Print Ticket"
//   onCancel={() => {
//     setShowPrintModal(false);
//     setSelectedBooking(null);
//   }}
//   visible={showPrintModal}
//   okText="Print"
//   onOk={handlePrint}
// >
//   <div className="d-flex flex-column p-5" ref={componentRef}>
//     <h1 className="text-lg"> Bus name: {selectedBooking.name}</h1>
//     <hr />
//     <h1 className="text-md text-secondary">
//       {selectedBooking.from} to {selectedBooking.to}
//     </h1>
//     <hr />
//     <p>
//       <span className="text-secondary">Journey Date:</span>{" "}
//       {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
//     </p>
//     <p>
//       <span className="text-secondary">Journey Time:</span>{" "}
//       {selectedBooking.departure}
//     </p>
//     <hr />
//     <p>
//       <span className="text-secondary text-lg">Seat no:</span>{" "}
//       {selectedBooking.seats}
//     </p>
//     <hr />
//     <p>
//       <span className="text-secondary">Amount:</span> Rs.{" "}
//       {selectedBooking.fare * selectedBooking.seats.length} /=
//     </p>
//   </div>
// </Modal>
