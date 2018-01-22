var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
    },
  urlTitle: {
    type: Sequelize.STRING,
    isUrl: true,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    allowNull: false
  },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
  },
},
  {
  getterMethods: {
      route() {
        return `/wiki/${this.urlTitle}`
      }
    }
  })

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false
  }
})

module.exports = {
  Page, User, db
}

const genearateUrlTitle = (title) => {
  if (title){
    const nonAlpha = /[^a-zA-Z\d\s:]/g
    const spaces = /\s+/g
    return title.replace(nonAlpha, '').replace(spaces, '_')
  }
  return Math.random().toString(36).substring(2, 7)
}

