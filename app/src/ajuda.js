export function ativarBuscador(obj){
    let query = ""
    for(let key in obj){
      query += `&${key}=${obj[key]}`
    }
    return query;
}