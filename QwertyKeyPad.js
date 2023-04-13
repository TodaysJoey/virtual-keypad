const Keyboard = window.SimpleKeyboard.default;
// const keyLayout = {
//     layout : {
//         default: [
//           "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
//           "{tab} \u1107 \u110c \u1103 \u1100 \u1109 \u116d \u1167 \u1163 \u1162 \u1166 [ ] \\",
//           "{lock} \u1106 \u1102 \u110b \u1105 \u1112 \u1169 \u1165 \u1161 \u1175 ; ' {enter}",
//           "{shift} \u110f \u1110 \u110e \u1111 \u1172 \u116e \u1173 , . / {shift}",
//           ".com @ {space}",
//         ],
//         shift: [
//           "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
//           "{tab} \u1108 \u110d \u1104 \u1101 \u110a \u116d \u1167 \u1163 \u1164 \u1168 { } |",
//           '{lock} \u1106 \u1102 \u110b \u1105 \u1112 \u1169 \u1165 \u1161 \u1175 : " {enter}',
//           "{shift} \u110f \u1110 \u110e \u1111 \u1172 \u116e \u1173 < > ? {shift}",
//           ".com @ {space}",
//         ]
//     },
//     layoutCandidates: {},
//     keyboardRef: null,
//     stateToIgnore: null
// };

let buttonArray = [];
let inputText = "";
const keyLayout = {
    layout : {
        default: [
          "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
          "{tab} \u3142 \u3148 \u3137 \u3131 \u3145 \u315B \u3155 \u3151 \u3150 \u3154 [ ] \\",
          "{lock} \u3141 \u3134 \u3147 \u3139 \u314E \u3157 \u3153 \u314F \u3163 ; ' {enter}",
          "{shift} \u314B \u314C \u314A \u314D \u3160 \u315C \u3161 , . / \uD55C/\uC601",
          ".com @ {space}",
        ],
        shift: [
          "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
          "{tab} \u3143 \u3149 \u3138 \u3132 \u3146 \u116d \u1167 \u1163 \u3152 \u3156 { } |",
          '{lock} \u3141 \u3134 \u3147 \u3139 \u314E \u3157 \u3153 \u314F \u3163 : " {enter}',
          "{shift} \u314B \u314C \u314A \u314D \u3160 \u315C \u3161 < > ? \uD55C/\uC601",
          ".com @ {space}",
        ],

        english: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{lock} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m , . / \uD55C/\uC601",
              ".com @ {space}",
        ],
        englishUpperCase: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              '{lock} A S D F G H J K L : " {enter}',
              "{shift} Z X C V B N M < > ? \uD55C/\uC601",
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
  
function onChange(input) {
    document.querySelector(".input").value = inputText;
    console.log("Input changed", input);
}
  
function onKeyPress(button) {
    console.log("Button pressed", button);
    if (!["{shift}",
          "{language}",
          "{enter}",
          "{bksp}",
          "{space}",
          "{tab}",
          "한/영"
        ].includes(button)
      ) { buttonArray.push(button); }
      
      if (button === "{bksp}")  buttonArray.pop();
      if (button === "{space}") buttonArray.push(" ");
      if (button === "{tab}")   buttonArray.push("  ");
      }
      
      
    inputText = Hangul.assemble(buttonArray);
      
    if (button === "{shift}" || button === "{lock}") handleShift(); // shift 키 잠금 기능
    if (button === "한/영") handleChangeLanguage();                 // 한,영 전환 기능
}

function handleShift() {
    let currentLayout = myKeyboard.options.layoutName;
    let shiftToggle = "";
    if(currentLayout === "default") {
        shiftToggle = "shift";
    } else if(currentLayout === "english") {
        shiftToggle = "englishUpperCase";
    } else if(currentLayout === "shift") {
        shiftToggle === "default";
    } else {
        shiftToggle === "english";
    }
  
    myKeyboard.setOptions({
      layoutName: shiftToggle
    });
}

function handleChangeLanguage() {
    let currentLayout = myKeyboard.options.layoutName;
    let langToggle = currentLayout === "default" ? "english" : "default";
    myKeyboard.setOptions({
        layoutName: langToggle
    });
}