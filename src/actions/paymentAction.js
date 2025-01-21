import axios from "axios";


export const topUp = (amount) => async (dispatch) => {
   let url = `${process.env.REACT_APP_BACKEND_URL}/api/payment/create_payment/`;
   try {
     const response = await axios.post(url, {
      amount  // Assuming 'amount' is the data you're sending
      }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
     const paymentUrl = response.data.url;
     window.location.href = paymentUrl; // Redirect to HitPay's payment page
   } catch (error) {
     console.error("Payment initiation failed", error);
   }
};
