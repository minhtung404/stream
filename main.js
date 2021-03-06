


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

var configCusTurn = {'iceServers': [
    { 'url': 'stun:s3.xirsys.com' },
    { 'url': 'turns:s3.xirsys.com:443?transport=tcp', 'credential': 'e24ce366-71e5-11e7-a101-5ff253e2b010', 'username':'95317418-7297-11e7-87fd-910e59c87121' },

  ]} /* Sample servers, please use appropriate ones */

  var confidStunTwili = {'iceServers': [
    {"url":"stun:global.stun.twilio.com:3478?transport=udp"},
    {"url":"turn:global.turn.twilio.com:3478?transport=udp","username":"3d20688b413cf1e6da7e84530c38fdeb9e171ed4f4e269cd2eb61a78a4894a78","credential":"mIY0U8SWx9bkJhy+yjn+tsEmtjZBf+e0ZXugFhrHDuU="},{"url":"turn:global.turn.twilio.com:3478?transport=tcp","username":"3d20688b413cf1e6da7e84530c38fdeb9e171ed4f4e269cd2eb61a78a4894a78","credential":"mIY0U8SWx9bkJhy+yjn+tsEmtjZBf+e0ZXugFhrHDuU="},
    {"url":"turn:global.turn.twilio.com:443?transport=tcp","username":"3d20688b413cf1e6da7e84530c38fdeb9e171ed4f4e269cd2eb61a78a4894a78","credential":"mIY0U8SWx9bkJhy+yjn+tsEmtjZBf+e0ZXugFhrHDuU="}

    ]} /* Sample servers, please use appropriate ones */


//openCamera();
var peer = new Peer({

   host:'peerservermemo.herokuapp.com',
   secure:true,
   port:443,
   debug:3,
   config: confidStunTwili
});
peer.on('open',function(data){
  $('#myPeer').html(data);

});

//Nguoi goi
$('#btnCall').click(function(){
        var idNguoiGoi = $('#txtIdNguoiGoi').val();

        openStream().then(stream=>{

            playStream('localStream',stream)
            // Hien thi video cua nguoi nhan
            // play chinh minh

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
