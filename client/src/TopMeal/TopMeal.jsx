import React from 'react'
import { useContext } from 'react'
import { context } from '../Context'
import "./topMeal.scss"

function TopMeal() {
    let { data } = useContext(context)
    let findTopMeal = data.find(item => item.name === "kabsa")
    console.log("🚀 ~ file: TopMeal.jsx ~ line 8 ~ TopMeal ~ findTopMeal", findTopMeal)

    return (
        <div
            div data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="2000"

            className='topMealContainer'>
            <h1>
                Top Meal
            </h1>
            <div className='topMeal'>

                <div className="leftSide">
                    <a><img src={findTopMeal?.img} alt="" /></a>
                </div>
                <div className="rightSide">
                    <h1>{findTopMeal?.name[0].toUpperCase() + findTopMeal?.name.slice(1)}</h1>
                    {findTopMeal?.ing?.map(item => (
                        <p>{item}</p>
                    ))}
                    <h3>{findTopMeal?.price}€</h3>
                </div>
            </div>
        </div>
    )
}

export default TopMeal