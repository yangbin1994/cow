import React from 'react'
import PreviewCard from './PreviewCard'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Card, Col, Tabs, } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { RankCop } from './components'

const TabPane = Tabs.TabPane


function randomData() {
  return Math.round(Math.random() * 1000);
}

@connect(
  ({ media_type_id: { Quality, } }) => ({ ...Quality, })
)
export default class extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  render = () => {
    const option = {
      title: {
        text: '堆叠区域图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }

    const ageOpt = {
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    const portrayalOpt = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    }

    const mapOpt = {
      title: {
        text: 'iphone销量',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['iphone3', 'iphone4', 'iphone5']
      },
      visualMap: {
        min: 0,
        max: 2500,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: 'iphone3',
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: [
            { name: '北京', value: randomData() },
            { name: '天津', value: randomData() },
            { name: '上海', value: randomData() },
            { name: '重庆', value: randomData() },
            { name: '河北', value: randomData() },
            { name: '河南', value: randomData() },
            { name: '云南', value: randomData() },
            { name: '辽宁', value: randomData() },
            { name: '黑龙江', value: randomData() },
            { name: '湖南', value: randomData() },
            { name: '安徽', value: randomData() },
            { name: '山东', value: randomData() },
            { name: '新疆', value: randomData() },
            { name: '江苏', value: randomData() },
            { name: '浙江', value: randomData() },
            { name: '江西', value: randomData() },
            { name: '湖北', value: randomData() },
            { name: '广西', value: randomData() },
            { name: '甘肃', value: randomData() },
            { name: '山西', value: randomData() },
            { name: '内蒙古', value: randomData() },
            { name: '陕西', value: randomData() },
            { name: '吉林', value: randomData() },
            { name: '福建', value: randomData() },
            { name: '贵州', value: randomData() },
            { name: '广东', value: randomData() },
            { name: '青海', value: randomData() },
            { name: '西藏', value: randomData() },
            { name: '四川', value: randomData() },
            { name: '宁夏', value: randomData() },
            { name: '海南', value: randomData() },
            { name: '台湾', value: randomData() },
            { name: '香港', value: randomData() },
            { name: '澳门', value: randomData() }
          ]
        },
        {
          name: 'iphone4',
          type: 'map',
          mapType: 'china',
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: [
            { name: '北京', value: randomData() },
            { name: '天津', value: randomData() },
            { name: '上海', value: randomData() },
            { name: '重庆', value: randomData() },
            { name: '河北', value: randomData() },
            { name: '安徽', value: randomData() },
            { name: '新疆', value: randomData() },
            { name: '浙江', value: randomData() },
            { name: '江西', value: randomData() },
            { name: '山西', value: randomData() },
            { name: '内蒙古', value: randomData() },
            { name: '吉林', value: randomData() },
            { name: '福建', value: randomData() },
            { name: '广东', value: randomData() },
            { name: '西藏', value: randomData() },
            { name: '四川', value: randomData() },
            { name: '宁夏', value: randomData() },
            { name: '香港', value: randomData() },
            { name: '澳门', value: randomData() }
          ]
        },
        {
          name: 'iphone5',
          type: 'map',
          mapType: 'china',
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: [
            { name: '北京', value: randomData() },
            { name: '天津', value: randomData() },
            { name: '上海', value: randomData() },
            { name: '广东', value: randomData() },
            { name: '台湾', value: randomData() },
            { name: '香港', value: randomData() },
            { name: '澳门', value: randomData() }
          ]
        }
      ]
    }

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
      <Card title='用户画像'>
        <Tabs defaultActiveKey="1">
          <TabPane tab={'男女比例'} key="1">
            <ReactEcharts
              option={portrayalOpt}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
            />
          </TabPane>
          <TabPane tab={'年龄分布'} key="2">
            <ReactEcharts
              option={ageOpt}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
            />
          </TabPane>
          <TabPane tab={'地域分布'} key="3">
            <ReactEcharts
              option={mapOpt}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
            />
          </TabPane>
          <TabPane tab={'兴趣爱好'} key="4">
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
