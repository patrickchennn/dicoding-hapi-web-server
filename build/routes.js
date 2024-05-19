import { deleteNoteByIdHandler, editNoteByIdHandler, getAllNotesHandler, getNoteByIdHandler, postNote } from "./handler.js";
const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: postNote,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
];
export { routes };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzVILE1BQU0sTUFBTSxHQUFrQztJQUMxQztRQUNJLE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsUUFBUTtLQUNwQjtJQUNEO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxrQkFBa0I7S0FDOUI7SUFDRDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLGFBQWE7UUFDbkIsT0FBTyxFQUFFLGtCQUFrQjtLQUM5QjtJQUNEO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsYUFBYTtRQUNuQixPQUFPLEVBQUUsbUJBQW1CO0tBQy9CO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsUUFBUTtRQUNoQixJQUFJLEVBQUUsYUFBYTtRQUNuQixPQUFPLEVBQUUscUJBQXFCO0tBQ2pDO0NBQ0osQ0FBQztBQUVGLE9BQU8sRUFBQyxNQUFNLEVBQUMsQ0FBQSJ9