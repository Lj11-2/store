import axios from 'axios'
import qs from 'qs'

//拦截响应
axios.interceptors.response.use((res) => {
    console.log('---------' + res.config.url + '---------')
    console.log(res)
    return res
})

const url = '/api'
//菜单添加
//--------------------------------------------菜单管理---------------------------------
export const requestAdd = (params) => {
    return axios({
        url: url + '/api/menuadd',
        method: "post",
        data: qs.stringify(params)
    })
}
//获取列表接口
export const menuList = (params) => {
    return axios({
        url: url + '/api/menulist',
        method: 'get',
        params: params
    })
}
//删除菜单
export const menuDelete = (params) => {
    return axios({
        url: url + '/api/menudelete',
        method: 'post',
        data: qs.stringify(params)
    })
}
//获取菜单当前一个
export const getId = (params) => {
    return axios({
        url: url + '/api/menuinfo',
        method: 'get',
        params: params
    })
}
//菜单修改
export const changeMenu = (params) => {
    return axios({
        url: url + '/api/menuedit',
        method: 'post',
        data: params
    })
}


//-------------------------------------角色管理---------------------------------------
//角色添加
export const roleAdd = (params) => {
    return axios({
        url: url + '/api/roleadd',
        method: 'post',
        data: qs.stringify(params)
    })
}
//角色列表
export const roleList = () => {
    return axios({
        url: url + '/api/rolelist',
        method: 'get',
    })
}
//角色删除
export const roleDelete = (params) => {
    return axios({
        url: url + '/api/roledelete',
        method: 'post',
        data: qs.stringify(params)
    })
}
//获取角色参数
export const roleId = (params) => {
    return axios({
        url: url + '/api/roleinfo',
        method: 'get',
        params: params
    })
}
//角色修改
export const changeRole = (params) => {
    return axios({
        url: url + '/api/roleedit',
        method: 'post',
        data: qs.stringify(params)
    })
}



//------------------------------------管理员管理----------------------------------------

//管理员添加
export const managerAdd = (params) => {
    return axios({
        url: url + '/api/useradd',
        method: 'post',
        data: qs.stringify(params)
    })
}

//管理员列表
export const managerList = (params) => {
    return axios({
        url: url + '/api/userlist',
        method: 'get',
        params: params
    })
}

//管理员删除
export const managerDelete = (params) => {
    return axios({
        url: url + '/api/userdelete',
        method: 'post',
        data: qs.stringify(params)
    })
}
//管理员当前的id
export const managerId = (params) => {
    return axios({
        url: url + '/api/userinfo',
        method: 'get',
        params: params

    })
}
//管理员修改
export const managerChange = (params) => {
    return axios({
        url: url + '/api/useredit',
        method: 'post',
        data: qs.stringify(params)
    })
}
//管理员总数
export const managerNum = () => {
    return axios({
        url: url + '/api/usercount',
        method: 'get'
    })
}


//--------------------------------------------商品分类-------------------------------------
//商品添加
export const shopAdd = (params) => {
    var form = new FormData()
    for (let i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: url + '/api/cateadd',
        method: 'post',
        data: form
    })
}
//商品列表
export const shopList = (params) => {
    return axios({
        url: url + '/api/catelist',
        method: 'get',
        params: params
    })
}

//商品删除
export const shopDelete = (params) => {
    return axios({
        url: url + '/api/catedelete',
        method: 'post',
        data: qs.stringify(params)
    })
}
//商品获取当前的id
export const shopId = (params) => {
    return axios({
        url: url + '/api/cateinfo',
        method: 'get',
        params: params
    })
}

//商品修改
export const shopChange = (params) => {
    var form = new FormData()
    for (let i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: url + '/api/cateedit',
        method: 'post',
        data: form
    })
}





//-----------------------------------------商品规格--------------------------------------------
//规格添加
export const specAdd = (params) => {
    return axios({
        url: url + '/api/specsadd',
        method: 'post',
        data: params
    })
}
//规格列表
export const specList = (params) => {
    return axios({
        url: url + '/api/specslist',
        method: 'get',
        params: params
    })
}

//规格删除
export const specDelete = (params) => {
    return axios({
        url: url + '/api/specsdelete',
        method: 'post',
        data: qs.stringify(params)
    })
}
//规格获取当前的id
export const specId = (params) => {
    return axios({
        url: url + '/api/specsinfo',
        method: 'get',
        params: params
    })
}

//规格修改
export const specChange = (params) => {
    return axios({
        url: url + '/api/specsedit',
        method: 'post',
        data: qs.stringify(params)
    })
}
//规格总数
export const specNum = (params) => {
    return axios({
        url: url + '/api/specscount',
        method: 'get',
        params: params
    })
}



//-----------------------------------商品管理---------------------------------------

//商品管理添加
export const shopManageAdd = (params) => {
    var form = new FormData()
    for (let i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: url + '/api/goodsadd',
        method: 'post',
        data: form
    })
}
//商品管理列表
export const shopManageList = (params) => {
    return axios({
        url: url + '/api/goodslist',
        method: 'get',
        params: params
    })
}
//商品管理删除
export const shopManageDelete = (params) => {
    return axios({
        url: url + '/api/goodsdelete',
        method: 'post',
        data: qs.stringify(params)
    })
}
//商品管理获取当前的id
export const shopManageId = (params) => {
    return axios({
        url: url + '/api/goodsinfo',
        method: 'get',
        params: params
    })
}
//商品管理修改
export const shopManageChange = (params) => {
    var form = new FormData()
    for (let i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: url + '/api/goodsedit',
        method: 'post',
        data: form
    })
}
//商品管理总数
export const shopManageNum = (params) => {
    return axios({
        url: url + '/api/goodscount',
        method: 'get',
        params: params
    })
}



//------------------------------------会员管理-----------------------------------

//会员列表
export const memberList = (params) => {
    return axios({
        url: url + '/api/memberlist',
        method: 'get',
        params: params
    })
}

//会员获取当前的id
export const memberId = (params) => {
    return axios({
        url: url + '/api/memberinfo',
        method: 'get',
        params: params
    })
}

//会员修改
export const memberChange = (params) => {
    return axios({
        url: url + '/api/memberedit',
        method: 'post',
        data: qs.stringify(params)
    })
}



//-------------------------------轮播图管理------------------------------

//轮播图添加
export const bannerAdd = (params) => {
    var form = new FormData()
    for (let i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: url + '/api/banneradd',
        method: 'post',
        data: form
    })
}
//轮播图列表
export const bannerList = (params) => {
    return axios({
        url: url + '/api/bannerlist',
        method: 'get',
        params: params
    })
}

//轮播图删除
export const bannerDelete = (params) => {
    return axios({
        url: url + '/api/bannerdelete',
        method: 'post',
        data: qs.stringify(params)
    })
}
//轮播图获取当前的id
export const bannerId = (params) => {
    return axios({
        url: url + '/api/bannerinfo',
        method: 'get',
        params: params
    })
}

//轮播图修改
export const bannerChange = (params) => {
    var form = new FormData()
    for (let i in params) {
        form.append(i, params[i])
    }
    return axios({
        url: url + '/api/banneredit',
        method: 'post',
        data: form
    })
}

//--------------------------------秒杀--------------------------------------
//秒杀添加
export const seckillAdd = (params) => {
    return axios({
        url: url + "/api/seckadd",
        method: "post",
        data: qs.stringify(params)
    })
}
//秒杀列表
export const seckill_List = () => {
    return axios({
        url: url + '/api/secklist',
        method: 'get'
    })
}
//获取一条秒杀对应的id
export const seckillId = (params) => {
    return axios({
        url: url + '/api/seckinfo',
        method: 'get',
        params: params
    })
}
//秒杀修改
export const seckillChange = (params) => {
    return axios({
        url: url + '/api/seckedit',
        method: 'post',
        data: qs.stringify(params)
    })
}
//秒杀删除
export const seckillDelete = (params) => {
    return axios({
        url: url + '/api/seckdelete',
        method: 'post',
        data: qs.stringify(params)
    })
}