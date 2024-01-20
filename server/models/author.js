module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  });

  Author.associate = (models) => {
    Author.belongsToMany(models.Book, {
      through: 'BookAuthors',
      foreignKey: 'authorId',
      otherKey: 'bookId',
      unique: false,
    });
  };

  return Author;
}
