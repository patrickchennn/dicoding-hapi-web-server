import { ReqRefDefaults, ServerRoute } from "@hapi/hapi/lib/types";
import { deleteNoteByIdHandler, editNoteByIdHandler, getAllNotesHandler, getNoteByIdHandler, postNote } from "./handler.js";


const routes: ServerRoute<ReqRefDefaults>[] = [
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
 
export {routes}