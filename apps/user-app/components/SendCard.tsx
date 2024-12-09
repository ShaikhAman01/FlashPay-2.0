"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";


export const SendMoney = () =>{
    const [number,setNumber] = useState("");
    const [amount,setAmount] = useState("");
   
   return <div className="h-[90vh]">
    <Center> 
    <Card title="Send">
        <div className="min-w-72 pt-2 bg-white rounded-md p-5">
            <TextInput label={"Number"} placeholder={"1234567890"} onChange={(e) => {
                setNumber((e))
}} />
           <TextInput label={"Amount"} placeholder={"₹ (In Rupees)"} onChange={(e) => {
                setAmount((e))
}} />

<div className="flex justify-center pt-4">
    <Button onClick={async()=>{
        //send money to the number
        await p2pTransfer(number,Number(amount)*100);
    }}>Send</Button>
</div>
        </div>
    </Card>
    </Center>

   </div>
   
}