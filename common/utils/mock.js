import config from "../config/config.js";
export default{
	mock(url,method, data){
	var postpromise = new Promise(function(resolve, reject) {
		uni.request({
			url: config.mockPath + url,
			method,
			data,
			success: function(res){
			resolve(res.data)
		}
	});
	})
	return postpromise;	
}	
}





