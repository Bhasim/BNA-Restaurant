import React, { useState, useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from "react-icons/fa"
import {ImLocation} from "react-icons/im"
import {GiHotMeal} from "react-icons/gi"
import Header from "../Header/Header";
import "./special.scss"
import axios from "axios"
import { context } from '../Context';
import AOS from "aos";
import "aos/dist/aos.css";
function Special() {
    let { dataSpecial, setDataSpecial, fetchingSpecial,signedInValue,users } = useContext(context)
    console.log("🚀 ~ file: Special.jsx:14 ~ Special ~ dataSpecial", dataSpecial)
    console.log("🚀 ~ file: Special.jsx:14 ~ Special ~ users", users)
    let [acceptTerms,setAcceptTerms] = useState(false)
    let navigate = useNavigate()
    let findUserBySignedIn = users.find(item => item.email === signedInValue?.user?.email)
    let foundUserId = findUserBySignedIn?._id
    console.log("🚀 ~ file: Special.jsx:18 ~ Special ~ foundUserId", foundUserId)
    // let signedIn = "63778ff3579e1a16e6272d2f"
    // let signedIn = "63778a56579e1a16e6272c55"
    
    let [value, setValue] = useState({
        meal: "",
        price: null,
        tel: null,
        type: "",
        image: "",
        description: "",
        address: "",
        chefName:""
    })
    console.log("🚀 ~ file: Special.jsx ~ line 15 ~ Special ~ value", value)
    let [filterValue,setFilterValue] = useState("")
    console.log("🚀 ~ file: Special.jsx ~ line 24 ~ Special ~ filterValue", filterValue)
    
    let handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
       
    }
    let handleSubmit = async (e) => {
        e.preventDefault()
        // if (value.tel.length < 12 && value.tel.length > 12) {
        //     alert("The number must be 12 numbers")
        // }
        let formData = new FormData(e.target)
        await axios.post(`/special/${foundUserId}`,formData,value, {
            headers:{"Content-Type":"multipart/form-data"}
        })
        alert("Your Order is successfully published")

        e.target.reset()
        setValue({
            meal: "",
            price: null,
            tel: null,
            type: "",
            image: "",
            description: "",
            address: "",
            chefName:""
        })
        setAcceptTerms(false)
    }

    let handleDelete = async(id) => {
        await axios.delete(`/deleteSpecial/${id}`)
       fetchingSpecial().then(result => setDataSpecial(result)) 


    }

    let handleChangeFilter = (e) => {
        setFilterValue(e.target.value)
       
    }

    let filterData = item =>  item.type.includes(filterValue) || item.showAll.includes(filterValue) 
    let noPublishedMeals = dataSpecial.filter(item => item.type.includes(filterValue) || item.showAll.includes(filterValue))
    console.log("🚀 ~ file: Special.jsx ~ line 60 ~ Special ~ noPublishedMeals", noPublishedMeals)

    let showMyMeals = () => {
        navigate("/showMyMeals")
       
    }

    let handleAcceptTerms = () => {
        setAcceptTerms(!acceptTerms)
    }

    useEffect(() => {
        fetchingSpecial().then(result => setDataSpecial(result)) 
        AOS.init({ duration: 2000 });
    }, [])
    
    useEffect(() => {
        fetchingSpecial().then(result => setDataSpecial(result)) 
     },[value])


  return (
      <article data-aos="fade-down">
          <Header home="Home" menu="Menu" contact="Contact" cart="Cart" book="Book" />
          <div  className="special">
              <div  className="addMeal">
               
                  <form onSubmit={handleSubmit}>
                      <input value={value.meal} required onChange={handleChange} type="text" name="meal" id="" placeholder="Enter the meal's name..." />
                      <input value={value.price} required onChange={handleChange} type="number" name="price" id="" placeholder="Enter the price..." />
                      <input value={value.description} required onChange={handleChange} type="text" name="description" id="" placeholder="Enter the description..." />
                      <input value={value.chefName} required onChange={handleChange} type="text" name="chefName" id="" placeholder="Enter the chef's name..." />
                     
                      
                      <input value={value.tel} required onChange={handleChange} type="number" maxLength={12} name="tel" id="" placeholder='Enter your mobile number(Must be 12 numbers)...' />
                      <input value={value.address} required onChange={handleChange} type="text"  name="address" id="" placeholder='Enter your Address...' />
                      <select required name='type' onChange={handleChange}>
                          <option selected disabled value="">Select the category</option>
                          <option value="meat">Meat</option>
                          <option value="dessert">Dessert</option>
                          <option value="chicken">Chicken</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="drinks">Drinks</option>
                          <option value="bakery">Bakery</option>
                          <option value="fish">Fish</option>
                          <option value="pasta">Pasta</option>
                          <option value="other">Others</option>
                   
                      </select>
                      <label htmlFor="file">
                          <div className="file-text">
                              Upload image
                          <FaCloudUploadAlt/></div>
                          <input required onChange={handleChange} type="file" name="image" id="file" value={value.image} />
                          <h5>{ value.image !== "" && "Image is added"}</h5>
                      </label>
                        
                      <span>
                          <div className="agree">
                              <input onClick={handleAcceptTerms} type="checkbox" name="" id="terms" />
                              <h2>I Agree</h2>
                          </div>
                          <label htmlFor="terms">The published meal or drink MUST NOT include any traces of alcohol or pork or any materials that contain drugs, harmful herbs, or materials that cause allergies or carcinogens </label>
                      </span>

                      <button disabled={!acceptTerms}>
                      <span className='liquidText' >Publish</span>
                        <div class="liquid"></div>
                      </button>


                     
                  </form>

                  <div className="addMealText">
                  <GiHotMeal/>
                  <h1>Add your meal</h1>
                      <p>Publish your meal and get customers, it's a free service</p>
                  </div>
              </div>

              <div data-aos="flip-right" className="background-chef"></div>
              <div className="filter">
                  <button onClick={showMyMeals}>
                 Show my meals
                  </button>
                  <select onChange={handleChangeFilter}>
                      <option selected disabled value="">Filter</option>
                      <option value="meat">Meat</option>
                          <option value="dessert">Dessert</option>
                          <option value="chicken">Chicken</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="drinks">Drinks</option>
                          <option value="bakery">Bakery</option>
                          <option value="fish">Fish</option>
                          <option value="pasta">Pasta</option>
                      <option value="other">Others</option>
                      <option value="showall">Show all</option>
                  </select>
              </div>

              <div className="showMeals">
                  {dataSpecial.filter(filterData).map(item => (
                      <div data-aos="flip-right" className="singleMeal">
                          <h1>{item.meal[0].toUpperCase() + item.meal.slice(1)}</h1>
                          <h3>{item.price.toFixed(2)}€</h3>
                          <h4>Type: {item.type[0].toUpperCase() + item.type.slice(1)}</h4>
                          <h4>Chef's name: {item.chefName }</h4>
                          <h4>Description: {item.description }</h4>
                          <h3>{item.address } <ImLocation/></h3>
                          <a className='imgAnchor'><img src={`${item.image}`} alt="" /></a>
                          <span>
                              <a data-tel={item.tel} title={item.tel} className='callBtn' href={`tel:${item.tel}`}>Call</a>
                              {item.userId === foundUserId && (
                                  <button onClick={()=>handleDelete(item._id)}>Delete</button>
                              )}
                          </span>
                      </div>
                  ))}
                  {noPublishedMeals.length === 0 && <p className='noPublishedMeals'>This selected category is not exist</p> }
              </div>
          </div>
      </article>
  )
}

export default Special