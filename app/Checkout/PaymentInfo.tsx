import React from 'react'
import { FieldValue, FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import { PayButton } from './FormComponent';


export default function PaymentInfo({amount , register}: {amount: number, register: UseFormRegister<FieldValues>} ) {
// const {register,handleSubmit,resetField,formState: { errors }, } = useForm();


  return (
    <div className='h-[48%] mt-3 bg-[#FFFFFF] flex flex-col rounded-md pt-3'>
        <h2 className='p-1 py-2 w-[95%] border-b-2 mx-auto text-sm flex justify-between'>Payment Info 
    
    </h2>
       
       <div className="email flex w-[90%] mb-1 mt-2 mx-auto  text-xs">
            <label htmlFor="email" className='w-full'>
                <span className='mx-1'>
                Card No
                </span>
            <input type='email' className='border-2 w-full mt-1 rounded-md p-1' {...register('email',  { required: true }) } />
            </label>

        </div>

        {/* shotgun billie */}

        <div className="flex w-[90%] justify-between my-1  mt-2 mx-auto text-xs flex-wrap">

            <label htmlFor="firstName"  className='w-[48%]'>
                <span className='mx-1'>Exp. Date*</span>
          <input className='border-2 w-full mt-1 rounded-md p-1' pattern="[0-9]*" {...register('firstName',  { required: true })} />

            </label>

            <label htmlFor="lastname"  className='w-[48%]'>
        <span className='mx-1'>
                Cvv*

        </span>
          <input className='border-2 w-full mt-1 rounded-md p-1' pattern="[0-9]*" {...register('lastname',  { required: true }) } />

            </label>
        </div>

       <PayButton amount={amount}/>
        
    </div>
  )
}
