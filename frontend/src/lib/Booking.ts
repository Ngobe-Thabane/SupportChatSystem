import axios from "axios";

export async function BookMovi(showtime_id:string, seat_number:Array<string>, token:string){
    const movie_list = await axios.post(`http://localhost:5000/booking`, {
        showTime_id:showtime_id,
        seat_numbers:seat_number
    },{
        headers : {
        'Content-Type':"application/json",
        'Authorization' : `Bearer ${token}`
        } })
    return movie_list.data;
}

export async function getUserBookind(token:string) {
    const bookings = await axios.get('http://localhost:5000/bookings', {
        headers:{
            "Content-Type" :'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    return bookings.data;
}


export async function cancelBooking(booking_id:string, token:string) {

    const bookings = await axios.put('http://localhost:5000/cancelBooking',{
        booking_id:booking_id
    }, {
        headers:{
            "Content-Type" :'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    return bookings.data;
    
}