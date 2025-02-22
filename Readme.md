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



summary humne ek controller likha tha jo response deta tha message mai hume ye postman mai use keya


imp:
yaha per hume user.controller.js mai jo bhi message humne pass ke  or jo app.js hai esmai hume ek prefix set kra deya h router ka or user.routes.js mai hume usko route kr deya means ke /register, /login ka use krke hume us page mai pahucha dega toh video 12 mai humne ye keya. 









-----------------------------------------------------------------------------------------------------------------------------


# video 13 start
# Logic Building and register controller

es video mai hum bs user ko register krange or uske logic building krne hain. imp

 jo message humne user.controller.js mai likha tha hum usko comment kragne or uski jagaha hum logic building krange user ko register krne ke liye.

step:1 user.controller.js mai hum get user details bhejange or mai use krunge req.body
aab postman mai jakar http localhost daalo register router mai  hum body mai row, json ke form mai email , password likhe toh vo hume console mai email, password dai dega.




step:2 aab step1 ko dekhe toh vha hume bs data handle keya h toh aab hum validation sai pehle files bhi handle krange
hum jo ye middlewares/ multer.middleware.js hai esmai hum upload kai under jo storge h usko hum import kr dange routes/user.routes.js mai (files handle kai liye)

aab user.routes.js mai jo /register h hum vha per upload krange 
upload.field ka use krke field hume bhi ek array deta h
registeruser ko hata dange or uske jagaha upload.field ka use hoga files k liye(jo requirement ke hishab sia jo bhi file h usko object mai rakh doh)




step:3 validation - not empty (humne password empty bhej deya toh vo he validate krange or jaise email thik h ke ne h jaise .com @ use ho rha h ke ne);
toh pehle toh hum utils/Apierror.js ko import kr dange user.controller.js mai



step:4 check if user already exists - username, email  (check kro ke user exist krta h ke ne krta pehle se)
models/user.models.js mai jo User h usko import kra dange user.controller.js mai.
or check bhi krange


step:5 (upload bhi kr deya or aab check bhi kr lo ke avatar aaya ke ne) aab hume avatar, images bhi check krna hoge ke kahi vo already exist toh ne krta jaise middleware mai hume data mai req.body deta h vaise he multer mai hume req.files ka access deta h (in user.controller.js)

step: 6 aab hum avatar ko cloudinay per upload krange or check bhi krna hoga (import kr do cloudinary.js ko user.controller.js mai)


step: 7 aab jub saara kaam ho gye h toh aab object banao or db mai entry maar doh (or ye he User h toh data base sai baat kr rha h)
jub hume export keya tha toh (export const User = mongoose.model("User", userSchema);) toh vha mongoose.model bhi tha.
but hume toh coverImage toh check he ne keya toh hum usko yahi he check kr lange  (in user.conroller.js)

aab ye bhi check krna hoga ke create hua ke ne hua toh esai ek specific _id hote h esai hum user ko find krange ke vo exist krta h 
or esmai hum .select ka use bhi kr sakte hain ke hume kya kya ne chahiye,  string kai under

step: 8 remove password and refresh token from response bhi kr deya .select ka use krke ke hume kya kya ne chahiye

 step: 9 check bhi kr leya user creation ka

step: 10 return response -------> (aager create ho gya h toh return response, else return error)  
import kr dange ApiResponse ko user.controller.js mai
