# video - 15 start
 user.models.js mai aap ko refreshToken dikhega 
humne doh tokens banaye h getaccessToken and getrefreshtoken


# accessToken tohda short lived hote h  (short terms mai expire kr deya jata h)
# refreshToken tohda long lived hote h (long terms mai expire kr deya jata h)

================imp====================
 jub tak aapke pass accessToken h tub tak koi bhi feature jaha pe aapke authentication (login ho) ke requirement h vha per aap access kr sakhte h us resource ko  means--> aager aap authenticated ho ya login ho toh app file ko add kr sakhte ho.

aager mera login secession maine 15min mai he expire kr deya kisi security reason sai toh aap ko fir 15min baad fir sai login krna padege or password bhi daalna padege yahe per aata h refreshToken aab jo refreshToken h ye hum database mai save krte h or user ko bhi date h user ko validate ko access token sai he krte h but aap ko baar baar password na daalna pade toh aager aapke pass refresh token h na toh end point hit kr do vha sai jo aapke pass refresh token h or mare database mai jo refresh token h aager ye dono same hue toh kaam ho jayege or aapko ek new access token bhi mil jayega. 




step-1 accessToken or refreshToken ko use krke aab hum login banayenge  (controllers/user.controller.js)
jaise registerUser banaya tha vaise he login bhi hoga

# loginUser ka process

step-1 req body --> data (req body sai data lai aao);
step-2 username or email (ke aap kis sai access daine chate ho user ko username sai ke email sai);
step-3 find the user (user ko bhi check krna hoge ke user h ke ne h aager nhi h toh user ko login krna hoga or h toh password check karao);
step-4 password check (password check ho gya toh access and refresh token dono he generate krunge or user ko bhejunga)


step-5 access and refresh token  (aab en token ko bhej doh jmostly hum cookies mai bhejte h)
abb jo ye access and refresh token h ye baar baar use honge toh hum esai hum ek meathod mai daal dange toh pehle hume userid pass krana padega 

aab jub pura method complete ho jayega toh aapko access and refresh token mil jayega or aap login mai es token ko use kr skte ho function kai through getaccesstokenandrefereshtoken(refereshToken, accessToken) await ka use kr ke


step-6 send cookie
step-7 respone bhej toh ke successfull ho gya


loggedInUser toh ho gye aab logOutUser bhi krna hoga
step-1 hume saare cookies bhi haatane hoge (kyuke ye server sai he manage hote h hhtp: only)


step-2 hume user.models.js sai refreshToken ko remove krna hoga jo User data mai h
        refreshToken: {
            type: String,
        },

step-3 aab hume kudh ka middleware banana hoga in auth.middleware.js mai
aab mai accessToken and refreshToken kai bases per he toh varify krunge ke sahi token h ke ne h vo he toh true login hua.
aager ture login h toh mai req.body kai under ek new object login kr dunga


step-4 hum postman mai key = Authorization aur value = Bearer <token>

step-5 token ka access a gya h vaise nhi mila toh apierror show kr deya h 

step-6 aab humne jo saare information bhage thi getaccesstoken (user.models.js) mai toh hume ye saare information vapass lane hoge 
return jwt.sign(
    {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    },) ye waale information


    ye pura hone ke baad 

    step-7 routes mai jana h 





  ==================== video 16 ======================


  aab aager user ko refresh token ko refresh krna hoga toh es video mai hum ye he karange ke vo kaise aapna token kaise refresh kre 
  hum user ka phale wala token aager backend sai match ho gya toh hum uska token refresh kr sakhte h 

  step:1 kaise refresh kr sakhte h token ko refresh toh hum cookies sai access kr sakhte h or koi mobile sai access kr rha ho toh hum use krange req.body.refreshtoken

  step:2 user.controller.js mai h 

step:3 router mai daal doh