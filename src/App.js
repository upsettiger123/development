import './App.css';
import { useState } from "react";
import hikeData from "./assets/hike-data.json";
import FilteredList from "./FilteredList.js";
import Typography from '@mui/material/Typography';
import { Checkbox, Col, Row, Radio, Space } from 'antd';

hikeData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

const diffOptions = ['Easy', 'Medium', 'Hard'];
const timeOptions = ['<1hr', '1hr-2hr', '2hr+'];


function App() {
  const [difficulty, setDifficulty] = useState("All");
  const [time, setTime] = useState("All");
  const [favorite, setFavorite] = useState(false);
  const [sortBy, setSortBy] = useState("None");

  let hikeTracker = {};
  hikeData.map((hike, idx) => hikeTracker[hike.name] = { added: 0, idx: idx })
  const [hikeList, setHikeList] = useState({ hikes: hikeTracker, distance: 0 });

  const updateHikes = (name, toAdd) => {
    const updatedHikes = hikeList.hikes;
    const idx = hikeList.hikes[name].idx;
    const hike = hikeData[idx];
    let newDist = hikeList.distance;
    if (toAdd) {
      updatedHikes[name].added = 1;
      newDist += hike.distance
    } else {
      updatedHikes[name].added = 0;
      newDist -= hike.distance
    }
    newDist = Math.round(newDist * 100) / 100
    setHikeList({ hikes: updatedHikes, distance: newDist })
  }

  const onSelectDifficulty = (event) => {
    if (!event[0]) {
      setDifficulty("All")
    } else {
      if (event.length > 1) {
        setDifficulty(event)
      } else {
        setDifficulty(event[0])
      }
    }
  };

  const onSelectTime = (event) => {
    if (!event[0]) {
      setTime("All")
    } else {
      if (event.length > 1) {
        setTime(event)
      } else {
        setTime(event[0])
      }
    }
  };

  const onSelectFavorite = (event) => {
    setFavorite(event.target.checked);
  }

  const onSort = (event) => {
    setSortBy(event.target.value)
  }

  return (
    <div className="App">
      <Typography variant="h2">New England To-Hike List</Typography>
      <Row>
        <Col flex="225px" className="menu">
          <Typography variant="h6" sx={{ color: '#5f5f5f' }}>Sort By</Typography>
          <Radio.Group>
            <Space direction="vertical" onChange={onSort}>
              <Radio value={"Distance"}>Distance</Radio>
              <Radio value={"None"}>No Sort</Radio>
            </Space>
          </Radio.Group>
          <br />
          <Typography variant="h6" sx={{ color: '#5f5f5f' }}>Difficulty</Typography>
          <Checkbox.Group options={diffOptions} onChange={onSelectDifficulty} />
          <br />
          <Typography variant="h6" sx={{ color: '#5f5f5f' }}>Time</Typography>
          <Checkbox.Group options={timeOptions} onChange={onSelectTime} />
          <br />
          <Typography variant="h6" sx={{ color: '#5f5f5f' }}>Other</Typography>
          <Checkbox onChange={onSelectFavorite}>Completed</Checkbox>
          <br /><br />
          <Typography variant="subtitle1" sx={{ color: '#5f5f5f' }}>Distance Hiked: {hikeList.distance}mi</Typography>
        </Col>
        <Col flex="auto">
          <FilteredList list={hikeData} difficulty={difficulty} time={time} favorite={favorite} sortBy={sortBy} updateHikes={updateHikes} addTracker={hikeList.hikes} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
