import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import _ from 'lodash';
import {cloneDeep} from "@babel/types";

function App() {
  let [recommendation, setRecommendation] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let cnt = recommendation.length;
  let arrCnt = [];
  for (let i = 0; i < cnt; i++) {
    arrCnt.push(0);
  }
  let [like, setLike] = useState(arrCnt);
  let [logo, setLogo] = useState('ReactBlog');
  let [modal, setModal] = useState(false);
  let [numModal, setNumModal] = useState(0);
  let [inputVal, setInputVal] = useState("");

  [1,2,3].map(function(i) {
    return '12123'
  })

  function toggleLike() {
    setLike(like + 1);
    console.log(like);
  }

  function sortBySpelling() {
    let deepcopy = _.cloneDeep(recommendation);
    deepcopy.sort((a, b) => a.localeCompare(b));
    setRecommendation(deepcopy);
  }

  function showModal() {
    setModal(!modal);
  }

  function renderModal() {
    if (modal) {
      return <Modal />;
    }
    return null;
  }

  let toggleRecommendation = () => {
    let copy = _.cloneDeep(recommendation);
    if (copy[0] === '남자 코트 추천') {
      copy[0] = '여자 코트 추천';
    } else {
      copy[0] = '남자 코트 추천';
    }
    setRecommendation(copy);
    console.log(recommendation);
  };

  const [count, setCount] = useState(0);

  const [items, setItems] = useState([
    { id: 'a', name: 'Item A' },
    { id: 'b', name: 'Item B' },
    { id: 'c', name: 'Item C' },
  ]);

  const addItem = () => {
    const newItem = { id: `id-${items.length}`, name: `Item ${String.fromCharCode(65 + items.length)}` };
    setItems([...items, newItem]);
  };


  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{color: 'red', fontSize: '16px'}}>{logo}</h4>
      </div>
      <button onClick={sortBySpelling}> 가나다순 정렬</button>

      {/*<Subject1*/}
      {/*  recommendation={recommendation}*/}
      {/*  like={like}*/}
      {/*  setLike={setLike}*/}
      {/*  toggleRecommendation={toggleRecommendation}*/}
      {/*  // setModal={setModal}*/}
      {/*  // modal = {modal}*/}
      {/*  showModal={showModal}*/}
      {/*></Subject1>*/}
      {/*<Subject2*/}
      {/*  recommendation={recommendation}*/}
      {/*  setRecommendation={setRecommendation}*/}
      {/*/>*/}
      {/*<Subject3*/}
      {/*  recommendation={recommendation}*/}
      {/*/>*/}
      <Subject4
        count={count}
        setCount={setCount}
      />
      {
        recommendation.map(function (item, index) {
          return (
            <div className="list" key={index}>
              <h4 onClick={function () {
                setModal(!modal);
                setNumModal(index);
              }}> {item}
                <span onClick={(e) => {
                  let cpy = _.cloneDeep(like);
                  cpy[index] = cpy[index] + 1;
                  setLike(cpy);
                  e.stopPropagation();
                }}>👍</span> {like[index]}
              </h4>
              <p>2월 17일 발행 {index}</p>
              <button onClick={(e) => {
                e.stopPropagation();
                let deleteRecommendation = [...recommendation];
                deleteRecommendation.splice(index, 1);
                setRecommendation(deleteRecommendation);
              }}>삭제
              </button>
            </div>
          )
        })
      }
      <input onChange={(e) => {
        setInputVal(e.target.value);
        console.log(inputVal);
      }}/>
      <button onClick={() => {
        let newRecommendation = [inputVal, ...recommendation];
        setRecommendation(newRecommendation);
        console.log(recommendation);
      }}>버튼</button>
      {modal ? <Modal
        recommendation={recommendation[numModal]}
        color = {'skyblue'}
        toggleRecommendation={toggleRecommendation}
      /> : null}
      <div>
        {items.map(item => (
          <div key={item.id}>
            <h4>{item.name}</h4>
          </div>
        ))}
        <button onClick={addItem}>Add Item</button>
      </div>
      <Modal2/>
    </div>

  );
}
//
// function Subject1({recommendation, like, setLike, toggleRecommendation, showModal}) {
//
//   return (
//     <div className="list">
//       <h4 onClick={showModal}>
//         {recommendation[0]}
//         <span onClick={(e) => {
//           let updateLike = {...like};
//           updateLike[0] = updateLike[0] + 1;
//           setLike(updateLike);
//           e.stopPropagation();
//         }}>👍</span> {like[0]}
//       </h4>
//       <button onClick={toggleRecommendation}>추천 변경</button>
//       <p> 2월 17일 발행</p>
//     </div>
//   );
// }
//
// function Subject2({recommendation, setRecommendation}) {
//   return (
//     <div className="list">
//       <h1>{recommendation[1]}</h1>
//       <input
//         type="text"
//         placeholder="추천 입력"
//         onChange={(e) => {
//           const updatedRecommendation = [...recommendation];  // recommendation 배열을 복사
//           updatedRecommendation[1] = e.target.value;      // 원하는 인덱스(index)의 값을 업데이트
//           setRecommendation(updatedRecommendation);           // 업데이트된 배열을 상태로 설정
//         }}
//       />
//     </div>
//   );
//
// }
//
// function Subject3({recommendation}) {
//   return (
//     <div className="list">
//       <h4>{recommendation[2]}</h4>
//       <p> 2월 17일 발행</p>
//     </div>
//   )
// }

function Subject4({count, setCount}) {
  return (
    <div className="list">
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        카운트 증가
      </button>
    </div>
  )
}

function Modal(props) {
  return (
    <div className="modal" style={{background: props.color}}>
      <h4>{props.recommendation}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.toggleRecommendation}>글수정</button>
    </div>
  );
}

class Modal2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : 'Kang',
      age : 29
    }
  }
  render() {
    return (
      <div className="modal">
        안녕 {this.state.name} {this.state.age}
        <button onClick={() => {
          this.setState({age : this.state.age + 1})
        }}> state 변경 버튼</button>
      </div>
    )
  }
}
export default App;
