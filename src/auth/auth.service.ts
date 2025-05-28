import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/userDetails.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/userDetails.dto';
@Injectable()
export class AuthService {
  constructor(@InjectModel('userDetails') private userModel: Model<User>) {}
  async login(loginCredential) {
    return await this.userModel.findOne({ userName: loginCredential });
  }
  registerUser(userData: userDto) {
    return this.userModel.create(userData);
  }

  async customExpenditure(userName:string,newvalue:string, type:string){
    type === "expenditure"?
    await this.userModel.findOneAndUpdate({userName:userName},{$push:{expensiveCategories: newvalue}}):
    await this.userModel.findOneAndUpdate({userName:userName},{$push:{incomeCategories:newvalue}})
    return await this.login(userName)
  }

  async transaction(
    value: number,
    type: string,
    userName: string,
    source: string,
  ) {
    let date = new Date();
    if (type === 'income') {
       await this.userModel.findOneAndUpdate({ userName: userName }, [
        {
          $set: {
            balance: { $add: ['$balance', value] },
            cash: { $add: ['$cash', value] },
          },
        },
        {
          $set: {
            transaction: {
              $concatArrays: [
                '$transaction',
                [
                  {
                    balance: '$balance',
                    date: new Date().getDate(),
                    time: new Date().getTime(),
                    method: type,
                    amount: value,
                  },
                ],
              ],
            },
          },
        },
        {
          $set: {
            incomeTracking: {
              $mergeObjects: ['$incomeTracking', { [source]: value }],
            },
          },
        },
      ]);
    } else {
       await this.userModel.findOneAndUpdate({ userName: userName }, [
        {
          $set: {
            balance: { $add: ['$balance', -value] },
            cash: { $add: ['$cash', -value] },
          },
        },
        {
          $set: {
            transaction: {
              $concatArrays: [
                '$transaction',
                [
                  {
                    balance: '$balance',
                    date: date.toString(),
                    time: date.toTimeString(),
                    method: type,
                    amount: value,
                  },
                ],
              ],
            },
          },
        },
        {
          $set: {
            expenditureTracking: {
              $mergeObjects: ['$expenditureTracking', { [source]: value }],
            },
          },
        },
      ]);
    }
    return await this.login(userName)
  }
}
