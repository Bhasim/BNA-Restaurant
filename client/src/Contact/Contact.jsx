import React,{useState,useEffect} from 'react'
import Header from '../Header/Header';
import Logo from "../images/contact.png"
import "./contact.scss"
import emailjs from '@emailjs/browser';
import AOS from "aos";
import "aos/dist/aos.css";


function Contact() {

    let [value,setValue] = useState({name:"",tel:"",email:"",message:""})
    console.log("🚀 ~ file: Contact.jsx ~ line 7 ~ Contact ~ value", value)

    let handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
        
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        emailjs.sendForm(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, e.target, process.env.REACT_APP_YOUR_PUBLIC_KEY)
     
        .then((result) => {
           alert(result.text)
        }, (error) => {
            alert(error.text)
        });
        setValue({name:"",tel:"",email:"",message:""})
    }
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, [])

    return (
        <article data-aos="fade-left">
            <Header home="Home"  menu="Menu" book="Book" cart="Cart" special="Special" />
            <div className='contact'>
                <a ><img src={Logo} alt="" /></a>
                <form onSubmit={handleSubmit}>
                    <h1>Contact Us</h1>
                    <input required value={value.name} onChange={handleChange} type="text" name="name" id="" placeholder='Enter your name...' />
                    <input required value={value.tel} onChange={handleChange} type="number" name="tel" id="" placeholder='Enter your mobile number...' />
                    <input required value={value.email} onChange={handleChange} type="email" name="email" id="" placeholder='Enter your E-Mail...' />
                    <textarea required value={value.message} onChange={handleChange}  name="message" id="" cols="30" rows="10" placeholder='Write your message here...' />
                    <button disabled={value.message === ""}>
                    <span className='liquidText' >Send</span>
                        <div class="liquid"></div>
                    </button>
                </form>
    </div>
      </article>
      
  )
}

export default Contact