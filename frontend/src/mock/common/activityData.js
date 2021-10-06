import {users, groups} from './index'

const events = []

const activities = users.map((user, index) => {
  return {
    user: Object.assign({}, user, {group: groups[user.groupId]}),
    activity: events[index % events.length],
    template: ''
  }
})

const templates = [
  (user, activity) => { return `${user.name} at <a >${user.group}</a> created <a>${activity.event}</a>` },
]

export {activities, templates}
