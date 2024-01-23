$(document).ready(function () {
//--v 레이어팝업 함수 -----------------------------------------------------------------
	// 레이어 비활성화
	$(".layer-pop .btn_close").on("click", function () {
		$(this).parents(".layer-pop").fadeOut("fast");
		$("body").removeClass("scroll_lock");

		// 결제취소 팝업
		$('#paymentCancel .layer-wrap').animate({top: "100vh"});
	});
//--^ 레이어팝업 함수 -----------------------------------------------------------------


//--v 카드등록 : 바우처선택 함수 -----------------------------------------------------------------
	$('.sub-wrap .boucher li').on("click", function(){
		$(this).addClass('selected').siblings().removeClass('selected');
	});
//--^ 카드등록 : 바우처선택 함수 -----------------------------------------------------------------


//--v 메인 : 카드선택시 슬라이드 함수 -----------------------------------------------------------------
	$('.card-wrap .card-con .title-wrap').on("click", function(event){
		event.stopPropagation();

		if($(this).parent().hasClass('on')) {
			$(this).parent().removeClass('on');
		} else {
			$(this).parent().addClass('on').siblings().removeClass('on');
		}
	});

	// 배경 클릭 시 카드 전부 닫히게
	$(document).on("click", function (event) {
		if (!$(event.target).closest('.card-con').length) {
			$('.card-con').removeClass('on');
		}
	});
//--^ 메인 : 카드선택시 슬라이드 함수 -----------------------------------------------------------------


});

// 레이어 활성화
function openPop(id){
	$target = document.getElementById(id);
	if (!$target) return;
	
	$target.style.display='block';
	document.body.style.overflowY='hidden';

	// 결제취소 팝업
	if(id == "paymentCancel"){
		$('#paymentCancel .layer-wrap').animate({top: "30vh"},350);
	}
}

// input 숫자 입력시 maxlength 설정 적용되도록
function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}
}