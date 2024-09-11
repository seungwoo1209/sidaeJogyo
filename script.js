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


    // 'Copy' 버튼 클릭 이벤트
    document.getElementById('copyButton').addEventListener('click', function () {
        const contentToCopy = textForCopy.innerText;
        navigator.clipboard.writeText(contentToCopy)
            .then(() => {
                
            })
            .catch((err) => {
                console.error('복사 실패: ', err);
            });
    });

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
        alert('복사되었습니다!');
    }

    // 모든 copyAndLink 버튼에 대해 이벤트 리스너 추가
    document.querySelectorAll('.copyAndLink').forEach(button => {
        button.addEventListener('click', function () {
            // 버튼의 부모 요소(textCopyContent)를 찾음
            const parentDiv = button.closest('.textCopyContent');

            // 부모 요소에서 버튼을 제외한 내용을 가져옴
            let content = '';

            // 부모 div 내의 자식 노드를 순회하면서 텍스트와 입력값을 결합
            parentDiv.childNodes.forEach(node => {
                if (node.tagName === 'INPUT') {
                    // input 필드의 value 값을 가져옴
                    content += node.value;
                } else if (node.tagName !== 'BUTTON' && node.tagName !== 'IMG') {
                    // 텍스트 노드의 경우 텍스트만 추가 (버튼과 이미지는 제외)
                    content += node.textContent || node.innerText;
                }
            });

            // 복사하는 함수 호출
            copyContentToClipboard(content.trim());
        });
    });

    // 라디오 버튼과 텍스트 입력에 이벤트 리스너 추가
    contentStairRadios.forEach(radio => radio.addEventListener('change', updateTextForCopy));
    // contentDetail.addEventListener('input', updateTextForCopy);

    // 페이지가 로드되면 초기 텍스트 설정
    updateTextForCopy();
});
