import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';
import GithubCorner from 'react-github-corner';
import Row from 'antd/es/row';
import 'antd/es/row/style/css';
import Col from 'antd/es/col';
import 'antd/es/col/style/css';
import Radio from 'antd/es/radio';
import 'antd/es/radio/style/css';
import Checkbox from 'antd/es/checkbox';
import 'antd/es/checkbox/style/css';
import Input from 'antd/es/input';
import 'antd/es/input/style/css';
import Select from 'antd/es/select';
import 'antd/es/select/style/css';
import Slider from 'antd/es/slider';
import 'antd/es/slider/style/css';
import Form from 'antd/es/form';
import 'antd/es/form/style/css';
import DatePicker from 'antd/es/date-picker';
import 'antd/es/date-picker/style/css';
import Button from 'antd/es/button';
import 'antd/es/button/style/css';
import moment from 'moment';
import useQueryState from './useQueryState';
import './App.css';

const { RangePicker } = DatePicker;
const tsToMoment = (ts: any) => ts ? moment(+ts) : null;

const PURPOSE_OPTIONS = [
  {
    text: 'Tourism',
    value: '0'
  },
  {
    text: 'Visiting family or friends',
    value: '1'
  },
  {
    text: 'Cultural',
    value: '2'
  },
  {
    text: 'Sports',
    value: '3'
  },
  {
    text: 'Official visit',
    value: '4'
  },
  {
    text: 'Medical reasons',
    value: '5'
  },
  {
    text: 'Study',
    value: '6'
  },
  {
    text: 'Transit',
    value: '7'
  },
  {
    text: 'Other',
    value: '8'
  }
];

const UserForm = () => {
  const [name, setName] = useQueryState('', 'name', { action: 'replace', delay: 300 });
  const [gender, setGender] = useQueryState('', 'gender');
  const [travelByYourself, setTravelByYourself] = useQueryState('', 'travelByYourself');
  const [currency, setCurrency] = useQueryState(0, 'currency', { action: 'replace', delay: 300 });
  const [purpose, setPurpose] = useQueryState([], 'purpose');
  const [startTime, setStartTime] = useQueryState('', 'startTime');
  const [endTime, setEndTime] = useQueryState('', 'endTime');

  const onInputChange = (evt: any) => {
    setName(evt.target.value);
  }

  const onSelectChange = (value: any) => {
    setGender(value);
  }

  const onRadioChange = (evt: any) => {
    setTravelByYourself(evt.target.value);
  }

  const onCheckboxChange = (value: any) => {
    setPurpose(value);
  }

  const onSliderChange = (value: any) => {
    setCurrency(value);
  }

  const onRangePickerChange = (value: any) => {
    setStartTime(value.length === 0 ? '' : `${+value[0]}`);
    setEndTime(value.length === 0 ? '' : `${+value[1]}`);
  }

  return (
    <>
      <Row>
        <Form
          layout="horizontal"
          labelCol={{ span:  6}}
          wrapperCol={{ span: 18 }}>
          <Form.Item label="Name">
            <Input
              placeholder="name"
              style={{ width: 200 }}
              value={name}
              onChange={onInputChange} />
          </Form.Item>
          <Form.Item label="Gender" >
              <Select
                placeholder="gender"
                style={{ width: 100 }}
                value={gender}
                onChange={onSelectChange}>
                <Select.Option key="0">Male</Select.Option>
                <Select.Option key="1">Female</Select.Option>
                <Select.Option key="2">Other</Select.Option>
              </Select>
          </Form.Item>
          <Form.Item label="Travel By Yourself">
            <Radio.Group
              value={travelByYourself}
              onChange={onRadioChange}>
              <Radio value="0">No</Radio>
              <Radio value="1">Yes</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Total Currency Carried" >
            <Slider
              style={{ width: 500 }}
              tipFormatter={v => `${v / 10}k`}
              min={0}
              max={100}
              marks={{
                0: '0',
                10: '1k',
                30: '3k',
                50: '5k',
                70: '7k',
                90: '9k',
                100: '10k+'
              }}
              value={+currency}
              onChange={onSliderChange}
              />
          </Form.Item>
          <Form.Item label="Purpose of Travel" >
            <Checkbox.Group
              style={{ width: '100%' }}
              value={purpose}
              onChange={onCheckboxChange}>
              <Row>
                {
                  PURPOSE_OPTIONS.map(p => (
                    <Col key={p.value} span={8}>
                      <Checkbox value={p.value}>{ p.text }</Checkbox>
                    </Col>
                  ))
                }
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Travel Period">
            <RangePicker
              value={[tsToMoment(startTime), tsToMoment(endTime)] as any}
              onChange={onRangePickerChange} />
          </Form.Item>
          <Form.Item label="" wrapperCol={{ offset: 6, span: 18 }}>
            <Button
              className="margin-right"
              type="primary">
              <Link to="/?name=Jason&gender=0&travelByYourself=1&currency=10&purpose=1,2&startTime=1573896342384&endTime=1576661142384">Fill</Link>
            </Button>
            <Button
              type="primary">
              <Link to="/">
                Reset
              </Link>
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  )
}

const Header = () => {
  return (
    <div className="header">
      Use Query State
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <UserForm />
        </div>
        <GithubCorner
          bannerColor="#1890ff"
          href="https://github.com/yuanfux/use-query-state" />
      </div>
    </Router>
  );
}

export default App;
