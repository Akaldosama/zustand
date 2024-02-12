import { create } from "zustand";
import axiosClient from "../../plugins/axiosClient";

const useAuthorsStore = create((set) => ({
    authors: [],
    getAuthors: async () => {
        try{
            const response = await axiosClient.get('/author')
            set({authors: response})
        }catch(error){
            console.log('Error fetching data', error)
        }
    },
    createAuthor: async (payload) => {
        try {
            const response = await axiosClient.post('/author', payload);
            if (response.status === 201) {
                set((state) => ({
                    authors: [...state.authors, response.data]
                }));
            } else {
                throw new Error('Failed to create author');
            }
        } catch (error) {
            console.error('Error creating author:', error);
        }
    },
    deleteAuthor: async (id) => {
        try {
            const response = await axiosClient.delete(`/author/${id}`);
            if(response.status === 200 ){
                set((state) => ({
                    authors: state.authors.filter(item => item.id !== id )
                }))
            }else{
                throw new Error('Failed to delete item')
            }
          } catch (error) {
            console.error('Error deleting item:', error);
          }
    },
    updateAuthor: async (payload) => {
        try{
            const response = await axiosClient.patch(`/author/${payload.id}`, payload)
            set((state) => ({
                authors: state.authors.map(author => {
                    if(author.id === payload.id){
                        return {...author, ...payload}
                    }
                    return author
                }) 
            }))
        }catch(error){
            console.error('Error updating author:', error)
        }
    }
}))

export default useAuthorsStore