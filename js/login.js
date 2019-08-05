//id와 pw input에 아무값도 없으면 login btn 회색
//2개 input이 모두 채워져야 파란색으로 바꾸기!

const result_id = document.getElementsByClassName("enter_id").value;
const result_password = document.getElementsByClassName("enter_password").value;
const login_btn = document.getElementsByClassName("gogo");

//if result_in !== '' && result_password !=='' 이면 버튼색깔 바꿔주기
login_btn.addEventListener("onmouseover", function(event) {
  if (result_id !== "" && result_password !== "") {
    //여기서 버튼의 색깔이 파란색으로 바뀌게되는 효과를 넣는데..
    //innerHTML 말고 또 실행시켜주는 요소가 뭐가 있을까???12
  }
});
