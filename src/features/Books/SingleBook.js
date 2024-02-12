import React from 'react'
import useBooksStore from './BooksStore'
import { useEffect } from 'react'

export default function SingleBook() {
    const { getBooks } = useBooksStore()
    const { books } = useBooksStore()

    useEffect(() => {
        getBooks()
    }, [])
  return (
    <div>
        <div className="wrapper d-flex">
            {
                books?.map((item, index) => {
                    return <div className="parent" key={index}>
                        <div className="child">
                            {item.image}
                        </div>
                        <div className="child">
                            <i><b>{item.name}</b></i>
                            <mark>{item.price}</mark>
                            <h4>{item.author_id}</h4>
                            <p>{item.description}</p>
                            <h5>{item.code}</h5>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
  )
}
