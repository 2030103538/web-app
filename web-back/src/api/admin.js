
import ajax from "./index"
import { saveObj, getObj, removeObj} from "../tools/cache-tool"
import config from "./../config/config"

export const isLogin = ()=>{
  let user = getObj(config.ADMIN_KDY);
  return !!user.data
};

export const getLogin = (g_zhanghao,g_mima)=>ajax('/api/auth/admin/login',{g_zhanghao,g_mima},'post');


export const loginOut = ()=>ajax('/api/auth/admin/out');

export const xiugai = (token,g_neme,g_img)=>ajax('/api/auth/admin/edit',{token,g_neme,g_img},'post');

export const xiugaipwd = (token,p_mima,p_old)=>ajax('/api/auth/admin/old_pwd',{token,p_mima,p_old},'post');


export const setUser = (user)=>{
  saveObj(config.ADMIN_KDY,user)
};

export const rmUser = ()=>{
  removeObj(config.ADMIN_KDY)
};

export const gatUser = ()=>{
  return getObj(config.ADMIN_KDY)
};