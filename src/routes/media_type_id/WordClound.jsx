import React from 'react'
import PreviewCard from './PreviewCard'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Card, Col, Tabs, } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { RankCop } from './components'

const TabPane = Tabs.TabPane

@connect(
  ({ media_type_id: { WordClound, } }) => ({ ...WordClound, })
)
export default class extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  render = () => {
    const wordCloundOpt = {
      tooltip: {},
      series: [{
        type: 'wordCloud',
        gridSize: 20,
        sizeRange: [12, 50],
        rotationRange: [0, 0],
        shape: 'circle',
        textStyle: {
          normal: {
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: [{
          name: 'Sam S Club',
          value: 10000,
          textStyle: {
            normal: {
              color: 'black'
            },
            emphasis: {
              color: 'red'
            }
          }
        }, {
          name: 'Macys',
          value: 6181
        }, {
          name: 'Amy Schumer',
          value: 4386
        }, {
          name: 'Jurassic World',
          value: 4055
        }, {
          name: 'Charter Communications',
          value: 2467
        }, {
          name: 'Chick Fil A',
          value: 2244
        }, {
          name: 'Planet Fitness',
          value: 1898
        }, {
          name: 'Pitch Perfect',
          value: 1484
        }, {
          name: 'Express',
          value: 1112
        }, {
          name: 'Home',
          value: 965
        }, {
          name: 'Johnny Depp',
          value: 847
        }, {
          name: 'Lena Dunham',
          value: 582
        }, {
          name: 'Lewis Hamilton',
          value: 555
        }, {
          name: 'KXAN',
          value: 550
        }, {
          name: 'Mary Ellen Mark',
          value: 462
        }, {
          name: 'Farrah Abraham',
          value: 366
        }, {
          name: 'Rita Ora',
          value: 360
        }, {
          name: 'Serena Williams',
          value: 282
        }, {
          name: 'NCAA baseball tournament',
          value: 273
        }, {
          name: 'Point Break',
          value: 265
        }]
      }]
    }

    return (
      <Card title='词云'>
        <Tabs defaultActiveKey="1">
          <TabPane tab={'用户词云'} key="1">
            <ReactEcharts
              option={wordCloundOpt}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
            />
          </TabPane>
          <TabPane tab={'品牌词云'} key="2">
            <ReactEcharts
              option={wordCloundOpt}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
            />
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}