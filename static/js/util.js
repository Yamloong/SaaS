//--v 모든 팝업을 위한 focus 이동 스크립트 --------------------------------------------
var $target;
function openPop(id){
	$target = document.getElementById(id);
    if (!$target) return;
	
	$target.style.display='block';
	$target.setAttribute('tabindex','0');
	$target.focus();
	document.body.style.overflowY='hidden';
}
//--^ 모든 팝업을 위한 focus 이동 스크립트 --------------------------------------------

$(document).ready(function () {


	// 모든 팝업 닫기
	var openPopups = []; // 열린 팝업 목록을 관리할 배열 추가
	$('.layer-pop').on('click','.btn_close',function () {
		var $popup = $(this).parents('.layer-pop');
		$popup.hide();
		$('body').css({ overflowY: 'auto' });

		var index = openPopups.indexOf($popup[0]);
		if (index !== -1) {
			openPopups.splice(index, 1); // 열린 팝업 목록에서 제거
		}

		var $lastFocusedPopup = openPopups[openPopups.length - 1];
		if ($lastFocusedPopup) {
			$lastFocusedPopup.focus();
		} else {
			$("button").each(function (index, item) {
				var onClickStr = $(item).attr("onclick");
				if (onClickStr !== undefined && onClickStr.indexOf($popup[0].id) !== -1) {
					$(item).focus();
				}
			});
		}
	});
	
	// 윈도우 팝업 닫기
	$('.layer-pop .close2').click(function(){
		window.open('','_self').close();
	});


	// 모바일 GNB 메뉴 동작
	$('header .btn_menu').click(function(){
		$('#gnb').show();
		$('body').css({overflowY:"hidden"});
	});
	$('#gnb .btn_close').click(function(){
		$('#gnb').hide();
		$('body').css({overflowY:"auto"});
		$('header .btn_menu').focus();
	});
	

	// input && textarea 입력글자 수 제한
	$('.byte-limit').on('input', function() {
		var maxBytes = parseInt($(this).data('maxbytes'));
		var currentBytes = new TextEncoder().encode($(this).val()).length;

		// 현재 byte 수 표시
		$(this).siblings('.unit').find('.now').text(currentBytes);

		if (currentBytes > maxBytes) {
			// 입력이 최대 byte를 초과하면 자르기
			var truncatedValue = new TextDecoder().decode(new Uint8Array(new TextEncoder().encode($(this).val()).slice(0, maxBytes)));
			$(this).val(truncatedValue);
			currentBytes = maxBytes;
		}

		// 남은 byte 수 업데이트
		// var remainingBytes = maxBytes - currentBytes;
		// $(this).siblings('.unit').find('.remaining').text(remainingBytes);
	});

	// 페이지 로드 시 초기 byte 수 표시
	$('.byte-limit').each(function() {
		var maxBytes = parseInt($(this).data('maxbytes'));
		var currentBytes = new TextEncoder().encode($(this).val()).length || 0; // Default to 0 if no text is present
		$(this).siblings('.unit').find('.now').text(currentBytes);
	});

	// 스크롤 이동 시 툴팁 사라지게
	$(window).scroll(function() {
		hideTooltip();
	});
	$('.layer-body').on('scroll', function() {
		hideTooltip();
	});
	
});


//--v 개인정보처리방침 : 툴팁을 위한 스크립트 start --------------------------------------------

let tooltipElem;

// 툴팁을 보여주는 함수
function showTooltip(target) {
	let tooltipHtml = target.dataset.tooltip;
	if (!tooltipHtml) return;

	// 이미 툴팁이 존재하면 삭제합니다.
	hideTooltip();

	// 툴팁 요소를 생성합니다.
	tooltipElem = document.createElement('div');
	tooltipElem.className = 'tooltip';
	tooltipElem.innerHTML = tooltipHtml;
	document.body.append(tooltipElem);

	// 툴팁 요소를 data-tooltip 속성이 있는 요소 위, 가운데에 위치시킵니다.
	let coords = target.getBoundingClientRect();

	let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
	if (left < 0) left = 0;

	let top = coords.top - tooltipElem.offsetHeight - 5;
	if (top < 0) {
	top = coords.top + target.offsetHeight + 5;
	}

	tooltipElem.style.left = left + 'px';
	tooltipElem.style.top = top + 'px';
}

// 툴팁을 숨기는 함수
function hideTooltip() {
	if (tooltipElem) {
	tooltipElem.remove();
	tooltipElem = null;
	}
}

// 마우스 오버 이벤트 처리
document.addEventListener('mouseover', function (event) {
	let target = event.target;
	showTooltip(target);
});

// 포커스 이벤트 처리 (캡처링 단계에서 처리)
document.addEventListener('focus', function (event) {
	let target = event.target;
	showTooltip(target);
}, true);

// 마우스 아웃 이벤트 처리
document.addEventListener('mouseout', function () {
	hideTooltip();
});

// 포커스 아웃 이벤트 처리
document.addEventListener('focusout', function (event) {
	// 새로운 포커스된 요소가 툴팁 내부에 있는지 확인합니다.
	let newFocusTarget = event.relatedTarget || document.activeElement;
	if (tooltipElem && !tooltipElem.contains(newFocusTarget)) {
		hideTooltip();
	}
});

//--^ 툴팁을 위한 스크립트 end --------------------------------------------


//--^ 가맹점 조회 (가맹점 목록 모바일 touch) start --------------------------------------------
$(document).ready(function () {
	let startY = 0; // 터치 시작 지점 Y 좌표
	let currentY = 0; // 현재 스크롤 위치
	let distanceY = 0; // 터치 이동 거리
	const content = $('.search-list');
	const maxScroll = content.height() - 100; // 스와이프 가능한 최대 거리
  
	// 터치 시작 이벤트
	content.on('touchstart', function (e) {
	  startY = e.originalEvent.touches[0].clientY; // 터치 시작 지점 기록
	  distanceY = 0; // 초기화
	});
  
	// 터치 이동 이벤트
	content.on('touchmove', function (e) {
	  const moveY = e.originalEvent.touches[0].clientY; // 현재 터치 위치
	  distanceY = moveY - startY; // 터치 이동 거리 계산
	  let newScrollY = currentY - distanceY; // 새로운 스크롤 위치 계산
  
	  // 스크롤 위치가 경계를 넘지 않도록 제한
	  newScrollY = Math.max(0, Math.min(newScrollY, maxScroll));
  
	  // 콘텐츠 이동
	  content.css('transform', `translateY(${-newScrollY}px)`);
		
	  // 기본 브라우저 새로고침 막기
	  if (newScrollY > 0) {
		e.preventDefault(); // 기본 동작 차단 (새로고침 방지)
	  }
	});
  
	// 터치 끝 이벤트
	content.on('touchend', function () {
	  currentY -= distanceY; // 현재 위치 업데이트
  
	  // 스크롤 위치가 경계를 넘지 않도록 보정
	  currentY = Math.max(0, Math.min(currentY, maxScroll));
	});
  });
  
//--^ 가맹점 조회 (가맹점 목록 모바일 touch) end --------------------------------------------
  
