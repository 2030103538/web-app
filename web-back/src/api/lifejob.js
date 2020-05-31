import ajax from "./index"
export const getjiayu = ()=>ajax('/api/auth/lifejob/lifejob_jiayu');

export const getpeixun = ()=>ajax('/api/auth/lifejob/lifejob_peixun');

export const lifejob = (z_name, z_img,z_jiage, z_zuozhe, z_time,z_neir,z_jiaoyuid, z_jiaoyuan,
                        z_focusimg)=>ajax('/api/auth/lifejob/lifejob',{z_name, z_img,
    z_jiage, z_zuozhe, z_time,z_neir,z_jiaoyuid, z_jiaoyuan,z_focusimg},"post");

export const getlist = (page_num,page_size)=>ajax('/api/auth/lifejob/lifejob_list',{page_num,page_size});

export const shanc = (id)=>ajax('/api/auth/lifejob/lifejob_shanc',{id});

export const isfocus = (id,focus)=>ajax('/api/auth/lifejob/lifejob_focus',{id,focus});

export const xiugailist = (id, z_name, z_img,z_jiage, z_zuozhe, z_time,z_neir,z_jiaoyuid, z_jiaoyuan,z_focusimg)=>
    ajax('/api/auth/lifejob/lifejob_xiugai',{id, z_name, z_img,z_jiage, z_zuozhe, z_time,z_neir,z_jiaoyuid, z_jiaoyuan,z_focusimg},'post');