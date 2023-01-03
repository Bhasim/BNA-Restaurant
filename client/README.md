<!--! BEFORE WE START, ALAWAYS PULL FIRST -->

<!--! Branch final-branch Mustn't be touched -->
<!--! When u r done with your branch, u can push to branch (main) -->
<!--! Pull , git pull origin main -->
<!--! git push origin YOUR_BRANCH -->
<!--! Your Pushes must be to main -->

# Branches
git checkout -b YOUR_BRANCH
git add . && git commit -m "update" 
git push origin YOUR_BRANCH

## Merge
git checkout main
git merge YOUR_BRANCH

## Delete branch
git checkout main
git branch -D YOUR_BRANCH

## to know which branch
git branch

<!-- ================================================================= -->
# the shape of the object
{
    username:anwar,
    email:132,
    password:123456,
    <!-- chat:["this is the message from the cheff"], -->
    <!-- book:{date:"",time:""}, -->
    cart:[
     <!-- we put the meal in here, edit the quantitiy only in here, the rate will be edit it only in the main object (increament) -->
    ],
    comment:"",
    missedMessage:false,
    gender:"male/female",
    old:"min 15",
    
},


<!-- {
    username:Cheff,
    email:132,
    password:123456,
    chat:[
        {object of each user , chat:["this is the message from the user1"]},
        {object of each user , chat:["this is the message from the user2"]},
        {object of each user , chat:["this is the message from the user3"]},
    ],
}, -->
<!-- ===================================== Food ============================= -->
{
    name:"rice and bazalia",
    img:"",
    ing:["","","",""]
    type:"vegiterian",
    price:20,
    quantity:1
    <!--! rate:1,   important -->
}





Book
<!-- <Header menu={<Menu/>} Cart={<Cart/>} /> -->



# website points
## landing page // bahaa
1- welcome popup
2- header (logo,navigation)
3- baner (slideshow)
4- Map
- fixed background
- chatbot fixed on the b10%, r10%
5- About us
6- footer
## menu // bahaa …
1- header
2- top meal
3- the menu includes the kinds of foods and drinks
- top rated food
4- footer
## the foods // anwar
1- all kinds of the clicked category by useParams, includes the decription and the picture and the price
2- when its clicked it guide to the pop up , add to cart and increase the quantity.
## reservation // anwar
1- header
2- select date
3- the reviews about the resturant of the users : comments
4- footer
## cart // nievein
1- the foods, next to it the quantity , as it seems in the design
## registeration // nievein
1- the register, as it seems in the design

## Chatbot // nievein

## For the cheff , there will be a page for the chat of the whole customers
<!-- ============================================================================================== -->
the dark color #242424
the gold color #CFBC69 

the box border radius is 20px
the buttons border radius is 10px

<!--! this is important  -->
## when user buy then the meal rate will increase for each buy