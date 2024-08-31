import React from 'react'
import { forwardRef,useId } from 'react'

function Input({
    label,
    type,
    placeholder,
    className="",
    ...props
},ref) {

    const id=useId()

return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='inline-block mb-1 pl-1'>{label}</label>}

    <input
    type={type}
    placeholder={placeholder}
    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
    {...props}
    ref={ref}
    id={id}
    />

    
    </div>
    )
}

export default forwardRef(Input)
