const functions = require('firebase-functions');
const cors =  require('cors')({orign: true});
const admin = require('firebase-admin');

admin.initializeApp();

const database1 = admin.database().ref("/bloodBank");


exports.testingaddBloodbank = functions.https.onRequest((req, res)=> {
  return cors(req, res, ()=> {
    if(req.method !== 'POST'){
      return res.status(401).json({
        message: 'Not allowed'
      })
    }

        database1.push({
            name: req.body.name,
            contactNumber: req.body.contactNumber,
            manager: req.body.manager,
            capacity: req.body.capacity,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            address: req.body.address
        });

        let users = [];
        database1.on('value', (snapshot)=> {
          snapshot.forEach((user)=> {
            users.push({
              bankname: user.val().name,
              bankcontactNumber: user.val().contactNumber
            });
          });
          res.status(200).json(users);
        }, (error)=>{
          res.status(error.code).json({
            message: `Something went wrong: ${error.message}`
          })
        })
  });
});

let database2 = admin.database().ref("/users");


exports.testingadduser = functions.https.onRequest((req, res)=> {
  return cors(req, res, ()=> {
  if(req.method !== 'POST'){
    return res.status(401).json({
      message: 'Not allowed'
    })
  }

    database2.push({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        age: req.body.age,
        fcmId: req.body.fcmId,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        bloodGroup: req.body.bloodGroup,
        address: req.body.address,
        password: req.body.password
    });

    let users = [];
    database2.on('value', (snapshot)=> {
      snapshot.forEach((user)=> {
        users.push({
          username: user.val().name,
          userPhoneNumber: user.val().phoneNumber
        });
      });
      res.status(200).json(users);
    }, (error)=>{
      res.status(error.code).json({
        message: `Something went wrong: ${error.message}`
      })
    })
})
})

let database3 = admin.database().ref("/events");

exports.testingaddevent = functions.https.onRequest((req, res)=> {
  return cors(req, res, ()=> {
  if(req.method !== 'POST'){
    return res.status(401).json({
      message: 'Not allowed'
    })
  }

    database3.push({
        campName: req.body.campName,
        phoneNumber: req.body.phoneNumber,
        date: req.body.date,
        time: {
          start: req.body.stime,
          end: req.body.etime
        },
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        address: req.body.address
    });

    let users = [];
    database3.on('value', (snapshot)=> {
      snapshot.forEach((user)=> {
        users.push({
          campName: user.val().campName,
          userPhoneNumber: user.val().phoneNumber
        });
      });
      res.status(200).json(users);
    }, (error)=>{
      res.status(error.code).json({
        message: `Something went wrong: ${error.message}`
      })
    })
})
})

let database4 = admin.database().ref("/capacity");
exports.testingbloodContent = functions.https.onRequest((req, res)=> {
return cors(req, res, ()=> {
if(req.method !== 'POST'){
  return res.status(401).json({
    message: 'Not allowed'
  })
}

  database4.push({
      bankName: req.body.bankName,
      content: {
        on: req.body.on,
        op: req.body.op,
        an: req.body.an,
        ap: req.body.ap,
        abn: req.body.abn,
        abp: req.body.abp,
        bn: req.body.bn,
        bp: req.body.bp,
      }
  });

  let users = [];
  database4.on('value', (snapshot)=> {
    snapshot.forEach((user)=> {
      users.push({
        bankName: user.val().bankName,

      });
    });
    res.status(200).json(users);
  }, (error)=>{
    res.status(error.code).json({
      message: `Something went wrong: ${error.message}`
    })
  })
})
})

let database5 = admin.database().ref("/urgent");

exports.addurgent = functions.https.onRequest((req, res)=> {
  return cors(req, res, ()=> {
    if(req.method !== 'POST'){
      return res.status(401).json({
        message: 'Not allowed'
      })
    }

        database5.push({
            name: req.body.name,
            contactNumber: req.body.contactNumber,
            bloodGroup: req.body.bloodGroup,
            limit: req.body.limit,
            address: req.body.address
        });

        let users = [];
        database5.on('value', (snapshot)=> {
          snapshot.forEach((user)=> {
            users.push({
              name: user.val().name,
              contactNumber: user.val().contactNumber
            });
          });
          res.status(200).json(users);
        }, (error)=>{
          res.status(error.code).json({
            message: `Something went wrong: ${error.message}`
          })
        })
  })
})



exports.getStats = functions.https.onRequest((req, res)=> {
    const userref = admin.database().ref('/capacity');
    let content={};
    // let bankname = req.params.bankName;

    userref.orderByChild("bloodBank").equalTo("greencross society").on("child_added", function(snap){
      content = snap.val();
      // console.log(snap);

    })
    return res.status(200).json(content);

  })



  exports.updatebankRecord = functions.https.onRequest((req, res)=>{
    return cors(req, res, ()=> {
      if(req.method !== 'PUT'){
        return res.status(401).json({
          message: 'Not allowed'
        })
      }
      const dbase = admin.database().ref("capacity");
      dbase.on('value', (snapshot)=>{
        snapshot.forEach((user)=>{
          if(req.body.bankname === user.val().bankName){
            user.val().on = req.body.on,
            user.val().op = req.body.op,
            user.val().an = req.body.an,
            user.val().ap = req.body.ap,
            user.val().abn = req.body.abn,
            user.val().abp = req.body.abp,
            user.val().bn = req.body.bn,
            user.val().bp = req.body.bp
          }
        })
        res.status(200).send();
      })

    })
  })

  exports.giveInfoee = functions.https.onRequest((req, res)=>{
    return cors(req, res, ()=> {
      if(req.method !== 'GET'){
        return res.status(401).json({
          message: 'Not allowed'
        })
      }
      let test = [];
      // console.log("reqest params .....................", req.params);
    //   return res.status(200).json(req.query.bankName)
      let required = [];
      const dbase = admin.database().ref("capacity/");
      dbase.on('value', (snapshot) => {
        snapshot.forEach((user) => {
          test.push(user);


          // var b = req.params.bankName;
          if(user.val().bankName == req.query.bankName) {
            required.push(user.val());
          }
        })
        res.status(200).json(required);

      }, (error)=>{
        res.status(error.code).json({
          message: "something went wrong"
        })
      })
    })
  })

  exports.doquery = functions.https.onRequest((req, res)=>{
    let userref = admin.database().ref('capacity');
    return res.status(200).json(userref);
    let s = {}
    userref.on('value', function(snap){
      s = snap.val();
    })
  })

  exports.getfcmtoken = functions.https.onRequest((req, res)=>{
    return cors(req, res, ()=> {
      if(req.method !== 'GET'){
        return res.status(401).json({
          message: 'Not allowed'
        })
      }
      const dbase = admin.database().ref("users/");
      let tokens = [];
      dbase.on('value',(snapshot)=>{
        snapshot.forEach((user)=>{
          tokens.push({
            tokenId: user.val().fcmId,
            bloodgroup: user.val().bloodGroup
          })
        })
      res.status(200).json(tokens);
    },(error)=>{
      res.status(error.code).json({
        message:"something went wrong"
      })
    })
    })
  })

exports.checkLogin = functions.https.onRequest((req, res)=>{
  return cors(req, res, ()=> {
    if(req.method !== 'POST'){
      return res.status(401).json({
        message: 'Not allowed'
      })
    }

    var valid = 0;
    const dbase = admin.database().ref("users")
    dbase.on("value", (snapshot)=>{
       snapshot.forEach((user)=>{
         if((user.val().phoneNumber == req.body.phoneNumber) && (user.val().password == req.body.password)){
           valid = 1;
         }
       })
       if(valid == 1)
       res.status(200).json();
       else{
         res.status(400).json(req.body.phoneNumber);
       }
    })
  })
})
