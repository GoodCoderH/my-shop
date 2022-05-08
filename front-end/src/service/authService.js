import axios from "axios";

const API_URL = "http://localhost:8080/";

function register(username, email, password, gender) {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    gender,
  });
}

function login(username, password) {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
