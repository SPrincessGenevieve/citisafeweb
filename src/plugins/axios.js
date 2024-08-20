import axios from "axios";

axios.defaults.baseURL = "https://typically-comic-ape.ngrok-free.app/api/v1/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["ngrok-skip-browser-warning"] = true;

export default axios;

// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000/api/v1/";
// axios.defaults.headers.post["Content-Type"] = "application/json";

// export default axios;
