// ClassPlanner - Week Schedule Management
// Simple class scheduling application

class ClassSchedule {
  constructor() {
    this.schedule = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    };
  }

  addClass(day, className, time, duration = 60) {
    if (!this.schedule[day]) {
      console.log(`Invalid day: ${day}`);
      return false;
    }

    const classEntry = {
      name: className,
      time: time,
      duration: duration
    };

    this.schedule[day].push(classEntry);
    console.log(`Added ${className} on ${day} at ${time}`);
    return true;
  }

  removeClass(day, className) {
    if (!this.schedule[day]) {
      console.log(`Invalid day: ${day}`);
      return false;
    }

    const index = this.schedule[day].findIndex(c => c.name === className);
    if (index !== -1) {
      this.schedule[day].splice(index, 1);
      console.log(`Removed ${className} from ${day}`);
      return true;
    }

    console.log(`Class ${className} not found on ${day}`);
    return false;
  }

  getSchedule(day = null) {
    if (day) {
      return this.schedule[day] || [];
    }
    return this.schedule;
  }

  displaySchedule() {
    console.log('\n=== Week Schedule ===\n');
    for (const [day, classes] of Object.entries(this.schedule)) {
      console.log(`${day}:`);
      if (classes.length === 0) {
        console.log('  No classes scheduled');
      } else {
        classes.forEach(c => {
          console.log(`  - ${c.name} at ${c.time} (${c.duration} min)`);
        });
      }
      console.log('');
    }
  }
}

// Example usage
if (require.main === module) {
  const planner = new ClassSchedule();

  // Add sample classes
  planner.addClass('Monday', 'Mathematics', '09:00', 90);
  planner.addClass('Monday', 'Physics', '11:00', 90);
  planner.addClass('Tuesday', 'Chemistry', '10:00', 60);
  planner.addClass('Wednesday', 'History', '14:00', 45);
  planner.addClass('Friday', 'Programming', '13:00', 120);

  // Display the schedule
  planner.displaySchedule();
}

module.exports = ClassSchedule;
