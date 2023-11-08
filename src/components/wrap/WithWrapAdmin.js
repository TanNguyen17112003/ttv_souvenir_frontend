import React from 'react'
import HeaderAdmin from '../FixedComponents/HeaderAdmin'
function WithWrapAdmin({children}) {
  return (
    <div>
        <HeaderAdmin />
        {children}
    </div>
  )
}

export default WithWrapAdmin