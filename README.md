# Setup and Run

1. Clone the repository
2. Create a .env file based on the .env.template file
3. npm install
4. npm run dev


## Running Tests

To run the tests, use the following command:
```
npm run test
```

This will run all the tests using Vitest and display the results in your terminal.


## Decisions

1. Component Structure:

- The application was divided into three main components:
    1. App.vue: The main component responsible for initial data fetching and SSE setup.
    2. TimeSlotList.vue: Manages grouping and displaying time slots by date.
    3. TimeSlotCard.vue: Handles the display of individual time slot information.
- This structure promotes separation of concerns and component reusability.



2. API Service:

- API calls were separated into a dedicated service file (api.ts).
- This service handles both REST API calls for initial data fetching and Server-Sent Events (SSE) for real-time updates.
- Centralizing API logic improves maintainability and allows for easier testing and mocking.



3. Real-time Updates with SSE:

- This was solved using the `EventSource` API, which is a native browser feature specifically designed for this purpose.
- `EventSource` provides automatic reconnection and graceful handling of disconnections, ensuring a seamless experience for users. Also the simple API makes it easy to implement, don't need additional libraries or complex setup.



4. State Management:

- Given the application's scale, local component state was deemed sufficient.
- Vue's reactive `ref` and `computed` properties were used for efficient state management within components.
- This decision avoided the overhead of introducing a full state management library like Vuex.



5. Styling and Responsive Design:

- Tailwind CSS was chosen for rapid UI development and consistent styling.
- The utility-first approach of Tailwind allows for quick iterations and easy responsiveness.
- Dynamic styling was implemented using computed properties for class bindings, allowing the UI to reflect the current state of time slots.



6. Project Structure:

- The code was organized into logical directories: components, services, and types.
- Path aliases (e.g., `@/components`) were used for cleaner imports.
- This structure improves code organization and makes the project more maintainable as it scales.



7. Testing Strategy:

- Unit tests were implemented using Vitest and Vue Test Utils.
- Tests were organized in a separate `tests` directory, mirroring the `src` structure for easy navigation.
- This approach ensures that components and services are tested in isolation, improving code reliability.



8. Build Tool:

- Vite was chosen as the build tool for its fast build times and optimized production builds.
- This decision improves developer experience with quick hot module replacement during development.



9. Deployment Strategy:

- The application could be easily deployed on Vercel.
- Or, could be built and deployed to a static site hosting service like Netlify or GitHub Pages.



## Further improvements

1. Sorting options for time slots (e.g., by time, by available capacity).
2. Filtering options (e.g., show only available slots, filter by category).
3. A search functionality to find specific dates or times quickly.
4. Animations for real-time updates to draw attention to changes.


## Final thoughts

It took me around 6 hours to build this application. I had to investigate the best way to implement real-time updates using SSE, which turned out be using `EventSource` API. It was pretty straightforward and similar to WebSockets, which I had used in the past.

In my daily basis, I use Vue and Tailwind so I thought it would be a good fit for this project. I just had to iterate a few times how to group the data and how to display it.

Regarding testing, since I was already using Vite for the build tool, I decided to use Vitest for testing. I struggled a little bit with the configuration but writting tests was no issue because it has a similar syntax to Jest (expect, describe, it, etc.) and has support for testing Vue components.

I had a good time building this application and I think it's a simple and effective technical test.