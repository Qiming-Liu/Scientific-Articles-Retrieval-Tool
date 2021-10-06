import Mock from 'mockjs'
import {logos, sayings, positions, avatars, admins} from '../common'

const Random = Mock.Random

const timeList = []

const welcomeMessages = []

const goods = []

Random.extend({
  admin () {
    return this.pick(admins)
  },
  welcome () {
    return this.pick(welcomeMessages)
  },
  timeFix () {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9
      ? timeList[0] : (hour <= 11 ? timeList[1] : (hour <= 13 ? timeList[2] : (hour <= 20 ? timeList[3] : timeList[4])))
  },
  avatar () {
    return this.pick(avatars)
  },
  position () {
    return this.pick(positions)
  },
  goods () {
    return this.pick(goods)
  },
  saying () {
    return this.pick(sayings)
  },
  logo () {
    return this.pick(logos)
  }
})
