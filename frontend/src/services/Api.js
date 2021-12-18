import axios from "axios";

export default()=> {
return axios.create(
    {
        baseURL:`http://localhost:3000/`,
       // Authorization: `Bearer ${store.state.token}`

    }
)
}