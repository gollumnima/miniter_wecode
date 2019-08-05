//기억해! className이 아무리 하나라도, 유사배열 형태로 들어가는 거라서 [0] 영번째라고 꼭 써야 이벤트가 먹힌다!!!

document.getElementsByClassName('write_doorits_input')[0].addEventListener('keyup', check_bytes)
const btn_limit = document.getElementsByClassName('doorit_btn')[0]
const min = document.getElementsByClassName('min_count')[0];
const max = 300;
document.getElementsByClassName('max_count')[0].innerHTML = max.toString();

//한글은 2바이트, 영어는 1바이트 차지하게 만들어주는 함수.
function count(msg) {
  let total = 0
  for (let i = 0; i < msg.length; i++) {
    let current = msg.charCodeAt(i);
    (current > 128) ? total += 2 : total++
  }
  return total;
}

//바이트 체크해서 300자 넘어가면 이벤트 뙇!
function check_bytes(e) {
  let total = count(e.target.value)
  if (total <= max) {
    min.innerText = total.toString()
    msg = event.target.value;
    console.log(msg, '첫번째')
  }
  else {
    alert('너무 길게 썼어요~ 쫌만 줄이세요!')
    //300자 이상 적으면 버튼 색깔 회색으로 변화쓰
    btn_limit.style.backgroundColor = "#bdbdbd"
    min.innerText = count(msg).toString()
    event.target.value = msg;
  }
}

//제로초방식으로 fetch 연습해보기
// fetch('./data/getAllTimeline.json')
// .then((res) => {
//   if (res.status >= 200 || res.status < 400) {
//     res.text().then(text => console.log(text))
//   }
//   else {
//     console.log(res.statusText)
//   }
// }).catch(err => console.log(err)) 

//최근꺼 지우지말기!!!@#$%^&*^%$#@!
let doorits_box = document.getElementsByClassName('doorits_box')[0]
//노드 만드는 함수 따로 만든거
function createNode(element) {
  return document.createElement(element);
}
//부모자식 엮어주는 함수
function append(parent, el) {
  return parent.appendChild(el)
}


function opening() {
  fetch('./data/getAllTimeline.json') // json파일이 있는 파일의 경로
    .then((res) => res.json()) // 데이터를 json형태로 바꿔주기
    .then(function (data) { // data라는 임의의 값을 인자로 받는 함수.
      let people = data.result; //json파일을 감싸는 객체가 result로 시작해서 data.result
      console.log(people) // people 콘솔을 찍어보면 {contents: "도리를 찾아서~", date: "19920601", user: "Dory"} 이러한 객체가 7개 나옴
      return people.map(function (person) { //people에서 contents,date,user를 뽑아내기 위해 map 사용
        // 이 아래는 html 틀 구현을 위해 쓴 식들
        let contents_wrap = createNode('div')
        let name = createNode('button')
        let time = createNode('span')
        let doorit = createNode('div')
        contents_wrap.className = 'contents_wrap'
        name.className = 'doorits_id'
        time.className = 'time'
        doorit.className = 'doorits_contents'

        name.innerHTML += person.user
        time.innerHTML += `${String(person.date).split('').slice(0, 4).join('')}-${String(person.date).split('').slice(4, 6).join('')}-${String(person.date).split('').slice(6, 8).join('')}`
        doorit.innerHTML += person.contents

        append(contents_wrap, name)
        append(contents_wrap, time)
        append(contents_wrap, doorit)
        append(doorits_box, contents_wrap)

        doorits_box.prepend(contents_wrap)

        //원래 있는 트윗의 개수 불러오기!
        const sum_doorits = document.getElementsByClassName('sum_doorits')[0]
        const total_doorits = doorits_box.children.length
        sum_doorits.innerHTML = total_doorits;
      })
    })
    .catch(err => console.log(err))
}

//페이지 열때 뜨는 이벤트! json에서 데이터 불러오기
document.addEventListener('DOMcontentLoaded', opening());

//새 트윗 작성하는 함수
function doorit_new() {

  const doorit_msg = document.getElementsByClassName('write_doorits_input')[0]
  const contents_wrap_new = document.createElement('div')
  contents_wrap_new.className = 'contents_wrap'

  const name_new = document.createElement('button')
  name_new.className = 'doorits_id'
  name_new.innerHTML += 'Doori Kim'
  name_new.addEventListener('click', filter)

  let yyyy = new Date().getFullYear()
  let mm = (new Date().getMonth() + 1).toString().padStart(2, 0)
  let dd = new Date().getDate().toString().padStart(2, 0)
  const time_new = document.createElement('span')
  time_new.className = 'time'
  time_new.innerHTML += yyyy + '-' + mm + '-' + dd

  const doorit_new = document.createElement('div')
  doorit_new.className = 'doorits_contents'
  doorit_new.innerHTML += doorit_msg.value

  doorits_box.appendChild(contents_wrap_new)
  contents_wrap_new.appendChild(name_new)
  contents_wrap_new.appendChild(time_new)
  contents_wrap_new.appendChild(doorit_new)
  doorits_box.prepend(contents_wrap_new)

  const sum_doorits = document.getElementsByClassName('sum_doorits')[0]
  const total_doorits = doorits_box.children.length
  sum_doorits.innerHTML = total_doorits;
}

btn_limit.addEventListener('click', doorit_new)

//최신 트윗 수 반영되게 하기
//트윗 만드는 공간에 넣고, 새 트윗 작성하는 공간 하단에도 넣기!
//삭제시 트윗 수가 변경되도록 하기.. 도전!!!


//이름 클릭하면 내 이름만 지우기
function filter() {
  let be_empty = document.getElementsByClassName('contents_wrap')[0]
  if (event.target.innerText === 'Doori Kim') {
    be_empty.remove();
    const sum_doorits = document.getElementsByClassName('sum_doorits')[0]
    const total_doorits = doorits_box.children.length
    sum_doorits.innerHTML = total_doorits; // 헐 대박..
  }
}