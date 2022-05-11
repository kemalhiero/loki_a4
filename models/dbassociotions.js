const course_lo_details = require('./course_lo_details.js')
const course_los = require('./course_los.js')
const course_plan_assessments = require('./course_plan_assessments.js')
const course_plan_detail_assessments = require('./course_plan_detail_assessments.js')
const course_plan_detail_outcomes = require('./course_plan_detail_outcomes.js')
const course_plan_detail_refs = require('./course_plan_detail_refs.js')
const course_plan_lecturers = require('./course_plan_lecturers.js')
const course_plan_references = require('./course_plan_references.js')
const course_plans_details = require('./course_plans_details.js')
const course_plans = require('./course_plans.js')
const course_requirements = require('./course_requirements.js')
const courses = require('./courses.js')
const curricula = require('./curricula.js')
const curriculum_los = require('./curriculum_los.js')
const curriculum_profiles = require('./curriculum_profiles.js')
const lecturers = require('./lecturers.js')
const user = require('./users.js')


//relasi antar database

//-- one to many --


//-- many to many --
curriculum_los.belongsToMany(course_los, { through: course_lo_details });
course_los.belongsToMany(curriculum_los, { through: course_lo_details });

course_plan_assessments.belongsToMany(course_plans_details, { through: course_plan_detail_assessments });
course_plans_details.belongsToMany(course_plan_assessments, { through: course_plan_detail_assessments });

course_los.belongsToMany(course_plans_details, { through: course_plan_detail_outcomes });
course_plans_details.belongsToMany(course_los, { through: course_plan_detail_outcomes });

course_plan_references.belongsToMany(course_plans_details, { through: course_plan_detail_refs });
course_plans_details.belongsToMany(course_plan_references, { through: course_plan_detail_refs });