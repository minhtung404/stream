

    let configHostTurn;
    $.ajax ({
        url: "https://global.xirsys.net/_turn/streamsturn/",
        type: "PUT",
        async: false,
        headers: {
          "Authorization": "Basic " + btoa("tungamg:b6af8e26-710d-11e7-bee9-b3e63005ef04")
        },
        success: function (res){
         configHostTurn = res.v.iceServers;

        }
    });



function openStream() {
    const config = { audio: false, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
}


// doan nay tuong duong voi doan
// openStream().then(function(data){
//   playStream('localStream',data);
// });

configCusTurn = {'iceServers': [
    //{ url: 'stun:m2.xirsys.com' },
    { url: 'turns:m2.xirsys.com:443?transport=tcp', username:'e24ce2bc-71e5-11e7-9439-ff66f229d7e9', credential: 'e24ce366-71e5-11e7-a101-5ff253e2b010' }
  ]}

//openCamera();
var peer = new Peer({

  host:'peerservermemo.herokuapp.com',
  secure:true,
   port:443,
   debug:3,
  config:configCusTurn
});
peer.on('open',function(data){
  $('#myPeer').html(data);
});

//Nguoi goi
$('#btnCall').click(function(){
        var idNguoiGoi = $('#txtIdNguoiGoi').val();

        openStream().then(stream=>{


            // Hien thi video cua nguoi nhan
            // play chinh minh
            playStream('localStream',stream)
            var  call = peer.call(idNguoiGoi,stream);
            // khong can lang nghe data(video) cua tong dai
            //call.on('stream',dataStream=>playStream('localStream',dataStream));
        });


});

// Nguoi nhan
peer.on("call",call=>{
        openStream().then(stream=>{
          call.answer(stream);
          // Tong dai khong can stream chinh minh
          //playStream('localStream',stream)
        //  console.log(stream);
          call.on('stream',dataStream=>{
            playStream('traLoi',dataStream)
          //  console.log("dataSteam"+dataStream);
          });

        });
});
