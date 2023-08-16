import { HTMLProps } from 'react'
import React from 'react'

const TextArea = ({...rest}:HTMLProps<HTMLTextAreaElement>) => {
  return (
    <section className="p-3 bg-slate-200 rounded-md">
          <textarea
            className="outline-none w-full text-slate-950 bg-slate-200 placeholder:text-slate-500"
            {...rest}
          ></textarea>
        </section>
  )
}

export default TextArea