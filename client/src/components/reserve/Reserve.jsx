import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import useFetch from "../../hooks/useFetch";
import './reserve.css';


const Reserve = ({ setOpen, hotelId }) => {

  const [selectedRooms, setSelectedRooms] = useState([])
  const { data } = useFetch(`https://mern-hotel-server.onrender.com/api/hotels/room/${hotelId}`)
  const {dates } = useContext(SearchContext)

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let list = [];

    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
  }

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (room) => {
    const isFound = room.unavailableDates.some(date=>allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  }


  const handleSelect = (e) => {
     const checked = e.target.checked
     const value = e.target.value
     setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item=>item !== value ))
  }

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`https://mern-hotel-server.onrender.com/api/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      )
    } catch (err) {
      
    }

  }
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>
          select your rooms:
        </span>
        {data && data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className='rItemInfo'>
              <div className="rTitle"> {item.title} </div>
              <div className="rDesc"> {item.desc} </div>
              <div className="rPeople"> Max people: <b>{item.maxPeople}</b>  </div>
              <div className="rPrice"> {item.price} </div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((room) => (
                <div className="room" key={room._idf}>
                  <label> {room.number} </label>
                  <input type="checkbox" value={room._id} onChange={handleSelect} disabled={!isAvailable(room)} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className='rButton' onClick={handleClick}> Reserve Now</button>
      </div>
    </div>
  )
}

export default Reserve