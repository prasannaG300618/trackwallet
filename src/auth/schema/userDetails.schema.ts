import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document , Types} from 'mongoose';


export type userDetails = User & Document<Types.ObjectId>

@Schema()
export class User{
    @Prop({type:String, required:true})
    userName;
    @Prop({type:Number, default:0, required:false})
    cash;
    @Prop({type:Number, default:0, required:false})
    bankAccount;
    @Prop({type:Number, default:0, required:false})
    balance;
    @Prop({type:Array, default:["Food & Drinks", "Shopping", "Housing", "Bills"], required:false})
    expensiveCategories;
    @Prop({type:Array, default:["salary", "gifts", "other"], required:false})
    incomeCategories;
    @Prop({type:Date, default:new Date(), required:false})
    date;
    @Prop({type:Object, default:[{}] })
    expenditureTracking;
    @Prop({type:Object, default:[{}] })
    incomeTracking;
    @Prop({type:Array, default:[{}]})
    transaction;
}

export const userDetailsSchema = SchemaFactory.createForClass(User)