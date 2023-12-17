import React from 'react'
import { FieldValue, FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import { PayButton } from './FormComponent';
import { OrderType } from '../interface';


export default function PaymentInfo({cartOrder , register}: {cartOrder: OrderType | null, register: UseFormRegister<FieldValues>} ) {
// const {register,handleSubmit,resetField,formState: { errors }, } = useForm();


  return (
    <div className='h-[48%] mt-3 bg-[#FFFFFF] flex flex-col rounded-md pt-3'>
        <h2 className='p-1 py-2 w-[95%] border-b-2 mx-auto text-sm flex justify-between'>Payment Info 
    
    </h2>
       
       <div className="cardNo flex w-[90%] mb-1 mt-2 mx-auto  text-xs">
            <label htmlFor="cardNo" className='w-full'>
                <span className='mx-1'>
                Card No
                </span>
            <input type='tel' pattern="[0-9]*" className='border-2 w-full mt-1 rounded-md p-1' {...register('CardNo',  { required: true }) } />
            </label>

        </div>

        {/* shotgun billie */}

        <div className="flex w-[90%] justify-between my-1  mt-2 mx-auto text-xs flex-wrap">

            <label htmlFor="expDate"  className='w-[48%]'>
                <span className='mx-1'>Exp. Date*</span>
          <input type='tel' maxLength={5} className='border-2 w-full mt-1 rounded-md p-1'  {...register('exp',  { required: true })} />

            </label>

            <label htmlFor="cvv"  className='w-[48%]'>
        <span className='mx-1'>
                Cvv*

        </span>
          <input type='tel' maxLength={3} className='border-2 w-full mt-1 rounded-md p-1' pattern="[0-9]*" {...register('cv',  { required: true }) } />

            </label>
        </div>

       <PayButton amount={cartOrder ? cartOrder?.orders.reduce((acc, curr)=> acc + (curr.price * curr.quantity),0): 0}/>
        
    </div>
  )
}
