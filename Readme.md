video 12 start 

step:1 create file ./controller/user.controller.js
step:2 import asyncHandler

step:3 ye methode user ko register karega

ye jo humne registerUser bnaya h ye kub hit hoga jub hum url set krange or vo hum router mai set krage toh we will move on router folder


step:4 create ./routes/user.routes.js file  (import routes)

step:5 jo ye routes, registerUser j esko hum app.js mai import krange

step:6 routes declaration in app.js  
hum app.get ka use bhi kr skte hain lekin eskai liye hi routes and controller bhi yahi linkhna padege but humne toh alag folder banaya ha toh us router ko laane k liye middleware use krna hoge app.use.

step:7 or hum aapna route user.roter.js mai likhange.


jo hume app.js mai use keya h na app.use or uske under humne /user bhi likha hain vo ek /user waala ek prefix h or aager hume eskai aage /user kai baad hume koi bhi route set krna hoge toh hume ye krna hoga # (eg router.route("/register").post(registerUser))
user/register

[http://](http://localhost:8000/users/register)



step:8 suppose hume login method bnana hoge toh hum baar bar use ne karna hoge /user hum direct routes mai jaker direct 
 router.route("/login").post(login) kr sakte h
               route         method


step:9 aab hum check kaise kre ke ye jo userRegister mai json kai uder jo bhi data h usko kha dekhe toh hum use krange postman

step:10 ye http://localhost:8000/api/v1/users/register  request marne h postman mai post request