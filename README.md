# Fyle Assignment

## Functionalities

- **Add User**: Create a user with name and a unique email.
- **Add Workouts**: Assign workouts by specifying their name.
- **Input Validation**: Ensures all inputs are validated with appropriate error messages.
- **User Data Grid**: Displays all user data in a table format.
- **Pagination**: Easily browse through user data with pagination controls.
- **Search Functionality**: Search for users by name or email.
- **Filter Workouts**: Filter users based on workout type.
- **View Button**: Visualize user workout data with a _graph_.
- **Edit Button**: _Modify_, _add_, or _remove_ workout durations for a user.
- **Delete Button**: Remove a user from the list.
- **Popup Maximization**: Maximize view and edit popups with a button click in the top right corner.
- **Storage**: It stores the userData and workoutTypes in `localStorage` of browsers

## Additional Library used
- `PrimeNG` for components
- `TailwindCSS` for styling and layouts
- `ChartJS` for displaying charts

## Run Locally
To run locally follow these 3 simple steps:

1. Download this repository
2. run `npm install`
3. run `ng serve`

## Reports

- [Code Coverage Report](https://github.com/Hitendra18/fyle-assignment/blob/main/misc/code-coverage-report.pdf)
- [Unit Test Report](https://github.com/Hitendra18/fyle-assignment/blob/main/misc/unit-test-report.pdf)
  - Unit test report is for only `ViewUserComponent` and `UserDataService`
### Generate yourself
- Code Coverage Report - `ng test --code-coverage`
- Unit Test Report - `ng test`
  - it generates report for only `ViewUserComponent` and `UserDataService`
  - If you want to run all tests and generate a full report, ensure that you remove the focus (`f`) from the `describe` blocks in the `view-user-component.spec.ts` and `user-data-service.spec.ts` files.

## Deployment

[Vercel Deployment Link](https://fyle-assignment-phi.vercel.app/)
