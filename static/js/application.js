const APPLICATION_ID= "PAY AS YOU GO";
	const serverIp = 'ajax.php';

	function alertMessage(title,msg,type='info'){
		swal({
			title: title,
			text : msg,
			icon : type,
			button: false
		});
		setTimeout(function () {
			swal.close();
		},3000);
	}

	const database = {
		insert:(table,data={})=>{
			localStorage.setItem(table,JSON.stringify(data));
		},
		getData:(table)=>{
			return localStorage.getItem(table) ? JSON.parse(localStorage.getItem(table)) : false;
		}
	}

	function getValue(el){
		return $(el).val();
	}

	function putValue(el,value){
		return $(el).val(value);
	}

	function empty(value){
		if(value=="" || typeof(value)==null) return true;
		return false;
	}

	function isFullName(name){
		let fullName = name.split(' ');
		if(fullName.length >=2) return true
		return false;
	}

	// international phone number validation

	function isValidPhoneNumber(number) {
		if (number==='') return 'Enter new Contact Number';
		var filterX = number.replace('+','').replace(/,/g,'');
		var filterY = filterX.replace(/ /g,'').replace('(','');
		var filterNumber = filterY.replace(')','');
		var numericNumber = isNumeric(filterNumber);
		var numberLength = filterNumber.length;
		if (!numericNumber){
			return 'Number entered contains non Numeric Characters';
		}
		if (numberLength-1 < 2 ){
			return 'No country code detected, Please enter a country code for your number';
		}
		if (numberLength < 12 || numberLength > 12){
			return 'Invalid phone number. Please enter a valid phone number'
		}

	}

	/*
		Convert json Obj to string
	*/
	function jsonString(String){
		return JSON.stringify(String);
	}

	/*
		Convert string to json
	*/
	function toJson(String){
		return $.parseJSON(String);
	}

	function putInSession(key,val){
		return window.sessionStorage.setItem(APPLICATION_ID+key,val);
	}

    function getInSession(key){
        let v= window.sessionStorage.getItem(APPLICATION_ID+key);
        if(typeof v!=null || v!=null) return v;
        return null;
    }

    function removeInSession(key){
        window.sessionStorage.removeItem(APPLICATION_ID+key);
        return true;
    }

	function flashInputError(el){
		var bgcolor = $(el).css("background");
		$(el).css("background","#999");
		setTimeout(function cc(){
			$(el).css("background",bgcolor);
		},1000);
	}

	/*
		@return true if is valid phone number
		@return false if is not valid phone number
	*/
	function isPhoneNumber(phone){
		var check = /^\d{10}$/;
		if(phone.length<10) return false;
		if(phone.match(check))
			return true
		return false
	}

	function kwacha(amount){
		amount =  parseInt(amount.replace('.00',''))
		return 'MWK'+amount.toLocaleString()+'.00';
	}

	/*Validate Email
	*/
	function isEmail(email) {
		var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(email.match(format)) return true;
		return false;
	}
	/*
		Redirect
		@after int time in millseconds
	*/
	function redirect(URL,after,target){
		if(target != null || after !="undefined"){
			//return window.open(URL,target);
		}
		if(after == null || after =="undefined"){
			return window.location.href = URL;
		}
		setTimeout( function rd(){
			window.location.href = URL;
		},after);
	}

	function replaceAll(str,src,_with){
		var array = str.trim().split(src), newStr='';
		for (var i = 0; i < array.length; i++) {
			if(typeof(array[i]) != "undefined"){
				if(i+1 == array.length){
					newStr += array[i];
				}
				else
					newStr += array[i]+_with;
			}
		}
		if(newStr != '')return (newStr);
		return (str);
	}

	function isNumeric(number){
      var numbers = /^[0-9]+$/;
      if(number.match(numbers)){
      	return true;
      }
	  return false;
	}

	function getCharAt(string,position){
        return string.substring(0,position);
    }

    function urldecode(str) {
        return decodeURIComponent((str+'').replace(/\+/g, '%20'));
    }

    function onlyNums(string){
        string = string.replace(/\D/g,'');
        return string;
    }

    function getParam(ParamID){
        var myAddress = window.location.href, url=null,p=null;
        url = new URL(myAddress);
        p = url.searchParams.get(ParamID);
        if(p==null || p=="") return null;
        return p;
    }

	/*
	*
	* */
	function isURL(url) {
		var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
		return urlregex.test(url);
	}

	function move(arr, val) {
		var j = 0;
		for (var i = 0, l = arr.length; i < l; i++) {
			if (arr[i] !== val) {
				arr[j++] = arr[i];
			}
		}
		arr.length = j;
	}

	function dbPut(k,v){
		return localStorage.setItem(APPLICATION_ID+'.'+k,v);
	}

	function dbGet(k){
		var v= localStorage.getItem(APPLICATION_ID+'.'+k);
		if(v==null) return null;
		return v;
	}

	function dbRemove(k){
		return localStorage.removeItem(APPLICATION_ID+'.'+k);
	}

	function dbClear(){
		return localStorage.clear();
	}

	function strHas(str,has){
		var pattern = new RegExp(has);
		if(pattern.test(str)==true) return true;
		return false;
	}

	let loadingContent = '';
	function startLoading(obj) {

		loadingContent = $(obj).html();
		let btnWidth   = obj[0].clientWidth;
		if (btnWidth){
			$(obj).html('<span class="fa fa-spin fa-spinner"></span> Wait...').attr({
				disabled:true,
			}).css({
				width:btnWidth+3
			});
		}
	}
	function doneLoading(obj) {
		$(obj).html(loadingContent).attr('disabled',false);
	}

	function alertMessage(title,msg,type='info'){
		swal({
			title: title,
			text : msg,
			icon : type,
			button: false
		});
		setTimeout(function () {
			swal.close();
		},3000);
	}


	function searchInTable(obj,tbody='tbody'){
		$(obj).keyup(function () {
			let searchData = $(this).val();
			$(tbody+' tr').each(function (index,element) {
				if($(this).text().toLowerCase().indexOf(searchData.toLowerCase()) >= 0){
					$(this).show();
				}else{
					$(this).hide();
				}
			});
		});
	}

	function toastConfirmMessage(title,msg){
		return swal({
			title:title,
			text :msg,
			icon:'warning',
			buttons:true,
			dangerMode: true
		}).then(clear=>{
			if (clear){
				return true;
			}else{
				return false;
			}
		});
	}

	function SEARCH_ENGINE() {

		let search    = $('.search-info').val();
		let limit     = $('.limit').val();
		let shop   = $('.shops_').val();
		let status    = $('.status').val();

		let query     = '?page='+getParam('page')+'&subpage='+getParam('subpage');
		query = search ? query+'&search='+search : query;
		query = limit ?  query+'&limit='+limit : query;
		query = shop ? query+'&shop='+shop : query;
		query = status ? query+'&status='+status : query;

		redirect(query);
	}

	 function post(j,obj,url=serverIp) {
		return new Promise((resolve,reject)=>{
			if (obj) startLoading(obj);
			let formData = new FormData();
			j    = JSON.stringify(j);
			formData.append('data',j);
			return fetch(url,{
				method : 'POST',
				body   : formData
			}).then((response)=>response.text()).then((results)=>{

				let json = JSON.parse(results);
				if (obj) doneLoading(obj);
				resolve(json);

			}).catch((error)=>{
				if (obj) doneLoading(obj);
				reject(error);
			});
		});
	}

	function postAndRedirect(j,obj,redirectQuery=false,back=false,ajax=false) {
		post(j,obj,ajax).then(json=>{
			toastMessage(json.msg,json.type);
			if (json.type=='success'){
				if (!redirectQuery){
					back ? setTimeout(()=>{ $('.goBack').click() },2000) : redirect('',2000)
				}else{
					redirect(redirectQuery,2000);
				}
			}
		});
	}

	function numericFormat(input){
		let value = $(input).val();
		if (value){
			value = onlyNums(value);
			if (value){
				$(input).val(parseInt(value).toLocaleString());
			}else{
				$(input).val(value.toLocaleString());
			}
		}else{
			$(input).val('');
		}
	}

	$(function () {

		//search engine
			let page    = getParam('page');
			let subPage = getParam('subpage');
			let limit   = getParam('limit');
			let search  = getParam('search-info');
			let classes = getParam('classes');
			let status  = getParam('status');

			setTimeout(()=>{
				limit   ? $('.limit').val(limit)        : false;
				search  ? $('.search-info').val(search) : false;
				classes ? $('.classes_option').val(classes)    : false;
				status  ? $('.status').val(status)      : false;
			},10);



			$('html').on('keyup','.validateNumber',function () {
			let obj = $(this);
			$(obj).val(onlyNums(obj.val()));
		});

		$('html').on('keyup','.validateMoney',function () {
			let obj = $(this);
			numericFormat(obj);
		});

		$('.goBack').click(function () {
			let x = document.location.href;

			if (/modal=true/.test(x)){
				let page = getParam('page');
				let subPage = getParam('redirect');
				let url = `?page=${page}&subpage=${subPage}&modal=true`;
				sessionStorage.setItem('counter',1);
				redirect(url);
			}else{
				history.back();
			}
			//console.log(history);
		});

	});


	function toastMessage(msg,icon=false,position='topRight',myTheme='light',animate='bounceInRight') {
		if (icon=='success') icon = 'pe-7s-check';
		if (icon=='info') icon ='pe-7s-info';
		if (!icon) icon = 'pe-7s-attention';

		return  iziToast.show({
			message : msg,
			theme : myTheme,
			balloon: true,
			position:position,
			animateInside: true,
			transitionIn: animate,
			transitionOut: "flipOutX",
			icon:icon,
			color:'white'
		});
	}