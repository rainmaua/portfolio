import React, { useEffect, useState } from 'react'
// import { redirect } from "react-router-dom";
// import jwt from 'jsonwebtoken'
// import axios from 'axios';
// import empty_image from '../images/no_thumbnail_image.png';


// localStorage allows users to save data as key-value pairs in the browser
// it does not clear data when the browser closes. 
const TodayQuote = () => {
    const schedule = require('node-schedule');
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')
    const [error, setError] = useState(null)

   



    useEffect(() => {
        
        const fetchQuote = async() => {
            await fetch("http://api.quotable.io/random?author=honest-hemingway|charles-bukowski|hermann-hesse|john-steinbeck|emily-dickinson|socrates|toni-morrison|edgar-allan-poe|gabriel-garcía-márquez|jonathan-safram-foer")
            .then(res => {
                if (res.status  >= 200 && res.status <= 299){
                    return res.json()
                }
                else {
                    console.log(res)
                    setAuthor(res.status)
                    throw Error(res.statusText);
                }
               
            })
            .then(
                (jsonResponse) => {
                    console.log("fetchData's jsonResponse: ", jsonResponse)
                    localStorage.setItem('todayQuote', JSON.stringify(jsonResponse))
                    setQuote(jsonResponse.content);
                    setAuthor(jsonResponse.author);
                }
            )
            .catch( (err) => {
                console.log("Error in today's quote: ", err)
                setError(String(err))
            })
        }
  
        async function displayStoredQuote() {
            if (localStorage.getItem('todayQuote') === null) {
                fetchQuote()
            }
            let currentTodayQuote = JSON.parse(localStorage.getItem('todayQuote'))
            setQuote(currentTodayQuote.content);
            setAuthor(currentTodayQuote.author);
        }
       
        displayStoredQuote()
        
        // updates the quote every day at midnight 00:00:00
        schedule.scheduleJob('0 0 * * *', () => {
            var currentDate = new Date()
            console.log('Cron expression executed', currentDate);
            fetchQuote();
        });

       
            
    }, [schedule])


    return (
        <div>
            <div className="form-group">
               <h2 className="page-title"> Today's Quote </h2>
               <div className="today-quote-container">
                   {error ?  <div>{error}</div> : <div></div>}
                   <div className="today-quote">{quote}</div>
                   <div className="today-quote-author">-{author}-</div>
               </div>
           </div>


        </div>
    )



}

export default TodayQuote