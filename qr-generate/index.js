const express = require('express');
const qr_code = require('qrcode')
const app = express();


// body purser
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

// routes 

app.get("/", (req, res) => {
  const count = 12;
  res.render('index', { QR_Code: '' })
})

app.post('/', (req, res) => {
  const { url } = req.body
  if(url){
    var opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 0.3,
      margin: 1,
      color: {
        dark: "#010599FF",
        light: "#FFBF60FF"
      }
    }
    qr_code.toDataURL(url, opts, function (err, src) {
      if (err) { res.send(err); console.log(err); }
      var file_path = "store/" + Date.now() + ".png";
      qr_code.toFile(file_path, url,{
        color: {
          dark: '#000',  // Black dots
          light: '#0000' // Transparent background
        }
      });
      res.render('index', { QR_Code: src, img_src: file_path });
    });
  }
})
app.get('/download',(req,res)=>{
  console.log(req.query.file_path);
  res.download(req.query.file_path);
  res.redirect('/');
})
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});