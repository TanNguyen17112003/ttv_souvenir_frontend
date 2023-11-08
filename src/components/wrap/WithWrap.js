import React from 'react'
import Header from '../FixedComponents/Header';
import Footer from '../FixedComponents/Footer';
function WithWrap({children}) {
  return (
    <div>
        <Header />
            {children}
        <Footer />
    </div>
  )
}

export default WithWrap