module.exports = dataMocker.mock({
	message : '',
	code : 0,
	data : {
		'id|1-999' : 1,
		title : 'aaa',
		detail : 'bbbbbbb',
		'workers|1-6' : [{
			name : /(小明|小红|陈莹莹|王晶晶|张风|林云龙)/,
			avatar : /\/data\/worker\/avatar\/xx\.jpg\?id=[1-5]/
		}],
		'related_members|1-6' : [{
			name : /(小明|小红|陈莹莹|王晶晶|张风|林云龙)/,
			avatar : /\/data\/worker\/avatar\/xx\.jpg\?id=[1-5]/
		}],
		limit_time : '@DATETIME("2016-MM-dd HH:mm:ss")',
		'level|1-5' : 1,
		'repeat|1-5' : 1,
	}
});