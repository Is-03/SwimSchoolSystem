

---

**How to run the program**
Install the dependencies using `npm install`, then start the application with `npm run dev`. The system can be accessed in a browser at `http://localhost:5173`.

---

**Assumptions and trade-offs**
This application was built as a frontend-only prototype using mock data, with no backend integration. Charge IDs are assumed to be system-generated and are not editable to prevent mistakes. Local React state and Bootstrap were used to keep the project simple and focused on user experience rather than infrastructure.

---

**Future improvements**
With more time, the system would be connected to a backend for persistent data, include proper authentication, and add features like validation, search, and pagination. Automated testing would also be introduced to improve reliability.

---

**Preventing common admin mistakes**
Non-technical users may accidentally edit charge IDs, delete records unintentionally, or enter incorrect amounts. The UI helps prevent this by making charge IDs read-only, using clear labels and input types, and requiring confirmation before deleting any charge.

---

**Delete interaction design**
A confirmation prompt is shown before deleting a charge to ensure the action is intentional. This extra step reduces the risk of accidental data loss and improves overall system safety.

---

