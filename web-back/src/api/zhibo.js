import ajax from "./index"
export const getzhuti = ()=>ajax('/api/auth/live/zhibo_zhuti');

export const getrenqun = ()=>ajax('/api/auth/live/zhibo_renqun');

export const addzhibo = (token, z_mame, z_zuozhe, kaitime, jietime , z_renqun, z_jiayuan, z_jiage, z_dizhi,
                         fengmian, focus)=>ajax('/api/auth/live/zhibo',{token, z_mame,
    z_zuozhe, kaitime, jietime , z_renqun, z_jiayuan, z_jiage, z_dizhi, fengmian, focus},"post");

export const getlist = (page_num,page_size)=>ajax('/api/auth/live/zhibo_list',);

export const shanc = (id)=>ajax('/api/auth/live/zhibo_shanc',{id});

export const isfocus = (id,focus)=>ajax('/api/auth/live/zhibo_focus',{id,focus});

export const xiugailist = (id, z_mame, z_zuozhe, kaitime, jietime , z_renqun, z_jiayuan, z_jiage, z_dizhi, fengmian, focus)=>
    ajax('/api/auth/live/zhibo_xiugai',{id, z_mame, z_zuozhe, kaitime, jietime , z_renqun, z_jiayuan, z_jiage, z_dizhi, fengmian, focus},'post');