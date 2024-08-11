export type User = {
  email: string;
  name: string;
  workouts: {
    index: number;
    duration: number;
  }[];
};

export const initialUserData: User[] = [
  {
    email: 'john.doe@example.com',
    name: 'John Doe',
    workouts: [
      { index: 0, duration: 30 },
      { index: 1, duration: 45 },
      { index: 2, duration: 45 },
    ],
  },
  {
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    workouts: [
      { index: 2, duration: 60 },
      { index: 0, duration: 20 },
    ],
  },
  {
    email: 'mike.johnson@example.com',
    name: 'Mike Johnson',
    workouts: [
      { index: 3, duration: 50 },
      { index: 1, duration: 40 },
    ],
  },
];

export const initialWorkoutTypes: string[] = [
  'running',
  'cycling',
  'swimming',
  'yoga',
];
