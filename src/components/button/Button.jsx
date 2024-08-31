import React from 'react'

function Button({
  text,
  type='button',
  className='',
  bgColor,
  ...props
}) {
  return (
    <button className={`px-4 py-2 border rounded-lg ${bgColor} ${className}`} {...props}>
      {text}
    </button>
  )
}

export default Button
