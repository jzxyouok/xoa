!function(){function e(e){var t=$(e.delegateTarget).data("id"),a=new Date,r=a.getFullYear()+"/"+a.getMonth()+"/"+a.getDate()+" 18:00",s=new ModalDialog({title:"新任务",content:'<form role="form" class="wrapAddTaskWorker">			<div class="form-group">				<input type="text" class="form-control J-taskTitle" placeholder="任务标题">			</div>			<div class="form-group">				<textarea class="form-control J-detail" rows="5" placeholder="任务详情，选填"></textarea>			</div>			<div class="form-group">				<button type="button" class="btn btn-success J-btnAddWorker">+负责人</button>				<span class="J-wrapWorkerResult"></span>			</div>			<div class="checkbox warpMembers J-wrapSelectWorkers"></div>			<div class="form-group">				<button type="button" class="btn btn-success J-btnAddRelatedMember">+相关人员</button>				<span class="J-wrapRelatedMembersResult"></span>			</div>			<div class="checkbox warpMembers J-wrapSelectRelationWorkers"></div>			<div class="form-group">				<label>完成时间：</label>\n				<input class="form-control J-limitTime" type="dateTime-local" value="'+r+'">			</div>		</form>',width:500,height:520,footer:'<button type="button" class="btn btn-primary J-submit">确定</button>'});s.__defineGetter__("selectedWorkerIds",function(){var e=[];return this.find(".J-wrapWorkerResult .J-worker").each(function(){e.push($(this).data("id"))}),e}),s.__defineGetter__("selectedRelatedMemberIds",function(){var e=[];return this.find(".J-wrapRelatedMembersResult .J-member").each(function(){e.push($(this).data("id"))}),e}),s.on("click",".J-btnAddWorker",function(){var e=$(this),t=s.find(".J-wrapWorkerResult"),a=s.find(".J-wrapSelectWorkers");if("+负责人"==e.text()){var r=s.data("members");r||App.ajax({url:"/project/"+App.aParams.projectId+"/members.json",async:!1,success:function(e){s.data("members",e.data),r=e.data}});var n=s.selectedWorkerIds,i=[];for(var d in r){var o=-1!==$.inArray(r[d].id,n)?" checked":"";i.push('<label class="J-memberItem"><input class="J-member" type="checkbox" value="'+r[d].id+'"'+o+">"+r[d].name+"</label>")}a.html(i.join("")),e.text("确定")}else{var i=[];a.find(":checkbox").each(function(){this.checked&&i.push('<label class="J-worker" data-id="'+this.value+'">'+$(this).closest(".J-memberItem").text()+"</label>")}),t.html(i.join("、")),a.empty(),e.text("+负责人")}}),s.on("click",".J-btnAddRelatedMember",function(){var e=$(this),t=s.find(".J-wrapRelatedMembersResult"),a=s.find(".J-wrapSelectRelationWorkers");if("+相关人员"==e.text()){var r=s.data("members");r||App.ajax({url:"/project/"+App.aParams.projectId+"/members.json",async:!1,success:function(e){s.data("members",e.data),r=e.data}});var n=s.selectedRelatedMemberIds,i=[];for(var d in r){var o=-1!==$.inArray(r[d].id,n)?" checked":"";i.push('<label class="J-memberItem"><input class="J-member" type="checkbox" value="'+r[d].id+'"'+o+">"+r[d].name+"</label>")}a.html(i.join("")),e.text("确定")}else{var i=[];a.find(":checkbox").each(function(){this.checked&&i.push('<label class="J-member" data-id="'+this.value+'">'+$(this).closest(".J-memberItem").text()+"</label>")}),t.html(i.join("、")),a.empty(),e.text("+相关人员")}}),s.find(".J-submit").click(function(){var e=s.find(".J-taskTitle").val().trim(),a=s.find(".J-detail").val().trim(),r=s.selectedWorkerIds,i=s.selectedRelatedMemberIds,d=s.find(".J-limitTime").val();return e?r.length?void App.ajax({url:"/task/add.do",data:{title:e,detail:a,taskCategoryId:t,workerIds:r,relatedMemberIds:i,limitTime:d},success:function(e){alert("添加成功");new n(e.data)}}):alert("请选择负责人"):alert("请输入任务标题")}),s.show()}function t(t){var a=this;a.id=t.id,a.name=t.name;var r=$('<div class="col-md-4 taskList J-taskList" data-id="'+a.id+'">\n		<h4 class="J-taskCategoryName">\n			'+a.name+'			<button type="button" class="btn btn-primary J-btnAddTask">+任务</button>		</h4>\n		<div class="J-listItems">\n			\n		</div>	</div>');return r.find(".J-taskCategoryName").hover(function(){$(this).find(".J-btnAddTask").show()},function(){$(this).find(".J-btnAddTask").hide()}),r.on("click",".J-btnAddTask",e),r.refreshTasks=function(){var e=this.find(".J-listItems");App.ajax({url:"/task/list.json",data:{projectId:App.aParams.projectId,categoryId:this.data("id")},success:function(t){for(var a in t.data){var r=new n(t.data[a]);e.append(r)}}})},$.extend(a,r)}function a(){var e=$("#wrapProjectHead"),t=e.find(".J-btnAddMember");e.hover(function(){t.show()},function(){t.hide()}),t.click(function(){var e=prompt("请输入他的UID，小x会发个加入邀请给他");if(e)return FormatValidator.isInteger(e)?void App.ajax({url:"/project/invite-member.do",data:{projectId:App.aParams.projectId,inviteWorkerId:e.trim()},success:function(e){App.alert(e.message)}}):void App.alert("UID是一个数字 (⊙ｏ⊙) 麻烦叫他进个人信息里看看")})}function r(){App.ajax({url:"/project/"+App.aParams.projectId+"/task-categorys.json",success:function(e){var a=$("#taskCategorys");for(var r in e.data){var s=new t(e.data[r]);a.append(s),s.refreshTasks()}}})}function s(){App.ajax({url:"/project/"+App.aParams.projectId+".json",success:function(e){$("#projectName").text(e.data.name)}})}function n(e){var t=function(e){return e},a='<div class="item J-item">\n		<p><input type="checkbox" class="J-chkFinish" />'+e.title+"<p>\n		<p>\n			<span>"+t(e.limit_time)+'</span>\n			<img src="'+e.worker_avatar+'"/>\n		</p>\n	</div>';return $.extend(this,$(a))}$(function(){App.loadParam("project/<projectId:\\d+>.htm"),a(),s(),r()})}();