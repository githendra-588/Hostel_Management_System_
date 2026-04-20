import React from 'react'

const MakePaymentHostel = () => {
  return (
    <div>
         <div className="px-6 py-4">
  <h3 className='text-center text-lg font-serif font-bold p-3 text-purple-600'>Make Payment</h3>
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="card-number"
      >
        Card Number
      </label>
      <input
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="card-number"
        name='cardNumber'
        minLength="14"
            pattern="\d{14,}"
        
        type="text"
        placeholder="**** **** **** ****"
      />
      <p className="text-xs text-gray-500">card number must be at least 14 digits</p>
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="expiration-date"
      >
        Expiry Date
      </label>
      <input
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="expiration-date"
        name='expiryDate'
        type="text" 
        placeholder="MM/YY"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
        CVV
      </label>
      <input
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="cvv" 
        type="text"
        name='cvv'
        placeholder="***"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
        Cardholder Name
      </label>
      <input
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" 
        placeholder="Full Name" name='cardHolderName'
      />
    </div>
    <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
      Pay Now
    </button>
  </div>
    </div>
  )
}

export default MakePaymentHostel