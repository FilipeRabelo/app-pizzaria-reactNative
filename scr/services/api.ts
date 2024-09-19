
// configuração da api

import axios from "axios";

const api = axios.create({

  // baseURL: 'http://localhost:3333'
  baseURL: 'http://192.168.0.4:3333'
})

export { api };

// digitar no terminal ipconfig
// pegar o ip da maquina