import moment from 'moment';

interface UserSession {
  userId: string;
  loggedIn: string; 
  loggedOut: string; 
  lastSeenAt: string; 
}

const calculateMonthlyMetrics = (
  sessions: UserSession[], 
  targetMonth: number, 
  targetYear: number
) => {
  const loggedInUsers = new Set<string>();
  const activeUsers = new Set<string>();

  sessions.forEach(session => {
    const loggedIn = moment(session.loggedIn);
    const lastSeenAt = moment(session.lastSeenAt);

    if (loggedIn.month() + 1 === targetMonth && loggedIn.year() === targetYear) {
      loggedInUsers.add(session.userId);
    }

    if (lastSeenAt.month() + 1 === targetMonth && lastSeenAt.year() === targetYear) {
      activeUsers.add(session.userId);
    }
  });

  return {
    loggedInUsers: loggedInUsers.size,
    activeUsers: activeUsers.size
  };
};

const sessions: UserSession[] = [
  {
    userId: "1",
    loggedIn: "2023-01-10T10:00:00Z",
    loggedOut: "2023-01-20T15:00:00Z",
    lastSeenAt: "2023-01-15T12:00:00Z"
  },
  {
    userId: "2",
    loggedIn: "2023-01-20T10:00:00Z",
    loggedOut: "2023-01-30T15:00:00Z",
    lastSeenAt: "2023-01-25T12:00:00Z"
  },
  {
    userId: "3",
    loggedIn: "2023-01-25T10:00:00Z",
    loggedOut: "2023-01-30T15:00:00Z",
    lastSeenAt: "2023-01-28T12:00:00Z"
  }
];

const targetMonth = 1; // January
const targetYear = 2023;

const metrics = calculateMonthlyMetrics(sessions, targetMonth, targetYear);

console.log(`Monthly Logged In Users: ${metrics.loggedInUsers}`);
console.log(`Monthly Active Users: ${metrics.activeUsers}`);
