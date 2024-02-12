import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useEffect } from 'react';
import { useState } from 'react';
import '../Authors/Authors.css'
import useBooksStore from './BooksStore';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom/dist';

export default function Books() {
    const { getBooks } = useBooksStore()
    const { books } = useBooksStore()
    const { deleteBook } = useBooksStore()
    const { createBook } = useBooksStore()

    const [name, setName] = useState('')
    const [author_id, setAuthorId] = useState('')
    const [price, setPrice] = useState('')
    const [janr_id, setJanr] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')

    const [modal, setModal] = useState(false)

    const [delModal, setDelModal] = useState(false)
    

    useEffect(() => {
        getBooks()
    }, [])

    const addBookHandler = (e) => {
        e.preventDefault()
        let payload = {
            name: name,
            author_id: author_id,
            price: price,
            janr_id: janr_id,
            image: image,
            description: description,
        }
        createBook({...payload})
        setModal(false)
        setName('')
        setPrice('')
        setAuthorId('')
        setImage('')
        setDescription('')
        setJanr('')
    }


    const deleteItemFunc = async (id) => {
        await deleteBook(id);
        setDelModal(false)
        window.location.reload()
    }

  return (
    <div className='d-flex'>
        <Modal isOpen={modal} toggle={() => setModal(false)}>
            <ModalHeader>Add Book</ModalHeader>
            <ModalBody>
                <form>
                    <input type="text" placeholder= "Name" defaultValue={name} onChange={(e) => setName(e.target.value)} className="form-control my-2  " />
                    <input type="text" placeholder="Author id" defaultValue={author_id} onChange={(e) => setAuthorId(e.target.value)} className="form-control my-2  " />
                    <input type="text" placeholder="Price" defaultValue={price} onChange={(e) => setPrice(e.target.value)} className="form-control my-2 " />
                    <input type="text" placeholder="Janr id" defaultValue={janr_id} onChange={(e) => setJanr(e.target.value)} className="form-control my-2   " />
                    <input type="url" placeholder="Image URL" defaultValue={image} onChange={(e) => setImage(e.target.value)} className="form-control my-2 " />
                    <textarea cols="30" rows="10" placeholder='Description' className='form-control' defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
                </form>
            </ModalBody>
            <ModalFooter>
                <button onClick={addBookHandler} className='btn btn-primary'>Add</button>
            </ModalFooter>
        </Modal>


        <div className="wrapper d-flex">
        <Sidebar />
        <button onClick={() => setModal(true)} className='btn btn-primary my-3 mx-2'>Add Books</button>
        {/* <div className="parent"> */}
          {
            books?.map((item, index) => {
              return <div className="child" key={index}>
                  <button className='btn btn-dark' onClick={() => setDelModal(true)}>Delete</button>
                  <button className='btn btn-light' onClick={() => setModal(true)}>Edit</button>
                  <img src={item.image} alt="" className='image' /><br />
                  {item.name}<br/>
                  {item.price}
                  <Link to={`/single_book/${item.id}`} className='btn btn-primary'>More details</Link>
                  <Modal isOpen={delModal} toggle={() => setDelModal(false)}>
                  <ModalBody>
                  <p>Are you sure you want to delete?!</p>
                  </ModalBody>
                  <ModalFooter>
                  <button className='btn btn-danger' onClick={() => deleteItemFunc(item.id)}>Delete</button>
                  <button className='btn btn-light' onClick={() => setDelModal(false)}>Cancel</button>
                  </ModalFooter>
                  </Modal>
              </div>
              
            })
          }
        {/* </div> */}
        </div>
    </div>
  )
}
