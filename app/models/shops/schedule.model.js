module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("sh_schedule", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    shop_address: {
      type: Sequelize.STRING
    },
    monday: {
      type: Sequelize.BOOLEAN
    },
    monday_start: {
      type: Sequelize.DATE
    },
    monday_end: {
      type: Sequelize.DATE
    },
    tuesday: {
      type: Sequelize.BOOLEAN
    },
    tuesday_start: {
      type: Sequelize.DATE
    },
    tuesday_end: {
      type: Sequelize.DATE
    },
    wednesdey: {
      type: Sequelize.BOOLEAN
    },
    wednesdey_start: {
      type: Sequelize.DATE
    },
    wednesdey_end: {
      type: Sequelize.DATE
    },
    thursdau: {
      type: Sequelize.BOOLEAN
    },
    thursdau_start: {
      type: Sequelize.DATE
    },
    thursdau_end: {
      type: Sequelize.DATE
    },
    friday: {
      type: Sequelize.BOOLEAN
    },
    friday_start: {
      type: Sequelize.DATE
    },
    friday_end: {
      type: Sequelize.DATE
    },
    saturday: {
      type: Sequelize.BOOLEAN
    },
    saturday_start: {
      type: Sequelize.DATE
    },
    saturday_end: {
      type: Sequelize.DATE
    },
    sunday: {
      type: Sequelize.BOOLEAN
    },
    sunday_start: {
      type: Sequelize.DATE
    },
    sunday_end: {
      type: Sequelize.DATE
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Schedule;
};
