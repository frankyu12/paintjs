const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //캔버스에 필요한 콘택스를 선언함
const colors = document.getElementsByClassName("jsColor"); //색상변경을 위한 작업
const range = document.getElementById("jsRange"); //글씨 크기를 조정
const mode = document.getElementById("jsMode"); //fill 기능 만들기
const INITIAL_COLOR = "#2c2c2c";
const saveBtn = document.getElementById("jsSave"); //저장버튼

canvas.width = 700; //캔버스의 크기를 고정해야 그려진다. 
canvas.height = 700;

ctx.fillStyle = 'white'; //저장시 백그라운드 이미지를 흰색으로 저장
ctx.fillRect (0,0,700,700);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; 


//ctx.strokeStyle = "#2c2c2c"; //기초 선에 대한 설정
//ctx.lineWidth = 2.5;
//ctx.fillRect(50,30,30,20) //기초 바탕채우기에 대한 설정
//ctx.fillStyle = "purple"

let painting = false; //기본값을 false로 저장하고 업데이트 하는 방식이다
let filling = false; //fillin을 바꾸기 위한 선언

function stopPainting(){
    painting = false; //painting을 false로 업데이트 함 언제? 마우스다운, 마우스 리브
}

function startPainting(){
    painting = true; ////마우스가 클릭된 곳에서 painting이 true로 업데이트 된다
}

//마우스의 움직임을 감지한다.
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ //경로만 만들어짐 ~
        ctx.beginPath(); //시작점 path is a line
        ctx.moveTo(x, y); //경로로 욺기는 것       
    } else { //선이 만들어짐 ~
        ctx.lineTo(x, y); //선 그리기 마지막 포이트와 현재포인트를 연결 --> 선처럼 보이지만 점이다.
        ctx.stroke(); //선 그리기 !!!!!! 획을 긋는다는 뜻
    }
}



    //만약에 마우스가 캔버스 위에서 움직인다면 에서의 과정을 하나하나 설명함
if(canvas){
    canvas.addEventListener("mousemove" , onMouseMove); //마우스의 움직임
    canvas.addEventListener("mousedown", startPainting); //클릭
    canvas.addEventListener("mouseup" , stopPainting); //클릭을 때는 경우
    canvas.addEventListener("mouseleave", stopPainting); //캔버스에서 나가는 경우
    canvas.addEventListener("click" , handeCanvasClick); //채우기
    canvas.addEventListener("contextmenu" , handleCM) //저장하기 
}



//////색상변경
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color; //fill을 위해서 클릭한 색을 채우고자 하는 색으로 세팅
}
Array.from(colors).forEach(color => //객체를 배열로 만들어주기
    color.addEventListener("click" , handleColorClick)  //색 각각을 실행시켜야 함 each
);

//굵기 변경
function handleRangeChange (event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
if(range){
    range.addEventListener('input',handleRangeChange);
}

//fill btn 만들기 fill을 paint로 바꾸는 방법 
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}
if(mode){
    mode.addEventListener("click" , handleModeClick)
}
//바탕 채우기 
function handeCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, 700, 700)
    } //바탕 채우기 fillrect와 클릭 이벤트를 연결시킴
}
//저장하기
function handleCM(event){
    event.preventDefault();
}

function handleCanvasClick(){
    const image = canvas.toDataURL("image/png"); //원하는 확장자로 저장가능
    const link = document.createElement("a"); // a링크 생성
    link.href = image; //href는 url이 되어야 한다. 
    link.download = "PaintJS"; // 저장하는 이름 설정
    link.click() // 사용자는 모르게 a 를 클릭함
}

if(saveBtn){
    saveBtn.addEventListener("click" , handleCanvasClick);
}



