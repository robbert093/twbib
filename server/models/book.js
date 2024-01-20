module.exports = (sequelize, DataTypes) => {

  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    pageCount: {
      type: DataTypes.NUMBER
    },
    startRead: {
      type: DataTypes.DATEONLY
    },
    endRead: {
      type: DataTypes.DATEONLY
    }
  });

  Book.associate = (models) => {
    Book.hasMany(models.BookNote, {
      onDelete: 'CASCADE'
    });

    Book.belongsToMany(models.Author, {
      through: 'BookAuthors',
      foreignKey: 'bookId',
      otherKey: 'authorId',
      unique: false,
    });

    Book.belongsToMany(models.Category, {
      through: 'BookCategories',
      foreignKey: 'bookId',
      otherKey: 'categoryId',
      unique: false,
    });
  };

  return Book;
}
