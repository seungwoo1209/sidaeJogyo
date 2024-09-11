document.addEventListener('DOMContentLoaded', function () {
    // 각 라디오 버튼 그룹 선택
    const contentNameRadios = document.getElementsByName('contentName');
    const contentTimeRadios = document.getElementsByName('contentTime');
    const contentStairRadios = document.getElementsByName('contentStair');

    const contentDetail = document.getElementById('contentDetail');
    const textForCopy = document.getElementById('textForCopy');

    // // 'Jandi' 버튼 클릭 이벤트
    // document.getElementById('jandiButton').addEventListener('click', function () {
    //     alert('잔디 버튼이 클릭되었습니다.');
    // });

    // 'Copy' 버튼 클릭 이벤트
    document.getElementById('copyButton').addEventListener('click', function () {
        const contentToCopy = textForCopy.innerText;
        navigator.clipboard.writeText(contentToCopy)
            .then(() => {
                alert('내용이 복사되었습니다.');
            })
            .catch((err) => {
                console.error('복사 실패: ', err);
            });
    });

    // 라디오 버튼이 선택될 때마다 텍스트 갱신
    function updateTextForCopy() {
        let selectedContentName = '';
        let selectedContentTime = '';
        let selectedContentStair = '';

        // contentName 라디오 버튼에서 선택된 값 가져오기
        contentNameRadios.forEach(radio => {
            if (radio.checked) {
                selectedContentName = radio.nextElementSibling.innerText;
            }
        });

        // contentTime 라디오 버튼에서 선택된 값 가져오기
        contentTimeRadios.forEach(radio => {
            if (radio.checked) {
                selectedContentTime = radio.nextElementSibling.innerText;
            }
        });

        // contentStair 라디오 버튼에서 선택된 값 가져오기
        contentStairRadios.forEach(radio => {
            if (radio.checked) {
                selectedContentStair = radio.nextElementSibling.innerText;
            }
        });

        let finalText;

        switch(selectedContentName) {
            case "화장실 점검":
                finalText = checkToilet(selectedContentTime, selectedContentStair);
                break;
            case "출결 현황":
                finalText = attendanceStatus(selectedContentTime, selectedContentStair);
                break;
            case "비품 점검":
                finalText = checkSupplies();
                break;
            case "마감":
                finalText = closing(selectedContentStair);
                break;
            default:

        }
        
        // 생성된 텍스트를 화면에 표시
        textForCopy.innerText = finalText;
    }

    const checkToilet = (selectedContentTime, selectedContentStair) => {
        let toiletCheckingStair="";
        let mainDescription = "";
        const wordsArray = contentDetail.value.split(' '); // 공백을 기준으로 문자열을 분리하여 배열로 만듦

        if(selectedContentStair == 2 || selectedContentStair == 3){
            toiletCheckingStair = "2-3";
            mainDescription = 
            `2층 롤휴지 ${wordsArray[0]}개, 페이퍼타올 ${wordsArray[1]}개

            3층 롤휴지 ${wordsArray[2]}개, 페이퍼타올 ${wordsArray[3]}개`;
        } else {
            toiletCheckingStair = "4-6";
            mainDescription = 
            `4층 롤휴지 ${wordsArray[0]}개, 페이퍼타올 ${wordsArray[1]}개

            5층 롤휴지 ${wordsArray[2]}개, 페이퍼타올 ${wordsArray[3]}개

            6층 롤휴지 ${wordsArray[4]}개, 페이퍼타올 ${wordsArray[5]}개`;
        }


        return `H관 ${selectedContentTime} ${toiletCheckingStair}층 남자화장실 점검 완료 및

        ${selectedContentStair}층 환경점검 완료했습니다.

        ${mainDescription}

        및 물비누 채웠습니다

        그 외 특이사항 없습니다
        `;
    }

    const attendanceStatus = (selectedContentTime, selectedContentStair) => {
        const wordsArray = contentDetail.value.split(' '); // 공백을 기준으로 문자열을 분리하여 배열로 만듦

        return `H관 ${selectedContentStair}층

        <${selectedContentTime}출결>

        카드미태깅:${wordsArray[0]}

        IN인데 자리에 없음:${wordsArray[1]}

        OUT인데 자리에 있음:${wordsArray[2]}

        핸드폰 미제출:${wordsArray[3]}

        핸드폰 ON:${wordsArray[4]}

        수면:${wordsArray[5]}

        라이브러리 온도 ${wordsArray[6]}
        `;
    }

    const checkSupplies = () => {
        const date = new Date();
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = days[date.getDay()]; // 요일

        const wordsArray = contentDetail.value.split(' '); // 공백을 기준으로 문자열을 분리하여 배열로 만듦

        return `<H관 ${date.getMonth() + 1}/${date.getDate()} (${dayOfWeek}) 비품현황>

        점보롤 : ${wordsArray[0]}박스

        페이퍼타올 : ${wordsArray[1]}박스

        물티슈 : ${wordsArray[2]}박스

        종이컵: ${wordsArray[3]}박스

        큰종이컵 : ${wordsArray[4]}박스

        두모금컵 : ${wordsArray[5]}박스

        물비누 : ${wordsArray[6]}통
        `
    }

    const closing = (selectedContentStair) => {
        let stairString = selectedContentStair;
        if(selectedContentStair == 5 || selectedContentStair == 6){
            stairString = "5, 6"
        }
        return `H관 ${stairString}층 전원 하원 후 라이브러리 마감했습니다.`
    }

    // 라디오 버튼과 텍스트 입력에 이벤트 리스너 추가
    contentNameRadios.forEach(radio => radio.addEventListener('change', updateTextForCopy));
    contentTimeRadios.forEach(radio => radio.addEventListener('change', updateTextForCopy));
    contentStairRadios.forEach(radio => radio.addEventListener('change', updateTextForCopy));
    contentDetail.addEventListener('input', updateTextForCopy);

    // 페이지가 로드되면 초기 텍스트 설정
    updateTextForCopy();
});
