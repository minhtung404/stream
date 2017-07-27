

    let configHostTurn;
    $.ajax ({
        url: "https://global.xirsys.net/_turn/streamsturn/",
        type: "PUT",
        async: false,
        headers: {
          "Authorization": "Basic " + btoa("tungamg:b6af8e26-710d-11e7-bee9-b3e63005ef04")
        },
        success: function (res){
        //  configHostTurn = res.v.iceServers;
          console.log("ICE List: "+res.v);
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



 configHostTurn={ 'iceServers': [{ url: 'stun:stun01.sipphone.com' },
{ url: 'stun:stun.ekiga.net' },
{ url: 'stun:stun.fwdnet.net' },
{ url: 'stun:stun.ideasip.com' },
{ url: 'stun:stun.iptel.org' },
{ url: 'stun:stun.rixtelecom.se' },
{ url: 'stun:stun.schlund.de' },
{ url: 'stun:stun.l.google.com:19302' },
{ url: 'stun:stun1.l.google.com:19302' },
{ url: 'stun:stun2.l.google.com:19302' },
{ url: 'stun:stun3.l.google.com:19302' },
{ url: 'stun:stun4.l.google.com:19302' },
{ url: 'stun:stunserver.org' },
{ url: 'stun:stun.softjoys.com' },
{ url: 'stun:stun.voiparound.com' },
{ url: 'stun:stun.voipbuster.com' },
{ url: 'stun:stun.voipstunt.com' },
{ url: 'stun:stun.voxgratia.org' },
{ url: 'stun:stun.xten.com'}]
        }
//openCamera();
var peer = new Peer({

  host:'peerservermemo.herokuapp.com',
  secure:true,
   port:443,
   debug:3,
  config:{ 'iceServers': [{ url: 'stun:stun01.sipphone.com' },
 { url: 'stun:stun.ekiga.net' },
 { url: 'stun:stun.fwdnet.net' },
 { url: 'stun:stun.ideasip.com' },
 { url: 'stun:stun.iptel.org' },
 { url: 'stun:stun.rixtelecom.se' },
 { url: 'stun:stun.schlund.de' },
 { url: 'stun:stun.l.google.com:19302' },
 { url: 'stun:stun1.l.google.com:19302' },
 { url: 'stun:stun2.l.google.com:19302' },
 { url: 'stun:stun3.l.google.com:19302' },
 { url: 'stun:stun4.l.google.com:19302' },
 { url: 'stun:stunserver.org' },
 { url: 'stun:stun.softjoys.com' },
 { url: 'stun:stun.voiparound.com' },
 { url: 'stun:stun.voipbuster.com' },
 { url: 'stun:stun.voipstunt.com' },
 { url: 'stun:stun.voxgratia.org' },
 { url: 'stun:stun.xten.com'},
    ]}
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
