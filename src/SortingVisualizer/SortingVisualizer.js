import React from 'react';
import './SortingVisualizer.scss';
import { mergeSortAnimation} from './mergeSort';

class SortingVisualizer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      array: []
    }
    this.mergeSort = this.mergeSort.bind(this);
  }
  componentDidMount() {
    this.resetArray();
  }
  resetArray() {
    var array = [];
    var NUMBER_OF_PILERS = window.innerWidth/5.1;
    for (let i = 0; i < NUMBER_OF_PILERS; i++) {
      array.push(getRandomNumberInBetween(5, 600));
    }
    this.setState({array});
  }

  mergeSort() {
    const PRIMARY_COLOR = "teal";
    const SECONDARY_COLOR = "red";
    const ANIMATION_SPEED = 10;
    const array = this.state.array;
    const animations = mergeSortAnimation(array,0,array.length);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('sorting__pilers');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED);
      }
    }
  }

  
  render() {
    return (
      <div className="sorting__container">
        {
          this.state.array.map((element, index) => {
            return <div key={index} style={{ height: `${element}px` }} className="sorting__pilers"></div>
          })
        }
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={()=>this.mergeSort()}>Merge Sort</button>
      </div>
    )
  }
}
const getRandomNumberInBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default SortingVisualizer;