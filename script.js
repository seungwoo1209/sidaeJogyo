document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');

        inputs.forEach((input, index) => {
            input.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault(); // 기본 Enter 동작 막기
                    const nextInput = inputs[index + 1]; // 다음 input 필드 찾기
                    if (nextInput) {
                        nextInput.focus(); // 다음 input으로 포커스 이동
                    }
                }
            });
        });

    // 각 라디오 버튼 그룹 선택
    const contentStairRadios = document.getElementsByName('contentStair');


    // 라디오 버튼이 선택될 때마다 텍스트 갱신
    function updateTextForCopy() {
        let selectedContentStair = '';

        // contentStair 라디오 버튼에서 선택된 값 가져오기
        contentStairRadios.forEach(radio => {
            if (radio.checked) {
                selectedContentStair = radio.nextElementSibling.innerText;
                document.querySelectorAll(".contentStairSpan").forEach((value) => {
                    value.innerText = selectedContentStair;
                })
            }
        });

        let finalText;
    }

    // 복사 기능을 위한 함수
    function copyContentToClipboard(content) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = content;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        console.log("복사 완료");
    }

    // 모든 copyAndLink 버튼에 대해 이벤트 리스너 추가
    document.querySelectorAll('.copyAndLink').forEach((button, idx) => {
        button.addEventListener('click', function () {
            // 버튼의 부모 요소(textCopyContent)를 찾음
            const parentDiv = button.closest('.textCopyContent');

            // 부모 요소에서 버튼을 제외한 내용을 가져옴
            let content = '';

            // 부모 div 내의 자식 노드를 순회하면서 텍스트와 입력값을 결합
            parentDiv.childNodes.forEach((node,index) => {
                if (node.tagName === 'INPUT') {
                    // input 필드의 value 값을 가져옴
                    content += node.value;
                    console.log(idx);
                    if(idx == 3){
                        if(node.value == ''){
                            console.log("ㅋ");
                            content += 'X';
                        }
                    }
                } else if (node.tagName === 'BR') {
                    // br 태그가 있을 경우 줄바꿈 추가
                    content += '\n';
                } else if (node.tagName !== 'BUTTON' && node.tagName !== 'IMG') {
                    // 텍스트 노드의 경우 텍스트만 추가 (버튼과 이미지는 제외)
                    content += node.textContent.trim();  // 불필요한 공백 제거

                    // 텍스트 노드 뒤에 input 태그가 올 경우 공백 추가 (기존 텍스트에 공백이 있으면 유지)
                    const nextNode = parentDiv.childNodes[index + 1];
                    if (nextNode && (nextNode.tagName === 'INPUT' || nextNode.tagName === 'SPAN') && node.textContent.endsWith(` `)) {
                        content += ' ';
                    }
                }
            });

            // 복사하는 함수 호출
            copyContentToClipboard(content);

            // 데이터 속성에 설정된 URL로 이동
            window.location.href = "tosslabjandi://";  // 페이지 이동
            
        });
    });

    // 라디오 버튼과 텍스트 입력에 이벤트 리스너 추가
    contentStairRadios.forEach(radio => radio.addEventListener('change', updateTextForCopy));
    // contentDetail.addEventListener('input', updateTextForCopy);

    // 페이지가 로드되면 초기 텍스트 설정
    updateTextForCopy();
});
