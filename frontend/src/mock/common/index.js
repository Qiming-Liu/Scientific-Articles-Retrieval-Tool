const avatars = []

const positions = []

const sayings = []

const logos = []

const admins = []

const groups = []

const users = []

const teams = groups.map((item, index) => {
  return {
    name: item,
    avatar: avatars[index]
  }
})

export {logos, sayings, positions, avatars, admins, groups, users, teams}
