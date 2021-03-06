const { deleteStudentQuery } = require('../../database/queries');

const deleteStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    if (studentId > 0) {
      const check = await deleteStudentQuery(studentId);
      if (check.rowCount !== 0) {
        res.json({
          StatusCode: 200,
          data: { message: 'Student deleted successfully' },
        });
      } else {
        res.status(404).json({
          StatusCode: 404,
          data: { message: 'Student does not exist' },
        });
      }
    } else {
      res.status(404).json({
        StatusCode: 404,
        data: { message: 'You enterd wrong student ID' },
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = deleteStudent;
