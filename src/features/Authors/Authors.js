import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useEffect } from 'react';
import { useState } from 'react';
import './Authors.css'
import useAuthorsStore from './AuthorsStore';
import Sidebar from '../Sidebar/Sidebar';

export default function Authors() {
    const { getAuthors } = useAuthorsStore()
    const { authors } = useAuthorsStore()
    const { deleteAuthor } = useAuthorsStore()
    const { createAuthor } = useAuthorsStore()

    const [full_name, setFullname] = useState('')
    const [birthdate, setBirthDate] = useState('')
    const [country, setCountry] = useState('')
    const [image, setImage] = useState('')
    const [modal, setModal] = useState(false)
    const [delModal, setDelModal] = useState(false)
    

    useEffect(() => {
        getAuthors()
    }, [])

    const addAuthorHandler = (e) => {
        e.preventDefault()
        let payload = {
            full_name: full_name,
            birthdate: birthdate + 'T09:30:10Z',
            country: country,
            image: image
        }
        createAuthor({...payload})
        setModal(false)
        setFullname('')
        setBirthDate('')
        setCountry('')
        setImage('')
    }


    const deleteItemFunc = async (id) => {
        await deleteAuthor(id);
        setDelModal(false)
        window.location.reload()
    }

  return (
    <div>
        <Modal isOpen={modal} toggle={() => setModal(false)}>
            <ModalHeader>Add Author</ModalHeader>
            <ModalBody>
                <form>
                    <input type="text" placeholder="Full Name" defaultValue={full_name} onChange={(e) => setFullname(e.target.value)} className="form-control my-2  " />
                    <input type="text" placeholder="BirthDate" defaultValue={birthdate} onChange={(e) => setBirthDate(e.target.value)} className="form-control my-2 " />
                    <input type="text" placeholder="Country" defaultValue={country} onChange={(e) => setCountry(e.target.value)} className="form-control my-2   " />
                    <input type="url" placeholder="Image URL" defaultValue={image} onChange={(e) => setImage(e.target.value)} className="form-control my-2 " />
                </form>
            </ModalBody>
            <ModalFooter>
                <button onClick={addAuthorHandler} className='btn btn-primary'>Add</button>
            </ModalFooter>
        </Modal>
        <Sidebar />
        <div className="wrapper">
        <button onClick={() => setModal(true)} className='btn btn-primary my-3 mx-2'>Add Authors</button>
            <table className='table mx-4'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fullname</th>
                        <th>Birthdate</th>
                        <th>Country</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authors?.map((item, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.full_name}</td>
                                <td>{item.birthdate.slice(0, 10)}</td>
                                <td>{item.country}</td>
                                <td>
                                    <img src={item.image} alt="Author Picture" className='image' />
                                </td>
                                <td>
                                    <button className='btn btn-dark' onClick={() => setDelModal(true)}>delete</button> 
                                    <button className='btn btn-dark' onClick={() => setDelModal(item)}>edit</button> 
                                </td>
                                <Modal isOpen={delModal} toggle={() => setDelModal(false)}>
                                    <ModalBody>
                                        <p>Are you sure you want to delete?!</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <button className='btn btn-danger' onClick={() => deleteItemFunc(item.id)}>Delete</button>
                                        <button className='btn btn-light' onClick={() => setDelModal(false)}>Cancel</button>
                                    </ModalFooter>
                                </Modal>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
