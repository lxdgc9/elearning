"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (
      resolve,
      reject
    ) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step(
        (generator = generator.apply(
          thisArg,
          _arguments || []
        )).next()
      );
    });
  };
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.updateCourse = void 0;
const not_found_1 = require("../../../error/not-found");
const course_1 = require("../../../model/course");
const subject_1 = require("../../../model/subject");
function updateCourse(req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, subjectId, description } = req.body;
    try {
      const course = yield course_1.Course.findById(id);
      if (!course) {
        throw new not_found_1.NotFoundErr(
          "COURSE_NOT_FOUND"
        );
      }
      // Remove course from previous subject,
      // and add course to new subject
      if (subjectId && course.subject !== subjectId) {
        yield subject_1.Subject.findByIdAndUpdate(
          course.subject,
          {
            $pull: { courses: course.id },
          }
        );
        yield subject_1.Subject.findByIdAndUpdate(
          subjectId,
          {
            $addToSet: { courses: course.id },
          }
        );
      }
      yield course.updateOne({
        name,
        subject: subjectId,
        description,
      });
      res.json({
        course,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
exports.updateCourse = updateCourse;
