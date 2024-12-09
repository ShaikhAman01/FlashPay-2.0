"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to:string, amount:number) {
 const session = await getServerSession(authOptions);
 const fromUser = session?.user?.id;
 if(!fromUser) {
   return {message: "Unauthenticated request"};
 }
 const toUser = await prisma.user.findFirst({
    where:{
        number: to
    }
});
if(!toUser) {
    return {message: "User not found"};
}
await prisma.$transaction(async(tx)=>{
    const fromBalance = await tx.balance.findUnique({
        where: {
            userId: Number(fromUser)
        }
    });
    if(!fromBalance || fromBalance.amount < amount) {
        return {message: "Insufficient balance"};
    }
    await tx.balance.update({
        where: {
            userId: Number(fromUser)
        },
        data: {
            amount: {decrement:amount}
        }
    });
    await tx.balance.update({
        where: {
            userId: toUser.id
        },
        data: {
            amount: {increment:amount}
        }
    });
})
}