import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {data} from './data'
import {Table, Card, Row, Col,Image, Input,Button } from "antd";

function App() {

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    setTableData(data)
  },[])

  function getTableColumns() {
    return [
      {
        title: 'Name',
        dataIndex: 'employee_name',
        key: 'employee_name',
      },
      {
        title: 'Website',
        dataIndex: 'employee_website',
        key: 'employee_website',
        render:(value)=>{
          const link = 'http://' + value
          return <a href={link} target="_blank">{link}</a>
        },
      },
      {
        title: 'Age',
        dataIndex: 'employee_age',
        key: 'employee_age',
      },
      {
        title: 'Salary',
        dataIndex: 'employee_salary',
        key: 'employee_salary',
      }
    ]
  }

  function renderCard() {
    if(!selectedRecord){
      return null
    }

    return (
      <Card className="bottomCard">
        <Row className="row">
          <Col span={6} className="leftCol">
            <Image
              width={200}
              height={50}
              src={selectedRecord.profile_image}
            />

          </Col>
          <Col span={18} className="rightCol">{selectedRecord.employee_name}</Col>
        </Row>
        <Row className="row">
          <Col span={6} className="leftCol">
            Age
          </Col>
          <Col span={18}  className="rightCol"><Input value={selectedRecord.employee_age} style={{width:300}} /></Col>
        </Row>
        <Row className="row">
          <Col span={6} className="leftCol">
            Salary
          </Col>
          <Col span={18}  className="rightCol"><Input value={selectedRecord.employee_salary} style={{width:300}}  /></Col>
        </Row>
        <Row className="row">
          <Col span={6} className="leftCol">
            Website
          </Col>
          <Col span={18}  className="rightCol"><Input value={selectedRecord.employee_website} style={{width:300}}  /></Col>
        </Row>
      </Card>
    )
  }


  return (
    <div className="App">
      <div className="buttonDiv">
        <Button type="primary" onClick={()=>{
          if(isFiltered){
            setTableData(data)
          } else {
            let result = []
            data.forEach( record => {
             if(record.employee_age > 59){
               result.push(record)
             }
            })
            setTableData(result)
          }
          setIsFiltered(!isFiltered)
        }}> {!isFiltered?'Older Employees' : 'All Employees'}  </Button>
      </div>
      <div className="top">
        <Table dataSource={tableData} pagination={false} columns={getTableColumns()}
               onRow={record => {
                 return {
                   onClick: (event) => {
                      setSelectedRecord(record)
                   },
                 };
               }}
               rowClassName={(record, index) => {

                 if (selectedRecord && selectedRecord.id == record.id) {
                   return 'selectRow'
                 }
               }}
        />

      </div>

      {renderCard()}
    </div>
  );
}

export default App;
