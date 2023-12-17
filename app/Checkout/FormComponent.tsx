import { error } from 'console';
import { FlutterWaveButton, FlutterWaveTypes, closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import { FlutterWaveResponse, FlutterwaveConfig, InitializeFlutterwavePayment } from 'flutterwave-react-v3/dist/types';
import React, { FormEvent } from 'react';
import { FieldValue, FieldValues, useForm } from 'react-hook-form';
import { FormDataType } from './page';
import { RxCross2 } from 'react-icons/rx';
import PaymentInfo from './PaymentInfo';
import { OrderType } from '../interface';
import { useDispatch } from 'react-redux';
import { addOrder, clearCart, clearOrder } from '../GlobalRedux/slice/userSlice';
import generateUniqueId from 'generate-unique-id';
import {constructDate} from  "../utils"


interface Props{
    // formSubmitAddress: (e: React.FormEvent | any, data:object) => void,
    setMobileCheck: React.Dispatch<React.SetStateAction<boolean>>,
    amount: number
    mobileCheck: boolean
    cartOrder: OrderType | null
    orderCompleteState: boolean,
     setOrderCompleteState: React.Dispatch<React.SetStateAction<boolean>>,
}

const PUBLIC_KEYS = process.env.FLUTTERWAVE_PUBLIC_KEYS as string 


function FormComponent({ amount, setMobileCheck, mobileCheck, cartOrder, orderCompleteState, setOrderCompleteState}:Props) {
  const dispatch = useDispatch()
      const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
      } = useForm();




     

      return (
    <form  className={`md:w-[44%] md:max-w-[350px]  sm:w-[100%] md:h-[95%] ${mobileCheck ? "md:flex sm:flex" : "md:flex sm:hidden"} flex-col p-1  mx-4  rounded-md`}  onSubmit={handleSubmit((data, e: React.BaseSyntheticEvent<object, any, any> | undefined | any) =>{


      console.log(data)
         dispatch(addOrder({
          id: generateUniqueId({
            length: 8,
            useLetters:true,
            useNumbers: true,
          }),
          orderedBy: data.firstName,
          orders: cartOrder?.orders ,
          OverallPrice: cartOrder?.orders.reduce((acc, curr)=> acc + (curr.price * curr.quantity),0),
          time: constructDate(),
          pending: true,
          completed: false,
          canceled: false,
          address: data.address
         }))

         setOrderCompleteState(true)
         dispatch(clearOrder())
         dispatch(clearCart())
      // formSubmitAddress(e,data)
      resetField("firstName")
      resetField("lastname")
      resetField("address")
      resetField("city")
      resetField("state")
      resetField("phone")
      resetField("email")

      })}>

        <div className='p-1 px-2 flex flex-col h-[58%] bg-[#FFFFFF] rounded-md'>

<h2 className='p-1 py-2 w-[95%] border-b-2 mx-auto text-sm flex justify-between'>Delivery Info 
    <button className='text-xl hover:text-red-200 transition-all  md:hidden sm:flex' onClick={()=> setMobileCheck(false)}>
      <RxCross2/>
    </button>
    </h2>


        <div className="flex w-[90%] justify-between my-1  mt-2 mx-auto text-xs flex-wrap">

            <label htmlFor="firstName"  className='w-[48%]'>
                <span className='mx-1'>Firstname*</span>
          <input className='border-2 w-full mt-1 rounded-md p-1' {...register('firstName',  { required: true })} />

            </label>

            <label htmlFor="lastname"  className='w-[48%]'>
        <span className='mx-1'>
                Lastname*

        </span>
          <input className='border-2 w-full mt-1 rounded-md p-1' {...register('lastname',  { required: true }) } />

            </label>
        </div>


        <div className="address flex w-[90%]  mx-auto text-xs">
            <label htmlFor="address" className='w-full'>
                <span className='mx-1'>
                Address

                </span>
            <input className='border-2 w-full mt-1 rounded-md p-1' {...register('address',  { required: true }) } />

            </label>

        </div>


        <div className="flex w-[90%] mx-auto justify-between my-1   text-xs">
            <label htmlFor="city"  className='w-[48%]'>
                <span className='mx-1'>City*</span>
          <input className='border-2 w-full mt-1 rounded-md p-1' {...register('city',  { required: true })} />

            </label>

            <label htmlFor="state"  className='w-[48%]'>
        <span className='mx-1'>
                State*
        </span>
          <input className='border-2 w-full mt-1 rounded-md p-1' {...register('state',  { required: true }) } />

            </label>
        </div>


        <div className="email flex w-[90%] mb-1 mx-auto  text-xs">
            <label htmlFor="email" className='w-full'>
                <span className='mx-1'>
                Email
                </span>
            <input type='email' className='border-2 w-full mt-1 rounded-md p-1' {...register('email',  { required: true }) } />
            </label>

        </div>


        <div className="phone flex w-[90%] mb-1 mx-auto text-xs">
            <label htmlFor="phone" className='w-full'>
                <span className='mx-1'>
                Phone
                </span>
            <input type='tel' className='border-2 w-full mt-1 rounded-md p-1' pattern="[0-9]*" {...register('phone',  { required: true }) } />
            </label>

        </div>

        <div className="phone flex w-[90%] mb-1  text-sm text-red-200">

        {(errors.phone || errors.firstname || errors.lastname || errors.address) && (<p className='w-full'>
        Please fill all information correctly
        </p>)}

        </div>

        </div>
        <PaymentInfo cartOrder={cartOrder} register={register}/> 

        </form>
      );
    }

    export default FormComponent

   

    export function PayButton({amount} : {amount : number}){

      const config = {
        public_key:PUBLIC_KEYS ,
        tx_ref: `${Date.now()}`,
        amount: amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: "dummyMail@gmail.com",
          phone_number: "+123456789101",
          name: "john" + " " + "doe",
        },
        customizations: {
          title: 'runEat',
          description: 'Payment for food',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
    
      const handleFlutterPayment = useFlutterwave(config)

      return(
        <button type="submit"  className='border-2 w-[90%] p-1 mt-5 mx-auto hover:bg-slate-200 transition-all cursor-pointer rounded bg-slate-100' onClick={()=>{
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}    
            > Submit </button>
      )
    }

