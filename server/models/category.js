module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Book, {
      through: 'BookCategories',
      foreignKey: 'categoryId',
      otherKey: 'bookId',
      unique: false,
    });
  };

  return Category;
}