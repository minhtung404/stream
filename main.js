// and override the original config object
var customConfig;

// Call XirSys ICE servers
$.ajax({
  url: "https://global.xirsys.net/_turn/streamsturn/",
  data: {
    ident: "tungamg",
    secret: "b6af8e26-710d-11e7-bee9-b3e63005ef04",
    domain: "minhtung404.github.io/stream/home.html",
    application: "default",
    room: "default",
    secure: 1
  },
  success: function (data, status) {
    // data.d is where the iceServers object lives
    customConfig = data.d;
    console.log(customConfig);
  },
  async: false
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



//console.log("1--:"+configHostTurn);
//openCamera();
var peer = new Peer({key:'peerjs', host:'peerservermemo.herokuapp.com', secure:true, port:443, config:customConfig});
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
          call.on('stream',dataStream=>playStream('traLoi',dataStream));
        });
});
