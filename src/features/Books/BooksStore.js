import { create } from "zustand";
import axiosClient from "../../plugins/axiosClient";

const useBooksStore = create((set) => ({
    books: [],
    getBooks: async () => {
        try{
            const response = await axiosClient.get('/book')
            set({books: response})
        }catch(error){
            console.log('Error fetching data', error)
        }
    },
    createBook: async (payload) => {
        try {
            const response = await axiosClient.post('/book/create', payload);
            if (response.status === 201) {
                set((state) => ({
                    books: [...state.books, response.data]
                }));
            } else {
                throw new Error('Failed to create book');
            }
        } catch (error) {
            console.error('Error creating book:', error);
        }
    },
    deleteBook: async (id) => {
        try {
            const response = await axiosClient.delete(`/book/${id}`);
            if(response.status === 200 ){
                set((state) => ({
                    books: state.books.filter(item => item.id !== id )
                }))
            }else{
                throw new Error('Failed to delete item')
            }
          } catch (error) {
            console.error('Error deleting item:', error);
          }
    },
    updateBook: async (payload) => {
        try{
            const response = await axiosClient.patch(`/book/${payload.id}`, payload)
            set((state) => ({
                books: state.books.map(book => {
                    if(book.id === payload.id){
                        return {...book, ...payload}
                    }
                    return book
                }) 
            }))
        }catch(error){
            console.error('Error updating author:', error)
        }
    }
}))

export default useBooksStore