(function() {

    var streaming = false,
        video        = document.querySelector('#video'),
        canvas       = document.querySelector('#canvas'),
        photo        = document.querySelector('#photo'),
        startbutton  = document.querySelector('#startbutton'),
        guardar  = document.querySelector('#guardar'),
        width = 320,
        height = 0;
  
    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);
  
    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );
  
    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
  
    function takepicture() {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
      alert(data);
    }
  
    startbutton.addEventListener('click', function(ev){
        takepicture();
      ev.preventDefault();
    }, false);
  
    $('#photo').Jcrop({
      setSelect: [ 50,50,400,150 ],
      aspectRatio: 1,
      bgColor: 'rgba(73,155,234,0.75)',
      onChange : updatePreview,
      onSelect : updatePreview,
    });

    function updatePreview(c) {
      if(parseInt(c.w) > 0) {
          var canvas = document.getElementById("preview");
          canvas.setAttribute("width", "100");
          canvas.setAttribute("height", "100");
          // Muestra preview de Imagen
          var imageObj = $("#photo")[0];
          var canvas = $("#preview")[0];
          var context = canvas.getContext("2d");
          context.drawImage(imageObj, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
          var d = canvas.toDataURL('image/png');
          $("#base64").text(d);
      }
    }

    guardar.addEventListener('click', function(ev){
      document.getElementById("b").src = $("#base64").text();  
    ev.preventDefault();
  }, false);

    

  })();

  