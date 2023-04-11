const Keyboard = window.SimpleKeyboard.default;
const keyLayout = {
    layout : {
        default: [
          "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
          "{tab} \u1107 \u110c \u1103 \u1100 \u1109 \u116d \u1167 \u1163 \u1162 \u1166 [ ] \\",
          "{lock} \u1106 \u1102 \u110b \u1105 \u1112 \u1169 \u1165 \u1161 \u1175 ; ' {enter}",
          "{shift} \u110f \u1110 \u110e \u1111 \u1172 \u116e \u1173 , . / {shift}",
          ".com @ {space}",
        ],
        shift: [
          "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
          "{tab} \u1108 \u110d \u1104 \u1101 \u110a \u116d \u1167 \u1163 \u1164 \u1168 { } |",
          '{lock} \u1106 \u1102 \u110b \u1105 \u1112 \u1169 \u1165 \u1161 \u1175 : " {enter}',
          "{shift} \u110f \u1110 \u110e \u1111 \u1172 \u116e \u1173 < > ? {shift}",
          ".com @ {space}",
        ]
    },
    layoutCandidates: {}
};

const myKeyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    ...keyLayout
});

/**
 * Update simple-keyboard when input is changed directly
 */
// document.querySelector(".input").addEventListener("input", event => {
//     myKeyboard.setInput(event.target.value);
// });
  
function onChange(input) {
    document.querySelector(".input").value = input;
    console.log("Input changed", input);
    
    var temp = 'ㅇ';
    console.log('test:' + temp.charCodeAt());
    let pre = Hangul.disassemble(input);
    console.log(pre);
    for(var i=0; i<pre.length; i++) {
        console.log(pre[i]);
        console.log(pre[i].charCodeAt());

        seperate(pre[i]);
    }
    console.log('disassemble the end');

    // 아스키코드 기준으로 assemble
    let curr = Hangul.assemble(pre);
    console.log(curr);
}
  
function onKeyPress(button) {
    console.log("Button pressed", button);
    /**
     * * If you want to handle the shift and caps lock buttons
     * */
    if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
    let currentLayout = myKeyboard.options.layoutName;
    console.log(currentLayout);
    let shiftToggle = currentLayout === "default" ? "shift" : "default";
  
    myKeyboard.setOptions({
      layoutName: shiftToggle
    });
  }


function seperate(str) {
    debugger;
    let sb = [];
    // 초성 19개
    var arr_cho =
            ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

    // 중성 21개
    var arr_jung =
            ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];

    // 종성 28개
    var arr_jong =
            ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

    // StringBuffer sb = new StringBuffer();
    for (let i=0; i<str.length; i++) {
        let uniVal = str.charCodeAt(); // 자바스크립트의 charCodeAt은 정수 반환
        uniVal = '0x'+uniVal.toString(16);
        // console.log(uniVal);

        
        try {
            debugger;
            // if (uniVal >= 0xAC00 && uniVal <= 0xD7A3) {
            if (parseInt(uniVal,16) >= parseInt('0x1100',16) && parseInt(uniVal,16) <= parseInt('0x1112', 16)) {
                uniVal = String.fromCharCode(parseInt(uniVal,16)  + parseInt('0x2031',16));
                // let cho = String.fromCharCode(uniVal / 28 / 21);
                // let jung = String.fromCharCode(uniVal / 28 % 21);
                // let jong = String.fromCharCode(uniVal % 28);
                debugger;
                sb.push(String.fromCharCode(uniVal));
                // sb.push(jung);
                // sb.push(jong);
            } else {
                sb.push(String.fromCharCode(uniVal));
            }
        } catch {
            sb.push(String.fromCharCode(uniVal));
        }
    }

    console.log('result:');
    console.log(sb);

    return sb.toString();
}
