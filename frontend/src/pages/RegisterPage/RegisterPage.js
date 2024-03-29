import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import './RegisterPage.css'

import RegisterDetails from "./RegisterDetails";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


function RegisterPage() {

  const { id } = useParams();
  const events = useContext(AppContext);

  const event = events.find((event) => event._id === id);


  const [page, setPage] = useState(0);
  const [ticketType, setTicketType] = useState(null);

  const [data, setData] = useState({})

  const [warning, setWarning] = useState(false);

  const findMinAmount = (pricing) => {
    return Math.min(...pricing.map(item => item.price));
  }

  const findMaxAmount = (pricing) => {
    return Math.max(...pricing.map(item => item.price));
  }

  const handleTicketTypeSelect = (index) => {
    setTicketType(index);

    setPage(1);

    const newTicketCount = {};
    const ticketPrice = {};
    event.tickets[index].pricing.forEach(element => {
      newTicketCount[element.name] = 0;
      ticketPrice[element.name] = element.price;
    });

    setData({
      event_id: event._id,
      ticketType: event.tickets[index].name,
      ticketCount: newTicketCount,
      ticketPrice,
      ticketIndex: index
    });
  }

  const setBackPage = () => {
    setTicketType(null);
    setData({});
    setPage(0);
  }

  const handleTicketSelect = () => {
    console.log(data);
    let warning = true;
    for (const key in data.ticketCount) {
      if (data.ticketCount[key] > 0) {
        warning = false;
      }
    }
    if (warning) {
      setWarning(true);
    } else {
      for (const key in data.ticketCount) {
        if (data.ticketCount[key] === 0) {
          delete data.ticketCount[key];
        }
      }
      let subTotal = 0
      for (let key in data.ticketCount) {
        subTotal += data.ticketCount[key] * data.ticketPrice[key]
      }
      setData({ ...data, subTotal: subTotal })
      setPage(2);
    }
  }

  return (
    <>
      {
        event && event.tickets.length >= 1 &&
        <div className="rg1-1">
          <div className="rg1-2">
            <span>{event.title}</span>
          </div>
          {
            page === 0 &&
            <div className="rg1-5">
              <div id="rg1-3">
                <span>Select an option</span>
              </div>
              {
                event.tickets.length >= 1 && event?.tickets.map((ticket, index) => {
                  return (
                    <div className="rg1-4" key={index}>
                      <div className="rg1-4-div">
                        <span id="rg1-4-1">{ticket?.name}</span>
                      </div>
                      <div className="rg1-4-div">
                        <span id="rg1-4-2">{ticket.description}</span>
                      </div>
                      <span id="rg1-4-2">{findMinAmount(ticket.pricing)}$ - {findMaxAmount(ticket.pricing)}$</span>
                      <button id="rg-4-3" onClick={() => handleTicketTypeSelect(index)}>Select</button>
                    </div>
                  )
                })
              }
            </div >
          }

          {
            ticketType !== null && page === 1 &&
            <div className="rg1-5">
              <div style={{ padding: "10px" }}>Select Tickets For </div>
              <span className="rg2-1">{event.tickets[ticketType].name}</span>
              {
                event.tickets[ticketType].pricing.map((pricing, index) => {
                  return (
                    <div id="rg2-2" key={index}>
                      <span style={{ fontWeight: 'bold' }}>{pricing.name}</span>
                      <span>$ {pricing.price}</span>
                      <div id="rg2-3">
                        {<RemoveCircleOutlineIcon onClick={() => {
                          if (data.ticketCount[pricing.name] !== 0) {
                            setData(
                              {
                                ...data,
                                ticketCount: { ...data.ticketCount, [pricing.name]: data.ticketCount[pricing.name] - 1 }
                              }
                            )
                          }
                        }} />}
                        <span>{data?.ticketCount[pricing.name]}</span>
                        <AddCircleOutlineIcon onClick={() => {
                          setWarning(false);
                          setData(
                            {
                              ...data,
                              ticketCount: { ...data.ticketCount, [pricing.name]: data.ticketCount[pricing.name] + 1 }
                            }
                          );
                        }
                        } />
                      </div>
                    </div>
                  )
                }
                )
              }
              {warning && <div className="rg2-5">Select atleast 1 ticket to proceed</div>}
              <div className="rg2-4">
                <button
                  style={{ backgroundColor: "black" }}
                  onClick={setBackPage}
                >
                  Back
                </button>
                <button onClick={handleTicketSelect}>
                  Next
                </button>
              </div>
            </div>
          }
          {
            page === 2 && <RegisterDetails event={event} registrationData={data} setBackPage={handleTicketTypeSelect} />
          }
        </div >
      }
    </>
  );
}

export default RegisterPage;