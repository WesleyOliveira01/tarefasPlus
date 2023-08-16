import React from 'react'

interface Ibotao{
    children:React.ReactNode
}

const Botao = ({children}:Ibotao) => {
  return (
    <button className='rounded-md bg-slate-200 p-3 text-slate-950 font-semibold hover:scale-110 duration-300'>{children}</button>
  )
}

export default Botao