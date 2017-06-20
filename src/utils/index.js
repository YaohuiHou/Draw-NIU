import axios from 'axios'
import Interval from 'real-interval'
const COOKIE = document.cookie
const BASEURL = 'https://topic.360che.com/m/2017060501/'

function getUid(callback){	// 获取userid
	let uid = COOKIE.match(/AbcfN_ajaxuid=([^;$]+)/)
	if(uid && uid[1]){
		return uid[1]
	}else{
		return '-1'
	}
}

function getAvatar (){	// 获取头像
	let avatar = COOKIE.match(/AbcfN_avatar=([^;$]+)/)
	if(avatar && avatar[1])
	return decodeURIComponent(avatar[1])
	else
	return 'https://i.kcimg.cn/data/avatar/noavatar_big.gif-120x120.jpg'
}

function addImage(callback,json){		// 提交图片信息
	axios({
	  method: 'post',
	  url: `${BASEURL}addimg.aspx`,
	  data: json,
	  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	})
	.then(callback)
	.catch(callback)
}

function getRankData(callback,json){		// 排名
	axios({
	  method: 'post',
	  url: `${BASEURL}getrank.aspx`,
	  data: json,
	  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	})
	.then(callback)
	.catch(callback)
}

function getInfoData(callback,json){		// 详情页
	axios({
	  method: 'post',
	  url: `${BASEURL}getinfo.aspx`,
	  data: json,
	  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	})
	.then(callback)
	.catch(callback)
}

function addVote(callback,json){		// 投票
	axios({
	  method: 'post',
	  url: `${BASEURL}addvote.aspx`,
	  data: json,
	  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	})
	.then(callback)
	.catch(callback)
}

function getUserData(callback,json){		// 个人中心
	axios({
	  method: 'post',
	  url: `${BASEURL}getuser.aspx`,
	  data: json,
	  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	})
	.then(callback)
	.catch(callback)
}

function addUserData(callback,json){		// 提交用户信息
	axios({
	  method: 'post',
	  url: `${BASEURL}adduser.aspx`,
	  data: json,
	  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	})
	.then(callback)
	.catch(callback)
}

function shareHref(callback,json){		// 分享
	axios({
	  method: 'post',
	  url: "https://topic.360che.com/api/wx/getinfo.aspx",
	  data: json,
	  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	})
	.then(callback)
	.catch(callback)
}

export default {
	uid: getUid,
	avatar: getAvatar,
	addImage,
	getRankData,
	getInfoData,
	addVote,
	getUserData,
	addUserData,
	shareHref
}
