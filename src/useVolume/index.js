import { useRef, useEffect } from 'react';

var handleSuccess = function (stream) {

};

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(handleSuccess);

function useAudio(callback) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  })

  useEffect(() => {
    function tick(data) {
      savedCallback.current(data);
    }
    let ctx;
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((stream) => {
        var context = new AudioContext();
        ctx = context;
        var source = context.createMediaStreamSource(stream);
        var processor = context.createScriptProcessor(1024, 1, 1);

        source.connect(processor);
        processor.connect(context.destination);
        let currentVolume = 0
        processor.onaudioprocess = function (e) {
          // Do something with the data, i.e Convert this to WAV
          var buf = e.inputBuffer.getChannelData(0);
          var bufLength = buf.length;
          var sum = 0;
          var x;

          // Do a root-mean-square on the samples: sum up the squares...
          for (var i = 0; i < bufLength; i++) {
            x = buf[i];
            if (Math.abs(x) >= this.clipLevel) {
              this.clipping = true;
              this.lastClip = window.performance.now();
            }
            sum += x * x;
          }

          // ... then take the square root of the sum.
          var volume = Math.floor(Math.sqrt(sum / bufLength) * 100);
          
          if(currentVolume !== volume) {
            tick(volume);
            currentVolume = volume
          }
          

        };
      })
    return () => ctx.close()
  }, [])
}

export default useAudio;
