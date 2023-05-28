require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
console.log("v1", process.env.STRIPE_SECRET_KEY);
console.log("v2", process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  console.log("helloaa");
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      status: 400,
      body: JSON.stringify({ error }),
    };
  }
};
