const users = [{
  id: 1,
  name: 'shipra',
  schoolId: 101
}, {
  id: 2,
  name: 'abhishek',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 80
}, {
  id: 2,
  schoolId: 999,
  grade: 81
}, {
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => {
      return user.id === id
    });
    if(user) {
      resolve(user);
    } else {
      reject(`unable to find user with id: ${id}`);
    }
  });
}

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    const user = grades.filter((user) => {
      return user.schoolId === schoolId
    });
    if(user) {
      resolve(user);
    } else {
      reject(`unable to find user with schoolid: ${schoolId}`);
    }
  });
}

// shipra has 83% grade in class
// const getStatus = (userId) => {
//   let user;
//   return getUser(userId).then((tempUser) => {
//     user = tempUser;
//     return getGrades(user.schoolId);
//   }).then((grades) => {
//     let average = 0;
//     if(grades.length > 0){
//      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
//    }
//       return (`${user.name} has got ${average}%`);
//   });
// };


// difference b/w fn & async fn is async fn always returns a promise with resolved value or rejected error i.e. and if we use await also, then
//it will return resolved value of promise, so we donot need to do .then chaining for calling different fns, just we need to use async await


 const getStatusAlt = async (userId) => {
   const user = await getUser(userId);
   const grades = await getGrades(user.schoolId);
   let average = 0;
      if(grades.length > 0){
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
      }
         return (`${user.name} has got ${average}%`);
 }

 getStatusAlt(1).then((name) => {
   console.log(name);
 }).catch((e) => {
   console.log(e);
 });

// getUser(1).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2));
// }, (e) => {
//   console.log(e);
// });
//
//
// getGrades(101).then((grades) => {
// console.log(grades);
// }, (e) => {
//   console.log(e);
// });

// getStatus(11).then((status) => {
// console.log(status);
// }, (e) => {
//   console.log(e);
// });
