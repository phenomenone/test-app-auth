const { ROLE } = require('../data')

function canViewProduct(user, product) {
  return (
    user.role === ROLE.ADMIN ||
    project.userId === user.id
  )
}

// function scopedProduct(user, projects) {
//   if (user.role === ROLE.ADMIN) return projects
//   return projects.filter(project => project.userId === user.id)
// }

function canDeleteProduct(user, project) {
  return project.userId === user.id
}

module.exports = {
  canViewProduct,
  scopedProduct,
  canDeleteProduct
}