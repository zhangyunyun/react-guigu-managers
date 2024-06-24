/*
* 使用mockjs提供mock数据接口
* */
import Mock from 'mockjs'

import weatcherData from './data-weather.json'

Mock.mock('/weather',{code:0, data:weatcherData.results})