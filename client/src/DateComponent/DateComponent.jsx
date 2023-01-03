import React,{useState,useContext} from 'react'
import "./dateComponent.scss"



import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import Stack from '@mui/material/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { context } from '../Context';
import book from "../images/logo-bna.png"





function DateComponent() {
  let { users, fetchUsers, setUsers, bookValue, setBookValue } = useContext(context)
  console.log("🚀 ~ file: DateComponent.jsx ~ line 24 ~ DateComponent ~ bookValue", bookValue)
  let dateNow = new Date().toJSON().slice(0, 10)
  console.log("🚀 ~ file: DateComponent.jsx ~ line 25 ~ DateComponent ~ dateNow", dateNow)
  
  //? ========= Lets get the booking days with the time ======================================================
  let filterBooked = users.filter(item => item?.book?.date === bookValue?.date)
  console.log("🚀 ~ file: DateComponent.jsx ~ line 29 ~ DateComponent ~ filterBooked", filterBooked)
  // ==================== Lets ask if this day is not empty ====================
  let thisDay = filterBooked.some(item => item.book.date === bookValue?.date)
  console.log("🚀 ~ file: DateComponent.jsx ~ line 32 ~ DateComponent ~ thisDay", thisDay)
  
    return (
      
      <div className='dataMainCon'>
      <div className='dateCon'>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="protrait"
          openTo="day"
          classNames='datePicker'
          // value={dateNow}
          
          disablePast
          onChange={(newvalue) => 
            setBookValue({...bookValue,date:[newvalue?.$y,newvalue?.$M + 1,newvalue?.$D].join("-")})
          }
                
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
       
          <p className='showDate'>{ bookValue?.date || bookValue?.hour !== "" ? `You are booking in ${bookValue?.date} at ${bookValue?.hour}` : ""}</p>
  
        </div>
        
        <div className='hourCon'>
       
          {bookValue.date !== "" && (
              <select required onChange={(e) => setBookValue({...bookValue,hour:e.target.value})} name="hour" id="">
              <option selected disabled value="">Select Time...</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "08:00")} value="08:00">08:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "09:00")} value="09:00">09:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "10:00")} value="10:00">10:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "11:00")} value="11:00">11:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "12:00")} value="12:00">12:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "13:00")} value="13:00">13:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "14:00")} value="14:00">14:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "15:00")} value="15:00">15:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "16:00")} value="16:00">16:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "17:00")} value="17:00">17:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "18:00")} value="18:00">18:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "19:00")} value="19:00">19:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "20:00")} value="20:00">20:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "21:00")} value="21:00">21:00</option>
              <option disabled={filterBooked?.some(item => item?.book?.hour === "22:00")} value="22:00">22:00</option>
              </select>    
      )}
          

            

          {!thisDay ? (
            <a ><img src={book} alt="" /></a>
          ) : <div className='booked'>
              <h1>This hours in this day are Booked</h1>
              {filterBooked.map(item => <p>{item.book.hour}</p>)}
          </div>}
  
      </div>
      </div>
    );
}

export default DateComponent