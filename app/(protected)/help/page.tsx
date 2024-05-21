import React from 'react'
import Cookies from 'js-cookie'
const Page = () => {
    const token = Cookies.get('storeToken');
    console.log(token)
    return (
        <div className='mt-24'>
            <div className='mx-auto px-8'>
                help
            </div>
        </div>
    )
}

export default Page