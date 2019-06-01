let http=require('http');
let fs=require('fs');
let url=require('url');

//获取轮播图 /sliders
let sliders=require('./slider.js');
//读数据文件
let read=(cb)=>{
    let result=null;
    fs.readFile('./book.json','utf-8',(err,data)=>{
        if(err){
           result=[];
           res.end(JSON.stringify(result));
        }else{
            result=JSON.parse(data);    
            cb(result);
        }

    })
};  
//向数据文件写入内容
let write=(data,cb)=>{
    fs.writeFile('./book.json',JSON.stringify(data),cb)
}
let pageSize=5;//每页显示5个
http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,X-Requested-With ');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
       return res.end();//让options请求快速返回
    }
    let {pathname,query}=url.parse(req.url,true);
    if(pathname==='/sliders'){
        res.setHeader('Content-Type','application/json;charset=utf-8');
        return res.end(JSON.stringify(sliders))
    }
    if(pathname==='/hot'){
        read(result=>{
            res.setHeader('Content-type','text/plain;charset=utf-8');
            res.end(JSON.stringify(result));
        });
        return;
    }
    if(pathname==='/book'){//对书的增删改查
        let id=parseInt(query.id);
        switch(req.method){
            case 'GET':
                if(id){//查询一个
                    read(function(books){
                        console.log(books);
                        let book=books.find(item=>item.bookId===id);
                        if(!book){
                            book=[];
                        }
                        res.setHeader('Content-type','application/json;charset=utf-8');
                        res.end(JSON.stringify(book));
                    });
                }else{
                    //获取所有图书
                    read(books=>{
                        res.setHeader('Content-type','application/json;charset=utf-8');
                        res.end(JSON.stringify(books));
                    })
                }
                break;
            case 'POST':
                let str='';
                req.on('data',chunk=>{
                    str+=chunk;
                });
                req.on('end',()=>{
                    let book=JSON.parse(str);//book要改成的样子
                    read(function(books){
                       book.bookId=Number(books.length?books[books.length-1].bookId+1:1);
                       books.push(book);
                       write(books,function(){
                           res.end(JSON.stringify(book));
                       })
                    })    
                })
                break;
            case 'PUT':
                if(id){
                    //获取当前ID
                    let str='';
                    req.on('data',chunk=>{
                        str+=chunk;
                    });
                    req.on('end',()=>{
                        let book=JSON.parse(str);//book要改成的样子
                        read(function(books){
                            books=books.map(item=>{
                                if(item.bookId===id){
                                    return book;
                                }
                                return item;//其他正常返回即可
                            });
                            write(books,function(){
                                //将数据写回JSON中
                                res.end(JSON.stringify(book));
                            })
                        })    
                    })
                    
                }
                break;
            case 'DELETE':
                read(books=>{
                    books=books.filter(item=>item.bookId!==id);
                    write(books,()=>{
                        res.end(JSON.stringify({}))
                    })
                })

                break;
        }
        return;
    }
    if(pathname==='/page'){
        let offset=parseInt(query.offset)||0;//拿到当前前端传递的值
        read(function(books){
            // 每次偏移量在偏移的基础上增加5条
           let result=books.slice(offset,offset+pageSize);
           let hasMore=true;//默认有更多
           if(books.length<=offset+pageSize){
               //已经显示的数目，大于了总共条数
                hasMore=false;
           }
           res.setHeader('Content-type','application/json;charset=utf-8');
           res.end(JSON.stringify({hasMore,books:result}));
        });
        return;//很重要，不然走下面了
    }
    //读取一个路径
    fs.stat('.'+pathname,function(err,stats){
        if(err){
            res.statusCode=404;
            res.end('NOT FOUND');
        }else{
            if(stats.isDirectory()){
                let p=require('path').join('.'+pathname,'./index.html');
                fs.createReadStream(p).pipe(res);
            }else{
                fs.createReadStream('.'+pathname).pipe(res);           
            }
        }
    })
}).listen('3000');