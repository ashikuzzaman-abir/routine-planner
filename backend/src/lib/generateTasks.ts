// import tasks from '../dummy/tasks.json';

// const generateTasks = (availableTime: number) => {
//   // Sort tasks based on priority
//   tasks.sort((a, b) => a.priority - b.priority);

//   let days: any[] = [];
//   let day = 0;
//   let dayTime = availableTime;

//   while (tasks.length > 0) {
//     const task = tasks.shift();

//     // If task duration is longer than available time, move to the next day
//     if (task.duration > availableTime) {
//       day++;
//       dayTime = availableTime;
//       tasks.push(task);
//       continue;
//     }

//     // Check if task can be completed within available time for the day
//     // and if the current day already has less than 2 tasks
//     if (task.duration <= dayTime && (!days[day] || days[day].length < 2)) {
//       // If the day array doesn't exist yet, create it
//       if (!days[day]) {
//         days[day] = [];
//       }

//       // Add task to current day
//       days[day].push(task);

//       // Subtract task duration from available time for the day
//       dayTime -= task.duration;
//     } else {
//       // If task can't be completed in the remaining day time or day is full,
//       // push the task back to the end of the tasks array and increment the day
//       tasks.push(task);
//       day++;
//       dayTime = availableTime;
//     }
//   }

//   return days;
// };

// export default generateTasks;

import tasks_ from '../dummy/tasks.json';

const generateTasks = (availableTime: number) => {
  // Filter out tasks that can't be completed within the available time

  const tasks = tasks_.filter((task) => task.duration <= availableTime);

  // Sort tasks based on priority
  tasks.sort((a, b) => a.priority - b.priority);

  let days: any[] = [];
  let day = 0;
  let dayTime = availableTime;

  while (tasks.length > 0) {
    const task = tasks.shift();

    // Check if task can be completed within available time for the day
    // and if the current day already has less than 2 tasks
    if (task.duration <= dayTime && (!days[day] || days[day].length < 2)) {
      // If the day array doesn't exist yet, create it
      if (!days[day]) {
        days[day] = [];
      }

      // Add task to current day
      days[day].push(task);

      // Subtract task duration from available time for the day
      dayTime -= task.duration;
    } else {
      // If task can't be completed in the remaining day time or day is full,
      // increment the day and reset the dayTime
      day++;
      dayTime = availableTime;
    }
  }

  return days;
};

export default generateTasks;
