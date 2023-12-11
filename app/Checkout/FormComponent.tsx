import { error } from 'console';
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

interface Props{
    formSubmitAddress: (e: React.FormEvent | any, data:object) => void,
    setMobileCheck: React.Dispatch<React.SetStateAction<boolean>>
}

function FormComponent({formSubmitAddress, setMobileCheck}:Props) {
      const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
      } = useForm();

      return (
        <form className='p-1 px-2 flex flex-col' onSubmit={handleSubmit((data, e) =>{
            
            formSubmitAddress(e,data)
            resetField("firstName")
            resetField("lastname")
            resetField("address")
            resetField("firstname")
            resetField("city")
            resetField("state")
            resetField("phone")
            })}>

        <div className="flex w-[90%] justify-between my-1  mt-4  text-sm flex-wrap">
            <label htmlFor="firstName"  className='w-[48%]'>
                <span className='mx-1'>Firstname*</span>
          <input className='border-2 w-full m-1 rounded-md p-1' {...register('firstName',  { required: true })} />

            </label>

            <label htmlFor="lastname"  className='w-[48%]'>
        <span className='mx-1'>
                Lastname*

        </span>
          <input className='border-2 w-full m-1 rounded-md p-1' {...register('lastname',  { required: true }) } />

            </label>
        </div>


        <div className="address flex w-[90%] mb-1  text-sm">
            <label htmlFor="address" className='w-full'>
                <span className='mx-1'>
                Address

                </span>
            <input className='border-2 w-full m-1 rounded-md p-1' {...register('address',  { required: true }) } />

            </label>

        </div>


        <div className="flex w-[90%] justify-between my-1   text-sm">
            <label htmlFor="city"  className='w-[48%]'>
                <span className='mx-1'>City*</span>
          <input className='border-2 w-full m-1 rounded-md p-1' {...register('city',  { required: true })} />

            </label>

            <label htmlFor="state"  className='w-[48%]'>
        <span className='mx-1'>
                State*
        </span>
          <input className='border-2 w-full m-1 rounded-md p-1' {...register('state',  { required: true }) } />

            </label>
        </div>


        <div className="phone flex w-[90%] mb-1  text-sm">
            <label htmlFor="phone" className='w-full'>
                <span className='mx-1'>
                Phone
                </span>
            <input type='tel' className='border-2 w-full m-1 rounded-md p-1' pattern="[0-9]*" {...register('phone',  { required: true }) } />
            </label>

        </div>

        <div className="phone flex w-[90%] mb-1  text-sm text-red-200">

        {(errors.phone || errors.firstname || errors.lastname || errors.address) && (<p className='w-full'>
        Please fill all information correctly
        </p>)}

        </div>

          
         
          <input className='border-2 w-[90%] p-1 ml-2 hover:bg-slate-200 transition-all cursor-pointer rounded bg-slate-100' type="submit" />
        </form>
      );
    }

    export default FormComponent


