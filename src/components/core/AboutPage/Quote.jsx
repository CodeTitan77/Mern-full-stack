import React from 'react'
import HighlightText from './../Homepage/HighlightText';

const Quote = () => {
  return (
    <div>
      We are passionate about revolutionizing the way we learn. Our innovative platform 
      <HighlightText text="combines technology"/>
      <span className='text-brown-500'>{" "}</span> and community to create an 
      <span>
        unparalled education expirience.
      </span>
    </div>
  )
}

export default Quote
