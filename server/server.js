const express = require("express");
const cors = require("cors");
const port = 8000;
const db_name = "amazonclone";
const stripe = require("stripe")(
    "sk_test_51HZj2ACCt3DDJtadB3fd3BCI1iFgRm1wWK0RSYqOrVAoIGFXXDAOwm9zvOzpUtPscbr7kkMiPCFjVoOS3g00dfH600iwVVOvBk"
);
    
const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

require("./config/mongoose")(db_name);
require("./routes/User.routes")(app);
require("./routes/Product.routes")(app);
require("./routes/History.routes")(app);

app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
    const total = request.query.total * 100;
  
    console.log("Payment Request Recieved! Amount >>> ", total);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });
  
    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
});

app.listen(port, ()=> console.log(`Listening on port ${port}`))