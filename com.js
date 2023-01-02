/**
 * COM-port használata JS-ből
 */

 "use strict";
 class SerialScaleController {
     constructor() {
         this.encoder = new TextEncoder();
         this.decoder = new TextDecoder();
     }
     
     async init() {
         if ('serial' in navigator) {
             try {
                 const port = await navigator.serial.requestPort();
                 await port.open({ baudRate: 9600 });
                 this.reader = port.readable.getReader();
                 let signals = await port.getSignals();
                 console.log(signals);
             }
             catch (err) {
                 console.error('There was an error opening the serial port:', err);
             }
         }
         else {
             console.error('Web serial doesn\'t seem to be enabled in your browser. Try enabling it by visiting:');
             console.error('chrome://flags/#enable-experimental-web-platform-features');
             console.error('opera://flags/#enable-experimental-web-platform-features');
             console.error('edge://flags/#enable-experimental-web-platform-features');
         }
     }
     async read() {
         try {
             const readerData = await this.reader.read();
             //console.log(readerData);
             //csak az első 12 karakter kell!!!
             var sKartyaszam = this.decoder.decode(readerData.value);
             if ( sKartyaszam.length < 12 ) {
                 sKartyaszam = "";
             } else {
                 sKartyaszam = sKartyaszam.substr(0,12);
             }
             return sKartyaszam.trim();
         }
         catch (err) {
             const errorMessage = `error reading data: ${err}`;
             console.error(errorMessage);
             return errorMessage;
         }
     }
 }