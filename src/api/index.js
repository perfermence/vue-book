import axios from 'axios';
axios.defaults.baseURL='http://localhost:3000';
//增加默认请求路径

//获取轮播图数据，返回promise对象
export let getSliders=()=>{
    return axios.get('/sliders');
}
//获取热门图书
export let getHotBook=()=>{
    return axios.get('/hot');
}
//获取所有图书
export let getBooks=()=>{
    return axios.get('/book');
}
//删除某一本书
export let removeBook=(id)=>{
    //delete update等复杂请求会先进行option探测性请求，当服务器允许操作后才会再发送该复杂请求
    return axios.delete(`/book?id=${id}`);
};
//获取某一本书
export let findOneBook=(id)=>{
    return axios.get(`/book?id=${id}`);
}
//修改图书数据
/**
 * 
 * @param {*} id  编号
 * @param {*} data 数据 请求体发送
 * @returns {import('axios').AxiosPromise}
 */

export let updateBook=(id,data)=>{
    return axios.put(`/book?id=${id}`,data);
}
export let addBook=(data)=>{
    return axios.post('/book',data);
}
export let  getAll=()=>{
    //同时发两个请求
    return axios.all([getSliders(),getHotBook()])
}
//分页，延迟加载，根据偏移量返回对应的数据 5->6~10(id)
export let pagination=(offset)=>{
    return axios.get(`/page?offset=${offset}`);
}
