import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here
    //TODO: token should come from bank
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    console.log("Payment Information:", paymentInformation);


    try {
      console.log("Starting transaction...");
      const existingTransaction = await db.onRampTransaction.findFirst({
          where: {
          token: paymentInformation.token,
          status: "Processing"
          }
      });

      if (!existingTransaction) {
          return res.status(400).json({
          message: "Invalid or already processed token"
          });
      }


        const result = await db.$transaction([
            db.balance.update({ 
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        //  can also get this from  DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);
        console.log("Transaction Result:", result);


        res.json({
            message: "Captured"
        })
    } catch(e) {
      console.error("Transaction Error:", e);
      res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);