import Api from './Api';

export default {
    signup(credentials) {
        return Api().post('api/signup',credentials)
    },
    login (credentials) {
        return Api().post('api/login', credentials)
      },
     
}
