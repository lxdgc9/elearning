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
exports.newCourse = void 0;
const bad_req_1 = require("../../../error/bad-req");
const course_1 = require("../../../model/course");
const subject_1 = require("../../../model/subject");
function newCourse(req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    const { name, description, subjectId } = req.body;
    try {
      const course = course_1.Course.build({
        name,
        description,
        author: req.user.id,
        subject: subjectId,
      });
      yield course.save();
      // kiểm tra giáo viên có trực thuộc môn học hay không
      const subject =
        yield subject_1.Subject.findByIdAndUpdate(
          subjectId,
          {
            $addToSet: {
              teachers: course.id,
            },
          }
        );
      if (!subject) {
        throw new bad_req_1.BadReqErr(
          "Giáo Viên Không Trực Thuộc Môn Học"
        );
      }
      res.status(201).json({
        course,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
exports.newCourse = newCourse;
