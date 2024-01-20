module.exports = (sequelize, DataTypes) => {

  const BookNote = sequelize.define('BookNote', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  BookNote.associate = (models) => {
    BookNote.belongsTo(models.Book);
  };

  return BookNote;
}
