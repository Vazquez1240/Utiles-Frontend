import axios from "axios";


// Las peticiones a las url proporcionadas
export const api_colonias = axios.create({
    baseURL: 'https://ide.api.monterrey.gob.mx/rest/v1/implanc/colonia/?clave_entidad=19&fields=nombre,id&limit=1122&format=json'
})

export const buscar_colonia = async (setData) => {
    try{
        const respuesta = await api_colonias.get();

        if (respuesta.data.results && Array.isArray(respuesta.data.results)) {
            setData(respuesta.data.results);
        } else {
            console.error("Los datos de municipio no contienen un arreglo válido:", respuesta.data);
        }
    }catch (error) {
        console.error("Error al obtener los datos de municipio:", error);
    }
}

export const api_municipio = axios.create({
    baseURL: 'https://ide.api.monterrey.gob.mx/rest/v1/marco-geoestadistico-inegi/municipio/?clave_entidad=19&fields=nombre,clave_geoestadistica&format=json'
})

export const buscar_municipio = async (setData) => {
    try {
        const respuesta = await api_municipio.get();

        if (respuesta.data.results && Array.isArray(respuesta.data.results)) {
            setData(respuesta.data.results);
        } else {
            console.error("Los datos de municipio no contienen un arreglo válido:", respuesta.data);
        }
    } catch (error) {
        console.error("Error al obtener los datos de municipio:", error);
    }
}



// Para poder hacer las peticiones a mi back 
export const api = axios.create({
    baseURL: 'http://localhost:8000/'
})

export const login = async (url, usuario) => {
    try{
        const respuesta = await api.post(url, usuario)
        return respuesta

    }catch (error){
        throw error;
    }

}
export const logout = async (url, token) => {
    try{
        const respuesta = await api.post(url,null,{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return respuesta

    }catch (error){
        throw error;
    }

}

export const buscar = async (url, setData) => {
    try{
        const respuesta = await api.get(url)
    
        setData(respuesta.data)
    }catch (error){
        throw error
    }
    
}

export const buscar_paquete = async (url, setData, token) => {
    try{
        const respuesta = await api.get(url, {
            headers : {
                Authorization : `Token ${token}`
            }
        })
        setData(respuesta.data)

    }catch (error){
        throw error;
    }
}


export const crear_paquete = async (url, paquete) => {
    try {
      const respuesta = await api.post(url, paquete);
      return respuesta.data;

    } catch (error) {
      throw error;
    }
  };


export const marcar_paquete = async (url, setData, token) => {
    
    try{
        const respuesta = await api.put(url, {}, {
            headers : {
                Authorization : `Token ${token}`
            }
        })
        setData(respuesta.data)

    }catch (error){
        throw error;
    }
}