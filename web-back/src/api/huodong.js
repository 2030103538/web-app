import ajax from "./index"
export const getdizhi = ()=>ajax('/api/auth/activities/activities_dizhi');

export const getbiaoqian = ()=>ajax('/api/auth/activities/activities_biaoqian');

export const activities_zhaosheng = ()=>ajax('/api/auth/activities/activities_zhaosheng');

export const activities_zhouqi = ()=>ajax('/api/auth/activities/activities_zhouqi');

export const activities = ( h_mame, h_time,  h_img, h_biaoqianid, h_dizhid, h_tianshuid,h_duixiangid, h_jieshao, h_anpai,h_riqi,
  h_focusimg)=>ajax('/api/auth/activities/activities',{ h_mame, h_time, h_img,
    h_biaoqianid, h_dizhid, h_tianshuid,h_duixiangid, h_jieshao, h_anpai,h_riqi, h_focusimg},"post");

export const getlist = (page_num,page_size)=>ajax('/api/auth/activities/activities_list',);

export const activities_shanc = (id)=>ajax('/api/auth/activities/activities_shanc',{id});

export const activities_focus = (id,focus)=>ajax('/api/auth/activities/activities_focus',{id,focus});

export const activities_xiugai = (id, h_mame, h_time, h_img, h_biaoqianid, h_dizhid, h_tianshuid,h_duixiangid, h_jieshao, h_anpai,
                                  h_riqi, h_focusimg)=> ajax('/api/auth/activities/activities_xiugai',{id, h_mame, h_time ,
    h_img, h_biaoqianid, h_dizhid, h_tianshuid,h_duixiangid, h_jieshao, h_anpai, h_riqi, h_focusimg},'post');
