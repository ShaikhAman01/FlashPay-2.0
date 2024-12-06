import express from "express";
import db from "@repo/db/client";
const app = express();

app.post("/hdfcWebHook", async (req, res) => {
  //Todo: add zod validation here
  //Todo: check if this came from hdfc webhook , use a webhook secret
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  // update balance in db, add txn
  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            //can get from db too
            increment: Number(paymentInformation.amount),
          },
        },
      }),

      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({ msg: "Captured" });
  } catch (error) {
    console.log(error);
    res.status(411).json({
      msg: "Error while processing webhook",
    });
  }
});

app.listen(3003);
