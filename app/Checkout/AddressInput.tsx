"use client"

interface Props {
    address: string;
     setAddress:React.Dispatch<React.SetStateAction<string>>
}

export default function AddressInput({address, setAddress}: Props){


    return(
        <textarea className="w-full h-full p-1 m-1 border-orange-300 border-2 rounded-md text-sm" value={address} onChange={(e)=> setAddress(e.target.value)}  rows={4} placeholder="2,Euclid Ave. Pasadena" required>

        </textarea>
    )
}